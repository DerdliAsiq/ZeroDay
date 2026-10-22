import { randomBytes, timingSafeEqual } from "crypto";
import type { NextFunction, Request, Response } from "express";

export const CSRF_COOKIE_NAME = "csrf_token";
export const CSRF_HEADER_NAME = "x-csrf-token";

export function generateCsrfToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Double Submit Cookie pattern:
 * - GET isteklerinde çerez yoksa üretip set eder (SPA ilk yüklemesinde token alır).
 * - Mutasyonel isteklerde (POST/PUT/DELETE/PATCH) cookie ile `X-CSRF-Token`
 *   header'ının birebir eşleşmesini zorunlu tutar; eşleşmezse 403 döner.
 * - Timing-safe karşılaştırma kullanılır.
 */
export function csrfMiddleware(req: Request, res: Response, next: NextFunction): void {
  const cookies = (req as Request & { cookies?: Record<string, string | undefined> }).cookies;

  if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") {
    if (!cookies?.[CSRF_COOKIE_NAME]) {
      res.cookie(CSRF_COOKIE_NAME, generateCsrfToken(), {
        httpOnly: false, // SPA okuyup header'a koymak zorunda
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 gün
      });
    }
    next();
    return;
  }

  const cookieToken = cookies?.[CSRF_COOKIE_NAME];
  const headerRaw = req.headers[CSRF_HEADER_NAME];
  const headerToken = Array.isArray(headerRaw) ? headerRaw[0] : headerRaw;

  if (!cookieToken || !headerToken) {
    res.status(403).json({ ok: false, error: "CSRF token missing" });
    return;
  }

  const a = Buffer.from(cookieToken, "utf8");
  const b = Buffer.from(headerToken, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    res.status(403).json({ ok: false, error: "CSRF token mismatch" });
    return;
  }

  next();
}

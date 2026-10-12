import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10;
const buckets = new Map<string, Map<string, { count: number; reset: number }>>();

function rateLimited(ip: string, scope: string): boolean {
  const now = Date.now();
  let bucket = buckets.get(scope);
  if (!bucket) {
    bucket = new Map();
    buckets.set(scope, bucket);
  }
  const entry = bucket.get(ip);
  if (!entry || now > entry.reset) {
    bucket.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function str(v: unknown, min: number, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (s.length < min || s.length > max) return null;
  return s;
}

async function sendTelegram(token: string, chatId: string, text: string): Promise<boolean> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 10_000);
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text.slice(0, 3500) }),
      signal: ctrl.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "32kb" }));

  app.post("/api/register", async (req, res) => {
    if (rateLimited(req.ip ?? "x", "register")) return res.status(429).json({ ok: false });
    const b = req.body ?? {};
    if (typeof b.company === "string" && b.company.trim() !== "") return res.json({ ok: true });
    const fullName = str(b.fullName, 3, 120);
    const phone = str(b.phone, 7, 30);
    const emailRaw = str(b.email, 5, 160);
    const email = emailRaw && EMAIL_RE.test(emailRaw) ? emailRaw : null;
    const faculty = str(b.faculty, 2, 120);
    const specialty = str(b.specialty, 2, 120);
    const course = str(b.course, 2, 40);
    const university = str(b.university, 2, 160);
    if (!fullName || !phone || !email || !faculty || !specialty || !course || !university) {
      return res.status(400).json({ ok: false });
    }
    const token = process.env.TELEGRAM_REG_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return res.status(501).json({ ok: false });
    const ok = await sendTelegram(token, chatId, `ZeroDay qeydiyyat\nAd Soyad Ata: ${fullName}\nƏlaqə: ${phone}\nEmail: ${email}\nFakültə: ${faculty}\nİxtisas: ${specialty}\nKurs: ${course}\nUniversitet: ${university}`);
    if (!ok) return res.status(502).json({ ok: false });
    return res.json({ ok: true });
  });

  app.post("/api/contact", async (req, res) => {
    if (rateLimited(req.ip ?? "x", "contact")) return res.status(429).json({ ok: false });
    const b = req.body ?? {};
    if (typeof b.company === "string" && b.company.trim() !== "") return res.json({ ok: true });
    const name = str(b.name, 2, 120);
    const emailRaw = str(b.email, 5, 160);
    const email = emailRaw && EMAIL_RE.test(emailRaw) ? emailRaw : null;
    const message = str(b.message, 5, 1000);
    if (!name || !email || !message) return res.status(400).json({ ok: false });
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return res.status(501).json({ ok: false });
    const ok = await sendTelegram(token, chatId, `ZeroDay sual\nAd: ${name}\nE-poçt: ${email}\n\n${message}`);
    if (!ok) return res.status(502).json({ ok: false });
    return res.json({ ok: true });
  });

  app.post("/api/anonymous", async (req, res) => {
    if (rateLimited(req.ip ?? "x", "anonymous")) return res.status(429).json({ ok: false });
    const b = req.body ?? {};
    if (typeof b.company === "string" && b.company.trim() !== "") return res.json({ ok: true });
    const message = str(b.message, 10, 2000);
    if (!message) return res.status(400).json({ ok: false });
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return res.status(501).json({ ok: false });
    const ok = await sendTelegram(token, chatId, `ZeroDay anonim\n\n${message}`);
    if (!ok) return res.status(502).json({ ok: false });
    return res.json({ ok: true });
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

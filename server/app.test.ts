import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp, str } from "./app.js";
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from "./csrf.js";
import { RATE_MAX, resetRateLimits } from "./rateLimit.js";

const validRegister = {
  fullName: "Ad Soyad Ata",
  phone: "+994501234567",
  email: "test@example.com",
  faculty: "Mühəndislik",
  specialty: "Kompüter elmləri",
  course: "II kurs",
  university: "GDU",
};

function clearTelegramEnv() {
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_REG_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
}

function setTelegramEnv() {
  process.env.TELEGRAM_BOT_TOKEN = "dummy-bot";
  process.env.TELEGRAM_REG_BOT_TOKEN = "dummy-reg";
  process.env.TELEGRAM_CHAT_ID = "123";
}

/** Doğru CSRF çerezi + header ilə POST sorğusu yaradır. */
function csrfPost(app: ReturnType<typeof createApp>, url: string) {
  const token = "test-csrf-token-1234567890abcdef";
  return request(app)
    .post(url)
    .set("Cookie", `${CSRF_COOKIE_NAME}=${token}`)
    .set(CSRF_HEADER_NAME, token);
}

beforeEach(() => {
  resetRateLimits();
  clearTelegramEnv();
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("str()", () => {
  it("trimləyir və min/max-ı yoxlayır", () => {
    expect(str("  abc  ", 2, 5)).toBe("abc");
    expect(str("a", 2, 5)).toBeNull();
    expect(str("abcdef", 2, 5)).toBeNull();
    expect(str(123, 1, 5)).toBeNull();
  });
});

describe("CSRF", () => {
  it("çerez yoxdursa 403 qaytarır", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app)
      .post("/api/anonymous")
      .send({ message: "Bu anonim test mesajıdır, kifayət qədər uzundur." });
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ ok: false, error: "CSRF token missing" });
  });

  it("header yoxdursa 403 qaytarır", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app)
      .post("/api/anonymous")
      .set("Cookie", `${CSRF_COOKIE_NAME}=abc123`)
      .send({ message: "Bu anonim test mesajıdır, kifayət qədər uzundur." });
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ ok: false, error: "CSRF token missing" });
  });

  it("header çerezlə uyğun deyilsə 403 qaytarır", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app)
      .post("/api/anonymous")
      .set("Cookie", `${CSRF_COOKIE_NAME}=abc123`)
      .set(CSRF_HEADER_NAME, "farkli-token")
      .send({ message: "Bu anonim test mesajıdır, kifayət qədər uzundur." });
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ ok: false, error: "CSRF token mismatch" });
  });

  it("GET çerezi set edir", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app).get("/nonexistent-api-route");
    // statik olmadığından 404/spa fallback, amma çerez header'da olmalıdır
    expect(res.headers["set-cookie"]).toBeDefined();
    const cookie = (res.headers["set-cookie"] as unknown as string[]).join(";");
    expect(cookie).toContain(`${CSRF_COOKIE_NAME}=`);
  });
});

describe("POST /api/register", () => {
  it("natamam body-də 400 qaytarır", async () => {
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/register").send({ fullName: "Ad" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ ok: false });
  });

  it("yanlış email-də 400 qaytarır", async () => {
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/register").send({ ...validRegister, email: "pis-email" });
    expect(res.status).toBe(400);
  });

  it("honeypot doludursa Telegram-a getmədən ok:true", async () => {
    const app = createApp({ serveStatic: false });
    const spy = vi.fn();
    vi.stubGlobal("fetch", spy);
    const res = await csrfPost(app, "/api/register").send({ ...validRegister, company: "bot" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(spy).not.toHaveBeenCalled();
  });

  it("env yoxdursa 501 qaytarır", async () => {
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/register").send(validRegister);
    expect(res.status).toBe(501);
  });

  it("Telegram uğurludursa 200", async () => {
    setTelegramEnv();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true })));
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/register").send(validRegister);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it("Telegram uğursuzdursa 502", async () => {
    setTelegramEnv();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false })));
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/register").send(validRegister);
    expect(res.status).toBe(502);
  });
});

describe("POST /api/contact", () => {
  const valid = { name: "Test", email: "a@b.az", message: "Salam, sualım var" };

  it("qısa mesajda 400", async () => {
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/contact").send({ ...valid, message: "hi" });
    expect(res.status).toBe(400);
  });

  it("env yoxdursa 501", async () => {
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/contact").send(valid);
    expect(res.status).toBe(501);
  });

  it("uğurlu halda 200 + rate-limit headerləri", async () => {
    setTelegramEnv();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true })));
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/contact").send(valid);
    expect(res.status).toBe(200);
    expect(res.headers["x-ratelimit-limit"]).toBe(String(RATE_MAX));
    expect(res.headers["x-ratelimit-remaining"]).toBeDefined();
    expect(res.headers["x-ratelimit-reset"]).toBeDefined();
  });
});

describe("POST /api/anonymous", () => {
  it("10 simvoldan qısa mesajda 400", async () => {
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/anonymous").send({ message: "qısa" });
    expect(res.status).toBe(400);
  });

  it("uğurlu anonim mesaj 200", async () => {
    setTelegramEnv();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true })));
    const app = createApp({ serveStatic: false });
    const res = await csrfPost(app, "/api/anonymous").send({
      message: "Bu anonim test mesajıdır, kifayət qədər uzundur.",
    });
    expect(res.status).toBe(200);
  });
});

describe("rate-limit", () => {
  it(`${RATE_MAX} sorğudan sonra 429 + Retry-After verir`, async () => {
    const app = createApp({ serveStatic: false });
    const payload = { message: "qısa" }; // 400 olsa da limit sayılır

    let last = null;
    for (let i = 0; i <= RATE_MAX; i++) {
      last = await csrfPost(app, "/api/anonymous").send(payload);
    }
    expect(last!.status).toBe(429);
    expect(last!.body).toEqual({ ok: false });
    expect(last!.headers["retry-after"]).toBeDefined();
    expect(Number(last!.headers["retry-after"])).toBeGreaterThan(0);
    expect(last!.headers["x-ratelimit-remaining"]).toBe("0");
  });

  it("limit aşıldıqdan sonra cool-down boyunca 429 qaytarmalıdır", async () => {
    const app = createApp({ serveStatic: false });
    const payload = { message: "qısa" };
    for (let i = 0; i <= RATE_MAX; i++) {
      await csrfPost(app, "/api/anonymous").send(payload);
    }
    // 429-dan sonra dərhal yenidən cəhd → hələ 429 (cool-down aktivdir)
    const res = await csrfPost(app, "/api/anonymous").send(payload);
    expect(res.status).toBe(429);
    expect(Number(res.headers["retry-after"])).toBeGreaterThan(0);
  });

  it("fərqli scope-lar ayrı limitlənir", async () => {
    const app = createApp({ serveStatic: false });
    // anonymous-u doldur
    for (let i = 0; i <= RATE_MAX; i++) {
      await csrfPost(app, "/api/anonymous").send({ message: "qısa" });
    }
    // contact başqa scope-dur — hələ 429 olmamalıdır
    const res = await csrfPost(app, "/api/contact").send({
      name: "A",
      email: "a@b.az",
      message: "kifayət qədər uzun mesaj",
    });
    expect(res.status).not.toBe(429);
  });
});

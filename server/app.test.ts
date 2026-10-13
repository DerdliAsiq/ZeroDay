import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp, str } from "./app.js";
import { resetRateLimits } from "./rateLimit.js";

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

describe("POST /api/register", () => {
  it("natamam body-də 400 qaytarır", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app).post("/api/register").send({ fullName: "Ad" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ ok: false });
  });

  it("yanlış email-də 400 qaytarır", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app)
      .post("/api/register")
      .send({ ...validRegister, email: "pis-email" });
    expect(res.status).toBe(400);
  });

  it("honeypot doludursa Telegram-a getmədən ok:true", async () => {
    const app = createApp({ serveStatic: false });
    const spy = vi.fn();
    vi.stubGlobal("fetch", spy);
    const res = await request(app)
      .post("/api/register")
      .send({ ...validRegister, company: "bot" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(spy).not.toHaveBeenCalled();
  });

  it("env yoxdursa 501 qaytarır", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app).post("/api/register").send(validRegister);
    expect(res.status).toBe(501);
  });

  it("Telegram uğurludursa 200", async () => {
    setTelegramEnv();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true })));
    const app = createApp({ serveStatic: false });
    const res = await request(app).post("/api/register").send(validRegister);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it("Telegram uğursuzdursa 502", async () => {
    setTelegramEnv();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false })));
    const app = createApp({ serveStatic: false });
    const res = await request(app).post("/api/register").send(validRegister);
    expect(res.status).toBe(502);
  });
});

describe("POST /api/contact", () => {
  const valid = { name: "Test", email: "a@b.az", message: "Salam, sualım var" };

  it("qısa mesajda 400", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app).post("/api/contact").send({ ...valid, message: "hi" });
    expect(res.status).toBe(400);
  });

  it("env yoxdursa 501", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app).post("/api/contact").send(valid);
    expect(res.status).toBe(501);
  });

  it("uğurlu halda 200 + rate-limit headerləri", async () => {
    setTelegramEnv();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true })));
    const app = createApp({ serveStatic: false });
    const res = await request(app).post("/api/contact").send(valid);
    expect(res.status).toBe(200);
    expect(res.headers["x-ratelimit-limit"]).toBe("10");
    expect(res.headers["x-ratelimit-remaining"]).toBeDefined();
    expect(res.headers["x-ratelimit-reset"]).toBeDefined();
  });
});

describe("POST /api/anonymous", () => {
  it("10 simvoldan qısa mesajda 400", async () => {
    const app = createApp({ serveStatic: false });
    const res = await request(app).post("/api/anonymous").send({ message: "qısa" });
    expect(res.status).toBe(400);
  });

  it("uğurlu anonim mesaj 200", async () => {
    setTelegramEnv();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true })));
    const app = createApp({ serveStatic: false });
    const res = await request(app)
      .post("/api/anonymous")
      .send({ message: "Bu anonim test mesajıdır, kifayət qədər uzundur." });
    expect(res.status).toBe(200);
  });
});

describe("rate-limit", () => {
  it("10 sorğudan sonra 429 + Retry-After verir", async () => {
    const app = createApp({ serveStatic: false });
    const payload = { message: "qısa" }; // 400 olsa da limit sayılır

    let last = null;
    for (let i = 0; i < 11; i++) {
      last = await request(app).post("/api/anonymous").send(payload);
    }
    expect(last!.status).toBe(429);
    expect(last!.body).toEqual({ ok: false });
    expect(last!.headers["retry-after"]).toBeDefined();
    expect(Number(last!.headers["retry-after"])).toBeGreaterThan(0);
    expect(last!.headers["x-ratelimit-remaining"]).toBe("0");
  });

  it("fərqli scope-lar ayrı limitlənir", async () => {
    const app = createApp({ serveStatic: false });
    // anonymous-u doldur
    for (let i = 0; i < 11; i++) {
      await request(app).post("/api/anonymous").send({ message: "qısa" });
    }
    // contact başqa scope-dur — hələ 429 olmamalıdır
    const res = await request(app)
      .post("/api/contact")
      .send({ name: "A", email: "a@b.az", message: "kifayət qədər uzun mesaj" });
    expect(res.status).not.toBe(429);
  });
});

// Sessiz İstihbarat: /admin (honeypot) səhifəsinə olan istəkləri
// IP, User-Agent, query/body parametrləri ilə qeyd edir və Telegram /
// Discord webhook-una anında bildirim göndərir.
// Bildirim özü throttle olunur ki, fuzzer spam etsə webhook partlamasın.

export type HoneypotHit = {
  ip: string;
  method: string;
  path: string;
  userAgent: string;
  query: Record<string, unknown>;
  body: Record<string, unknown>;
  at: string;
};

// Bildirim throttle: ən azı 30 saniyədə bir
const NOTIFY_COOLDOWN_MS = 30_000;
let lastNotifyAt = 0;

/** Son hit-lər (son 50) — konsolda qeyd üçün nümunə. */
const recentHits: HoneypotHit[] = [];
const MAX_HITS = 50;

export function recordHit(hit: HoneypotHit): void {
  recentHits.push(hit);
  if (recentHits.length > MAX_HITS) recentHits.shift();

  // Konsol log (production-da Render loglarında görünür)
  console.log(
    `[HONEYPOT] ${hit.at} ${hit.method} ${hit.path} ip=${hit.ip} ua="${hit.userAgent}" query=${JSON.stringify(hit.query)}`,
  );

  // Async bildirim (gözlətmirik)
  void notify(hit);
}

export function getRecentHits(): HoneypotHit[] {
  return [...recentHits];
}

function buildMessage(hit: HoneypotHit): string {
  const lines = [
    `🚨 ZERO DAY HONEYPOT`,
    `Vaxt: ${hit.at}`,
    `IP: ${hit.ip}`,
    `Metod: ${hit.method}`,
    `Yol: ${hit.path}`,
    `UA: ${hit.userAgent}`,
  ];
  const q = Object.entries(hit.query);
  if (q.length) lines.push(`Query: ${q.map(([k, v]) => `${k}=${String(v)}`).join("&")}`);
  const b = Object.entries(hit.body).filter(([k]) => k !== "company");
  if (b.length) lines.push(`Body: ${b.map(([k, v]) => `${k}=${String(v)}`).join("&")}`);
  lines.push(`Bu istifadəçi dizin fuzzing edir.`);
  return lines.join("\n");
}

async function notify(hit: HoneypotHit): Promise<void> {
  const now = Date.now();
  if (now - lastNotifyAt < NOTIFY_COOLDOWN_MS) return; // throttle
  lastNotifyAt = now;

  const text = buildMessage(hit);

  // 1) Telegram (mövcud bot token + chat id)
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChat = process.env.TELEGRAM_CHAT_ID;
  if (tgToken && tgChat) {
    try {
      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text: text.slice(0, 3500) }),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      /* bildirim uğursuz olsa da log artıq konsola düşüb */
    }
  }

  // 2) Discord webhook (əgər təyin olunubsa)
  const discordUrl = process.env.DISCORD_WEBHOOK_URL;
  if (discordUrl) {
    try {
      await fetch(discordUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text.slice(0, 1900) }),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      /* sessiz */
    }
  }
}

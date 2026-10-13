// IP bazlı rate-limit — LRU eviction + Retry-After hesablaması.
// Redis yoxdur (tək instans Render üçün kifayətdir); miqyaslansa bu modulun
// arxasına Redis adapteri qoymaq kifayətdir.

export const RATE_WINDOW_MS = 60_000;
export const RATE_MAX = 10;
const MAX_KEYS = 5000;

type Entry = { count: number; reset: number };
const buckets = new Map<string, Entry>();

function key(ip: string, scope: string): string {
  return `${scope}:${ip}`;
}

function prune(now: number): void {
  // Vaxtı keçmişləri təmizlə
  buckets.forEach((v, k) => {
    if (now > v.reset) buckets.delete(k);
  });
  // Həddi aşsa ən köhnə (insertion order) açarları sil — sadə LRU
  while (buckets.size > MAX_KEYS) {
    const oldest = buckets.keys().next();
    if (oldest.done) break;
    buckets.delete(oldest.value);
  }
}

export function isRateLimited(ip: string, scope: string): {
  limited: boolean;
  retryAfterSec: number;
  remaining: number;
  resetSec: number;
} {
  const now = Date.now();
  const k = key(ip, scope);
  const entry = buckets.get(k);

  if (!entry || now > entry.reset) {
    const reset = now + RATE_WINDOW_MS;
    // Yenidən yazaraq recency-i yenilə
    buckets.delete(k);
    buckets.set(k, { count: 1, reset });
    if (buckets.size % 100 === 0) prune(now);
    return {
      limited: false,
      retryAfterSec: 0,
      remaining: RATE_MAX - 1,
      resetSec: Math.ceil(reset / 1000),
    };
  }

  entry.count += 1;
  // Toxunulan açarı sona köçür (LRU recency)
  buckets.delete(k);
  buckets.set(k, entry);

  if (entry.count > RATE_MAX) {
    return {
      limited: true,
      retryAfterSec: Math.max(1, Math.ceil((entry.reset - now) / 1000)),
      remaining: 0,
      resetSec: Math.ceil(entry.reset / 1000),
    };
  }
  return {
    limited: false,
    retryAfterSec: 0,
    remaining: RATE_MAX - entry.count,
    resetSec: Math.ceil(entry.reset / 1000),
  };
}

/** Testlər üçün bucket-ləri sıfırla. */
export function resetRateLimits(): void {
  buckets.clear();
}

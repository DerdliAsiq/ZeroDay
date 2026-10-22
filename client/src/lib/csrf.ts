const CSRF_COOKIE_NAME = "csrf_token";
const CSRF_HEADER_NAME = "X-CSRF-Token";

/**
 * Double Submit Cookie pattern: sunucunun set etdiyi `csrf_token` çerezini
 * oxuyub `X-CSRF-Token` header-ı kimi qaytarır. SPA yalnız JavaScript ilə
 * oxuya bilir (HttpOnly deyil), haker isə cross-origin-də çerezi oxuya
 * bilmədiyi üçün header-ı düzgün doldura bilmir (CSRF qorunması).
 */
export function getCsrfToken(): string {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${CSRF_COOKIE_NAME}=([^;]*)`));
  if (m && m[1]) return decodeURIComponent(m[1]);
  return "";
}

/** State-changing fetch üçün standart başlıqlar (Content-Type + CSRF). */
export function csrfHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    [CSRF_HEADER_NAME]: getCsrfToken(),
  };
}

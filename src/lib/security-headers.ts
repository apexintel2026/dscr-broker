/**
 * Static security headers for next.config.
 * HighLevel booking/form iframes load from api.leadconnectorhq.com — do not
 * omit that origin from frame-src. The official resize script is
 * https://link.msgsndr.com/js/form_embed.js (script-src only; it talks to
 * the iframe via postMessage, so connect-src does not need msgsndr).
 * frame-ancestors blocks others from framing *this* site; it does not
 * restrict our embeds.
 */

const isDev = process.env.NODE_ENV !== "production";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "blob:",
  "https://va.vercel-scripts.com",
  "https://link.msgsndr.com",
  ...(isDev ? ["'unsafe-eval'"] : []),
].join(" ");

const connectSrc = [
  "'self'",
  "https://vitals.vercel-insights.com",
  "https://va.vercel-scripts.com",
  ...(isDev ? ["ws:", "wss:"] : []),
].join(" ");

/** Single-line CSP. Keep HighLevel widget origins in frame-src. */
export const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src ${connectSrc}`,
  "frame-src https://api.leadconnectorhq.com https://*.leadconnectorhq.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

export const securityHeaders: { key: string; value: string }[] = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

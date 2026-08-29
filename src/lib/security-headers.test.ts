import { describe, expect, it } from "vitest";
import { contentSecurityPolicy, securityHeaders } from "./security-headers";

function header(name: string) {
  return securityHeaders.find((item) => item.key === name)?.value;
}

describe("security headers", () => {
  it("allows HighLevel widget iframes and does not frame this site", () => {
    expect(contentSecurityPolicy).toContain(
      "frame-src https://api.leadconnectorhq.com https://*.leadconnectorhq.com",
    );
    expect(contentSecurityPolicy).toContain("frame-ancestors 'none'");
    expect(contentSecurityPolicy).not.toMatch(/frame-src 'none'/);
    expect(header("X-Frame-Options")).toBe("DENY");
  });

  it("sets nosniff, referrer-policy, and permissions-policy", () => {
    expect(header("X-Content-Type-Options")).toBe("nosniff");
    expect(header("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(header("Permissions-Policy")).toContain("camera=()");
    expect(header("Permissions-Policy")).toContain("geolocation=()");
  });

  it("does not invent a GA or Meta host", () => {
    expect(contentSecurityPolicy).not.toMatch(/googletagmanager|facebook\.net|google-analytics/i);
  });

  it("allows only the HighLevel form_embed.js host on script-src", () => {
    expect(contentSecurityPolicy).toMatch(
      /script-src[^;]*https:\/\/link\.msgsndr\.com/,
    );
    expect(contentSecurityPolicy).not.toMatch(/script-src[^;]*https:\/\/\*\.msgsndr\.com/);
    expect(contentSecurityPolicy).not.toMatch(/connect-src[^;]*msgsndr/);
    expect(contentSecurityPolicy).not.toMatch(/frame-src[^;]*msgsndr/);
  });
});

import { afterEach, describe, expect, it } from "vitest";
import { isCalculatorLeadCaptureEnabled } from "./flags";

const FLAG = "NEXT_PUBLIC_CALCULATOR_LEAD_CAPTURE";

describe("isCalculatorLeadCaptureEnabled", () => {
  afterEach(() => {
    delete process.env[FLAG];
  });

  it("is off by default", () => {
    delete process.env[FLAG];
    expect(isCalculatorLeadCaptureEnabled()).toBe(false);
  });

  it("is off for any value other than true", () => {
    process.env[FLAG] = "1";
    expect(isCalculatorLeadCaptureEnabled()).toBe(false);
    process.env[FLAG] = "false";
    expect(isCalculatorLeadCaptureEnabled()).toBe(false);
  });

  it("is on only when set to true", () => {
    process.env[FLAG] = "true";
    expect(isCalculatorLeadCaptureEnabled()).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { calculatorHref, occupancyFromQuery } from "./calculator-query";

describe("occupancyFromQuery", () => {
  it("defaults to LTR when missing or unknown", () => {
    expect(occupancyFromQuery(undefined)).toBe("ltr");
    expect(occupancyFromQuery("")).toBe("ltr");
    expect(occupancyFromQuery("airbnb")).toBe("ltr");
    expect(occupancyFromQuery(["nope", "str"])).toBe("ltr");
  });

  it("accepts str and ltr", () => {
    expect(occupancyFromQuery("str")).toBe("str");
    expect(occupancyFromQuery("ltr")).toBe("ltr");
    expect(occupancyFromQuery(["str"])).toBe("str");
  });
});

describe("calculatorHref", () => {
  it("omits the query for LTR and sets occupancy for STR", () => {
    expect(calculatorHref("ltr")).toBe("/calculator");
    expect(calculatorHref()).toBe("/calculator");
    expect(calculatorHref("str")).toBe("/calculator?occupancy=str");
  });
});

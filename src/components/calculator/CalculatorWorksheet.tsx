"use client";

import { useMemo, useState } from "react";
import { DealSummary } from "@/components/calculator/DealSummary";
import { Field, SegmentedControl, fieldInputClass } from "@/components/calculator/fields";
import { LeadCapture } from "@/components/calculator/LeadCapture";
import { ShareReport } from "@/components/calculator/ShareReport";
import { Card } from "@/components/ui/Card";
import { calculateDeal, type AmountCadence, type DownPaymentMode, type DscrInputs, type OccupancyType } from "@/lib/dscr";
import { encodeReportId } from "@/lib/dscr-codec";
import { optionalNumber, parseNumber } from "@/lib/format";

const emptyForm = {
  purchasePrice: "",
  downPaymentValue: "",
  monthlyGrossRent: "",
  annualInterestRatePercent: "",
  termYears: "30",
  taxes: "",
  insurance: "",
  hoa: "",
  vacancyPercent: "",
  maintenancePercent: "",
  propertyManagementPercent: "",
};

export function CalculatorWorksheet() {
  const [form, setForm] = useState(emptyForm);
  const [downPaymentMode, setDownPaymentMode] = useState<DownPaymentMode>("percent");
  const [occupancyType, setOccupancyType] = useState<OccupancyType>("ltr");
  const [interestOnly, setInterestOnly] = useState(false);
  const [taxesCadence, setTaxesCadence] = useState<AmountCadence>("monthly");
  const [insuranceCadence, setInsuranceCadence] = useState<AmountCadence>("monthly");
  const [hoaCadence, setHoaCadence] = useState<AmountCadence>("monthly");

  function setField(key: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  const parsed = useMemo(() => {
    const price = parseNumber(form.purchasePrice);
    const down = parseNumber(form.downPaymentValue);
    const rent = parseNumber(form.monthlyGrossRent);
    const rate = parseNumber(form.annualInterestRatePercent);
    const term = parseNumber(form.termYears);
    const ready =
      Number.isFinite(price) &&
      price > 0 &&
      Number.isFinite(down) &&
      down >= 0 &&
      Number.isFinite(rent) &&
      rent >= 0 &&
      Number.isFinite(rate) &&
      rate >= 0 &&
      (interestOnly || (Number.isFinite(term) && term > 0));

    if (!ready) return null;

    const inputs: DscrInputs = {
      purchasePrice: price,
      downPaymentMode,
      downPaymentValue: down,
      monthlyGrossRent: rent,
      occupancyType,
      annualInterestRatePercent: rate,
      termYears: Number.isFinite(term) ? term : 30,
      taxes: optionalNumber(form.taxes),
      taxesCadence,
      insurance: optionalNumber(form.insurance),
      insuranceCadence,
      hoa: optionalNumber(form.hoa),
      hoaCadence,
      vacancyPercent: optionalNumber(form.vacancyPercent),
      maintenancePercent: optionalNumber(form.maintenancePercent),
      propertyManagementPercent: optionalNumber(form.propertyManagementPercent),
      interestOnly,
    };
    return { inputs, ...calculateDeal(inputs) };
  }, [
    form,
    downPaymentMode,
    occupancyType,
    interestOnly,
    taxesCadence,
    insuranceCadence,
    hoaCadence,
  ]);

  const reportId = parsed?.inputs ? encodeReportId(parsed.inputs) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Card className="space-y-6 p-6 lg:col-span-6">
        <div className="space-y-4">
          <p className="text-sm font-medium text-ink">Property</p>
          <SegmentedControl
            label="Occupancy on this worksheet"
            value={occupancyType}
            onChange={setOccupancyType}
            options={[
              { value: "ltr", label: "LTR" },
              { value: "str", label: "STR" },
            ]}
          />
          <Field label="Purchase price / value">
            <input
              inputMode="decimal"
              placeholder="e.g. 400000"
              value={form.purchasePrice}
              onChange={(event) => setField("purchasePrice", event.target.value)}
              className={fieldInputClass}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <SegmentedControl
              label="Down payment"
              value={downPaymentMode}
              onChange={setDownPaymentMode}
              options={[
                { value: "percent", label: "%" },
                { value: "amount", label: "$" },
              ]}
            />
            <Field
              label={downPaymentMode === "percent" ? "Down %" : "Down $"}
            >
              <input
                inputMode="decimal"
                placeholder={downPaymentMode === "percent" ? "e.g. 25" : "e.g. 100000"}
                value={form.downPaymentValue}
                onChange={(event) =>
                  setField("downPaymentValue", event.target.value)
                }
                className={fieldInputClass}
              />
            </Field>
          </div>
          <Field
            label={
              occupancyType === "str"
                ? "Monthly rent projection"
                : "Monthly gross rent"
            }
            hint={
              occupancyType === "str"
                ? "Your projection (rent_is_projection=yes). No third-party scrape."
                : "In-place or market rent you are using for the file."
            }
          >
            <input
              inputMode="decimal"
              placeholder="e.g. 3200"
              value={form.monthlyGrossRent}
              onChange={(event) =>
                setField("monthlyGrossRent", event.target.value)
              }
              className={fieldInputClass}
            />
          </Field>
        </div>

        <div className="space-y-4 border-t border-border pt-6">
          <p className="text-sm font-medium text-ink">Financing estimate</p>
          <Field
            label="Interest rate estimate (%)"
            hint="Your number — not a quote from this desk and not a lock."
          >
            <input
              inputMode="decimal"
              placeholder="e.g. 7.00"
              value={form.annualInterestRatePercent}
              onChange={(event) =>
                setField("annualInterestRatePercent", event.target.value)
              }
              className={fieldInputClass}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Term (years)">
              <input
                inputMode="decimal"
                placeholder="30"
                value={form.termYears}
                onChange={(event) => setField("termYears", event.target.value)}
                className={fieldInputClass}
              />
            </Field>
            <SegmentedControl
              label="Amortization"
              value={interestOnly ? "io" : "amortizing"}
              onChange={(value) => setInterestOnly(value === "io")}
              options={[
                { value: "amortizing", label: "Amortizing" },
                { value: "io", label: "Interest-only" },
              ]}
            />
          </div>
          {interestOnly ? (
            <p className="text-xs text-warning">
              IO is on. Debt service is ITIA (no principal). Default is
              amortizing PITIA.
            </p>
          ) : null}
        </div>

        <div className="space-y-4 border-t border-border pt-6">
          <p className="text-sm font-medium text-ink">Taxes, insurance, HOA</p>
          <ExpenseField
            label="Taxes"
            amount={form.taxes}
            cadence={taxesCadence}
            onAmount={(value) => setField("taxes", value)}
            onCadence={setTaxesCadence}
          />
          <ExpenseField
            label="Insurance"
            amount={form.insurance}
            cadence={insuranceCadence}
            onAmount={(value) => setField("insurance", value)}
            onCadence={setInsuranceCadence}
          />
          <ExpenseField
            label="HOA"
            amount={form.hoa}
            cadence={hoaCadence}
            onAmount={(value) => setField("hoa", value)}
            onCadence={setHoaCadence}
          />
        </div>

        <div className="space-y-4 border-t border-border pt-6">
          <p className="text-sm font-medium text-ink">
            Investor expenses (optional)
          </p>
          <p className="text-xs text-muted">
            Display-only. These do not change lender DSCR.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Vacancy %">
              <input
                inputMode="decimal"
                placeholder="0"
                value={form.vacancyPercent}
                onChange={(event) =>
                  setField("vacancyPercent", event.target.value)
                }
                className={fieldInputClass}
              />
            </Field>
            <Field label="Maint %">
              <input
                inputMode="decimal"
                placeholder="0"
                value={form.maintenancePercent}
                onChange={(event) =>
                  setField("maintenancePercent", event.target.value)
                }
                className={fieldInputClass}
              />
            </Field>
            <Field label="PM %">
              <input
                inputMode="decimal"
                placeholder="0"
                value={form.propertyManagementPercent}
                onChange={(event) =>
                  setField("propertyManagementPercent", event.target.value)
                }
                className={fieldInputClass}
              />
            </Field>
          </div>
        </div>
      </Card>

      <div className="space-y-4 lg:col-span-6">
        {parsed?.result ? (
          <>
            <DealSummary inputs={parsed.inputs} result={parsed.result} />
            {reportId ? (
              <Card className="space-y-6 p-6">
                <ShareReport reportId={reportId} />
                <div className="border-t border-border pt-6">
                  <LeadCapture reportId={reportId} />
                </div>
              </Card>
            ) : null}
          </>
        ) : (
          <Card elevated className="p-6">
            <p className="text-sm font-medium text-ink">Results appear here</p>
            <p className="mt-2 text-sm text-muted">
              Still need {missingFields(form, interestOnly).join(", ")}. No
              email wall. Nothing here is a quote or a credit decision.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

function missingFields(
  form: typeof emptyForm,
  interestOnly: boolean,
): string[] {
  const needed: string[] = [];
  if (!Number.isFinite(parseNumber(form.purchasePrice))) needed.push("price");
  if (!Number.isFinite(parseNumber(form.downPaymentValue))) needed.push("down");
  if (!Number.isFinite(parseNumber(form.monthlyGrossRent))) needed.push("rent");
  if (!Number.isFinite(parseNumber(form.annualInterestRatePercent))) {
    needed.push("rate estimate");
  }
  if (!interestOnly && !Number.isFinite(parseNumber(form.termYears))) {
    needed.push("term");
  }
  return needed.length > 0 ? needed : ["a valid number in each required field"];
}

function ExpenseField({
  label,
  amount,
  cadence,
  onAmount,
  onCadence,
}: {
  label: string;
  amount: string;
  cadence: AmountCadence;
  onAmount: (value: string) => void;
  onCadence: (value: AmountCadence) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label={label}>
        <input
          inputMode="decimal"
          placeholder="0"
          value={amount}
          onChange={(event) => onAmount(event.target.value)}
          className={fieldInputClass}
        />
      </Field>
      <SegmentedControl
        label="Cadence"
        value={cadence}
        onChange={onCadence}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "annual", label: "Annual" },
        ]}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KPIRow } from "@/components/dashboard/kpi-row";
import { IncomeOutcomeChart } from "@/components/dashboard/income-outcome-chart";
import { ProfitPercentChart } from "@/components/dashboard/profit-percent-chart";
import { RiskyPracticesPanel } from "@/components/dashboard/risky-practices-panel";
import {
  type FinancialMovement,
  type KPIMetrics,
  type MonthlyDataPoint,
  isFinancialMovementArray,
} from "@/lib/financial-types";
import { computeKPIs, computeMonthlyData } from "@/lib/financial-utils";
import { buildRiskPracticeChecks } from "@/lib/risky-practice-checks";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_API_BASE_URL = "/api";

function normalizeApiBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

async function fetchFinancialData(apiBaseUrl?: string): Promise<FinancialMovement[]> {
  const baseUrl = apiBaseUrl?.trim() ? apiBaseUrl : DEFAULT_API_BASE_URL;

  const endpoint = baseUrl === DEFAULT_API_BASE_URL
    ? `${DEFAULT_API_BASE_URL}/metrics`
    : `${normalizeApiBaseUrl(baseUrl)}/api/metrics`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch financial data: ${response.status}`);
  }

  const parsedData: unknown = await response.json();
  if (!isFinancialMovementArray(parsedData)) {
    throw new Error("Invalid API payload: expected FinancialMovement[]");
  }

  return parsedData;
}

function App() {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const checks = buildRiskPracticeChecks({
    apiBaseUrl: API_BASE_URL,
    hadFetchError: Boolean(error),
  });

  useEffect(() => {
    fetchFinancialData(API_BASE_URL)
      .then((movements) => {
        setMetrics(computeKPIs(movements));
        setMonthlyData(computeMonthlyData(movements));
      })
      .catch((err: unknown) => {
        console.error("Error loading financial dashboard data", err);
        const detail = err instanceof Error ? err.message : "Unknown error";
        setError(
          `No se pudo cargar la informacion financiera. Revisa la API de backend. Detalle: ${detail}`,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader period="2024 - Full Year" />

          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground">
              {error}
            </div>
          ) : null}

          <section aria-label="Key performance indicators">
            <KPIRow metrics={metrics} loading={loading} />
          </section>

          <RiskyPracticesPanel checks={checks} />

          <section
            aria-label="Financial charts"
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
          >
            <IncomeOutcomeChart data={monthlyData} loading={loading} />
            <ProfitPercentChart data={monthlyData} loading={loading} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;

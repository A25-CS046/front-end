import { http } from "./axiosClient";
import {
  toCamelCase,
  mapMachine,
  mapTelemetryRow,
  mapTimeseriesRow,
  mapRiskPrediction,
} from "@/utils/mappers";

/**
 * Dashboard API Service
 * Semua fungsi mengembalikan data dalam camelCase
 */

/**
 * Get dashboard summary (KPI cards)
 * @param {{ window?: string, asOf?: string }} params
 * @returns {Promise<{ totalMachines, stats, statusCounts, activeFailures }>}
 */
export async function getSummary({ window = "24h", asOf } = {}) {
  const params = { window };
  if (asOf) params.asOf = asOf;

  const { data } = await http.get("/dashboard/summary", params);
  return toCamelCase(data);
}

/**
 * Get machines list (paginated)
 * @param {{ asOf?: string, limit?: number, offset?: number }} params
 * @returns {Promise<{ items: Machine[], count: number }>}
 */
export async function getMachines({ asOf, limit = 100, offset = 0 } = {}) {
  const params = { limit, offset };
  if (asOf) params.asOf = asOf;

  const { data } = await http.get("/dashboard/machines", params);
  // API returns { meta: { count, limit, offset }, data: [...] }
  return {
    items: (data.data || []).map(mapMachine),
    count: data.meta?.count || 0,
  };
}

/**
 * Get active tasks counts
 * @returns {Promise<{ inProgress: number, pending: number, completed: number, cancelled: number }>}
 */
export async function getActiveTasks() {
  const { data } = await http.get("/dashboard/active-tasks");
  return {
    inProgress: data.in_progress ?? 0,
    pending: data.pending ?? 0,
    completed: data.completed ?? 0,
    cancelled: data.cancelled ?? 0,
    total:
      (data.in_progress ?? 0) +
      (data.pending ?? 0) +
      (data.completed ?? 0) +
      (data.cancelled ?? 0),
  };
}

/**
 * Get team members stats
 * @returns {Promise<{ total: number, available: number, onTask: number }>}
 */
export async function getTeamMembers() {
  const { data } = await http.get("/dashboard/team-members");
  return {
    total: data.total ?? 0,
    available: data.available ?? 0,
    onTask: data.onTask ?? data.on_task ?? 0,
  };
}

/**
 * Get team performance data for charts
 * @param {{ weeks?: number }} params
 * @returns {Promise<Array<{ name: string, weekStart: string, completed: number, totalScheduled: number, efficiency: number }>>}
 */
export async function getTeamPerformance({ weeks = 4 } = {}) {
  const { data } = await http.get("/dashboard/team-perf", { weeks });
  return (Array.isArray(data) ? data : []).map((row) => ({
    name: row.week || row.name || `Week`,
    weekStart: row.weekStart || row.week_start,
    completed: row.tasksCompleted ?? row.tasks_completed ?? 0,
    totalScheduled: row.totalScheduled ?? row.total_scheduled ?? 0,
    efficiency: Math.round(row.efficiency ?? 0),
  }));
}

/**
 * Get risk predictions for top risk machines
 * @param {{ limit?: number }} params
 * @returns {Promise<{ predictions: RiskPrediction[], summary: { critical: number, high: number, medium: number, low: number } }>}
 */
export async function getRiskPredictions({ limit = 4 } = {}) {
  const { data } = await http.get("/dashboard/risk-predictions", { limit });
  return {
    predictions: (data.predictions || []).map(mapRiskPrediction),
    summary: {
      critical: data.summary?.critical ?? 0,
      high: data.summary?.high ?? 0,
      medium: data.summary?.medium ?? 0,
      low: data.summary?.low ?? 0,
    },
  };
}

/**
 * Get raw or aggregated telemetry
 * @param {{ start: string, end: string, unitId?: string, productId?: string, limit?: number, offset?: number, aggregate?: 'raw'|'hourly'|'daily' }} params
 * @returns {Promise<{ meta: object, data: TelemetryRow[] }>}
 */
export async function getTelemetry({
  start,
  end,
  unitId,
  productId,
  limit = 100,
  offset = 0,
  aggregate = "raw",
} = {}) {
  const params = { start, end, limit, offset, aggregate };
  if (unitId) params.unitId = unitId;
  if (productId) params.productId = productId;

  const { data } = await http.get("/telemetry", params);
  return {
    meta: toCamelCase(data.meta || {}),
    data: (data.data || []).map(mapTelemetryRow),
  };
}

/**
 * Get timeseries for a specific machine
 * @param {string} unitId
 * @param {{ start: string, end: string, interval?: string }} params
 * @returns {Promise<TimeseriesRow[]>}
 */
export async function getMachineTimeseries(
  unitId,
  { start, end, interval = "1h" } = {}
) {
  const params = { start, end, interval };

  const { data } = await http.get(
    `/dashboard/machine/${unitId}/telemetry`,
    params
  );
  return (Array.isArray(data) ? data : []).map(mapTimeseriesRow);
}

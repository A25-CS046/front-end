import { http } from "./axiosClient";

/**
 * Machine API Service
 * Endpoints untuk list machines, machine details, dan sensor timeseries
 */

/**
 * Get machines list (paginated)
 * @param {{ limit?: number, offset?: number, search?: string, status?: string }} params
 * @returns {Promise<{ meta: { count, limit, offset }, data: Machine[] }>}
 */
export async function listMachines({
  limit = 50,
  offset = 0,
  search,
  status,
} = {}) {
  const params = { limit, offset };
  if (search) params.search = search;
  if (status && status !== "all") params.status = status;

  const { data } = await http.get("/machines", params);
  return {
    meta: data.meta || { count: 0, limit, offset },
    data: (data.data || []).map(normalizeMachine),
  };
}

/**
 * Get single machine details
 * @param {string} unitId
 * @returns {Promise<Machine>}
 */
export async function getMachine(unitId) {
  const { data } = await http.get(`/machines/${unitId}`);
  return normalizeMachine(data);
}

/**
 * Get machine sensor timeseries
 * @param {string} unitId
 * @param {{ start?: string, end?: string, interval?: 'raw'|'hourly'|'daily', limit?: number, offset?: number }} params
 * @returns {Promise<{ meta: object, data: SensorPoint[] }>}
 */
export async function getMachineSensors(
  unitId,
  { start, end, interval = "hourly", limit = 500, offset = 0 } = {}
) {
  const params = { interval, limit, offset };
  if (start) params.start = start;
  if (end) params.end = end;

  const { data } = await http.get(`/machines/${unitId}/sensors`, params);
  return {
    meta: data.meta || { start, end, interval, count: 0 },
    data: (data.data || []).map(normalizeSensorPoint),
  };
}

/**
 * Normalize machine object from API
 * @param {object} raw
 * @returns {Machine}
 */
function normalizeMachine(raw) {
  let status = raw.status ? raw.status.toLowerCase() : null;

  if (!status && raw.healthPercent != null) {
    const health = raw.healthPercent ?? raw.health_percent;
    if (health >= 80) {
      status = "healthy";
    } else if (health >= 50) {
      status = "warning";
    } else {
      status = "critical";
    }
  }

  const normalized = {
    unitId: raw.unitId ?? raw.unit_id ?? null,
    productId: raw.productId ?? raw.product_id ?? null,
    name: raw.name ?? null,
    type: raw.type ?? null,
    manufacturer: raw.manufacturer ?? null,
    model: raw.model ?? null,
    location: raw.location ?? null,
    healthPercent: raw.healthPercent ?? raw.health_percent ?? null,
    syntheticRUL:
      raw.syntheticRUL ?? raw.synthetic_RUL ?? raw.synthetic_rul ?? null,
    status: status,
    installDate: raw.installDate ?? raw.install_date ?? null,
    lastMaintenance: raw.lastMaintenance ?? raw.last_maintenance ?? null,
    lastSeen: raw.meta?.lastSeen ?? raw.lastSeen ?? raw.last_seen ?? null,
  };

  return normalized;
}

/**
 * Normalize sensor point from API
 * @param {object} raw
 * @returns {SensorPoint}
 */
function normalizeSensorPoint(raw) {
  return {
    timestamp: raw.timestamp,
    vibration:
      raw.vibration ??
      raw.rotationalSpeedRpm ??
      raw.rotational_speed_rpm ??
      null,
    temperatureC: raw.temperatureC ?? raw.temperature_c ?? null,
    current: raw.current ?? raw.torqueNm ?? raw.torque_nm ?? null,
    rotationalSpeedRpm:
      raw.rotationalSpeedRpm ?? raw.rotational_speed_rpm ?? null,
    processTemperatureK:
      raw.processTemperatureK ?? raw.process_temperature_K ?? null,
    airTemperatureK: raw.airTemperatureK ?? raw.air_temperature_K ?? null,
    torqueNm: raw.torqueNm ?? raw.torque_nm ?? null,
    toolWearMin: raw.toolWearMin ?? raw.tool_wear_min ?? null,
    syntheticRUL:
      raw.syntheticRUL ?? raw.synthetic_RUL ?? raw.synthetic_rul ?? null,
  };
}

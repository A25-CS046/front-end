/**
 * Utility functions untuk mapping data API (snake_case → camelCase)
 */

/**
 * Convert snake_case string to camelCase
 * @param {string} str
 */
export function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Recursively convert object keys from snake_case to camelCase
 * @param {any} obj
 */
export function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = snakeToCamel(key);
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}

/**
 * Map machine row from API to UI format
 * Expected input from API:
 * { unit_id, product_id, lastSeen, healthPercent, synthetic_RUL, status, process_temperature_K, rotational_speed_rpm, tool_wear_min, location, is_failure }
 * @param {object} row
 */
export function mapMachine(row) {
  const rul = row.synthetic_RUL ?? row.syntheticRUL ?? row.synthetic_rul;
  const health =
    row.healthPercent ?? row.health_percent ?? computeHealthPercent(rul);
  const status = row.status || getStatusFromRUL(rul);

  return {
    id: row.unit_id || row.unitId,
    unitId: row.unit_id || row.unitId,
    productId: row.product_id || row.productId,

    name: row.name || `Machine ${row.unit_id || row.unitId}`,

    health: Math.round(health),
    healthPercent: health,
    rul: Math.round(rul ?? 0),
    syntheticRUL: rul,
    status: status,

    lastSeen: row.lastSeen || row.last_seen,
    processTemperatureK:
      row.process_temperature_K ??
      row.process_temperature_k ??
      row.processTemperatureK,
    rotationalSpeedRpm: row.rotational_speed_rpm ?? row.rotationalSpeedRpm,
    toolWearMin: row.tool_wear_min ?? row.toolWearMin,
    isFailure: row.is_failure ?? row.isFailure ?? false,

    location: row.location || "Unknown",
  };
}

/**
 * Map telemetry row from API
 * @param {object} row
 */
export function mapTelemetryRow(row) {
  return {
    productId: row.product_id,
    unitId: row.unit_id,
    timestamp: row.timestamp,
    stepIndex: row.step_index,
    airTemperatureK: row.air_temperature_k ?? row.air_temperature_K,
    processTemperatureK: row.process_temperature_k ?? row.process_temperature_K,
    rotationalSpeedRpm: row.rotational_speed_rpm,
    torqueNm: row.torque_nm ?? row.torque_Nm,
    toolWearMin: row.tool_wear_min,
    isFailure: row.is_failure,
    failureType: row.failure_type,
    syntheticRUL: row.synthetic_rul ?? row.synthetic_RUL,
    avgProcessTemperatureK:
      row.avg_process_temperature_k ?? row.avg_process_temperature_K,
    avgRotationalSpeedRpm: row.avg_rotational_speed_rpm,
    avgTorqueNm: row.avg_torque_nm ?? row.avg_torque_Nm,
    avgToolWearMin: row.avg_tool_wear_min,
    avgSyntheticRUL: row.avg_synthetic_rul ?? row.avg_synthetic_RUL,
  };
}

/**
 * Map timeseries row from API
 * @param {object} row
 */
export function mapTimeseriesRow(row) {
  return {
    timestamp: row.timestamp,
    avgProcessTemperatureK:
      row.avg_process_temperature_K ?? row.avg_process_temperature_k,
    avgRotationalSpeedRpm: row.avg_rotational_speed_rpm,
    avgTorqueNm: row.avg_torque_Nm ?? row.avg_torque_nm,
    avgToolWearMin: row.avg_tool_wear_min,
    avgSyntheticRUL: row.avg_synthetic_RUL ?? row.avg_synthetic_rul,
  };
}

/**
 * Map risk prediction from API
 * @param {object} row
 */
export function mapRiskPrediction(row) {
  const riskScore = Math.round(row.riskScore ?? row.risk_score ?? 0);

  return {
    machineId: row.machineId ?? row.machine_id ?? row.unitId ?? row.unit_id,
    machineName:
      row.machineName ??
      row.machine_name ??
      `Machine ${row.machineId ?? row.machine_id ?? row.unitId ?? row.unit_id}`,
    productId: row.productId ?? row.product_id,
    riskScore: riskScore,
    riskLevel:
      row.riskLevel ?? row.risk_level ?? getRiskLevelFromScore(riskScore),
    primaryRisk: row.primaryRisk ?? row.primary_risk ?? row.reason ?? "Unknown",
    failureProbability: Math.round(
      row.failureProbability ?? row.failure_probability ?? riskScore * 0.9
    ),
    timeToFailure: row.timeToFailure ?? row.time_to_failure ?? "Unknown",
    trend: row.trend ?? "stable",
    scheduleId: row.scheduleId ?? row.schedule_id,
    recommendedStart: row.recommendedStart ?? row.recommended_start,
    recommendedEnd: row.recommendedEnd ?? row.recommended_end,
    status: row.status ?? "pending",
  };
}

/**
 * Get risk level from risk score
 * @param {number} score
 */
export function getRiskLevelFromScore(score) {
  if (score > 70) return "critical";
  if (score >= 50) return "high";
  if (score >= 30) return "medium";
  return "low";
}

/**
 * Compute health percent from RUL
 * @param {number} rul
 */
export function computeHealthPercent(rul) {
  if (rul == null) return 0;
  return Math.min(100, Math.max(0, Math.round((rul / 200) * 100)));
}

/**
 * Determine status from RUL
 * @param {number} rul
 */
export function getStatusFromRUL(rul) {
  if (rul == null) return "unknown";
  if (rul < 30) return "critical";
  if (rul <= 90) return "warning";
  return "healthy";
}

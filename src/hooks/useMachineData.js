import { useState, useEffect, useCallback } from "react";
import * as machineService from "@/api/machineService";

/**
 * Hook for machines list (paginated with search and status filter)
 * @param {{ limit?: number, initialOffset?: number, search?: string, status?: string, enabled?: boolean }} options
 */
export function useMachines({
  limit = 50,
  initialOffset = 0,
  search = "",
  status = "all",
  enabled = true,
} = {}) {
  const [data, setData] = useState({
    meta: { count: 0, limit, offset: 0 },
    data: [],
  });
  const [offset, setOffset] = useState(initialOffset);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);
      const result = await machineService.listMachines({
        limit,
        offset,
        search,
        status,
      });
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [limit, offset, search, status, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setOffset(0);
  }, [search, status]);

  const nextPage = () => {
    if (offset + limit < data.meta.count) {
      setOffset((prev) => prev + limit);
    }
  };

  const prevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  const goToPage = (page) => {
    setOffset(page * limit);
  };

  return {
    machines: data.data,
    totalCount: data.meta.count,
    currentPage: Math.floor(offset / limit),
    totalPages: Math.ceil(data.meta.count / limit) || 1,
    isLoading,
    error,
    refetch: fetchData,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage: offset + limit < data.meta.count,
    hasPrevPage: offset > 0,
  };
}

/**
 * Hook for single machine details
 * @param {string} unitId
 * @param {{ enabled?: boolean }} options
 */
export function useMachine(unitId, { enabled = true } = {}) {
  const [machine, setMachine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!unitId || !enabled) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await machineService.getMachine(unitId);
      setMachine(result);
    } catch (err) {
      setError(err);
      setMachine(null);
    } finally {
      setIsLoading(false);
    }
  }, [unitId, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { machine, isLoading, error, refetch: fetchData };
}

/**
 * Hook for machine sensor timeseries
 * @param {string} unitId
 * @param {{ start?: string, end?: string, interval?: 'raw'|'hourly'|'daily', limit?: number, enabled?: boolean, refetchInterval?: number }} options
 */
export function useMachineSensors(
  unitId,
  {
    start,
    end,
    interval = "hourly",
    limit = 500,
    enabled = true,
    refetchInterval = 0,
  } = {}
) {
  const [data, setData] = useState({ meta: {}, data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!unitId || !enabled) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await machineService.getMachineSensors(unitId, {
        start,
        end,
        interval,
        limit,
      });
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [unitId, start, end, interval, limit, enabled]);

  useEffect(() => {
    fetchData();
    if (refetchInterval > 0) {
      const timer = setInterval(fetchData, refetchInterval);
      return () => clearInterval(timer);
    }
  }, [fetchData, refetchInterval]);

  const sensorChartData = {
    vibrationData: data.data.map((point) => ({
      time: formatTime(point.timestamp),
      value: point.vibration ?? point.rotationalSpeedRpm,
      threshold: 2000, // RPM threshold
    })),
    temperatureData: data.data.map((point) => ({
      time: formatTime(point.timestamp),
      value: point.temperatureC,
      threshold: 85, // Celsius threshold
    })),
    currentData: data.data.map((point) => ({
      time: formatTime(point.timestamp),
      value: point.current ?? point.torqueNm,
      threshold: 50, // Nm threshold
    })),
  };

  return {
    meta: data.meta,
    sensors: data.data,
    sensorChartData,
    isLoading,
    error,
    refetch: fetchData,
    isEmpty: data.data.length === 0,
  };
}

/**
 * Format timestamp to time string for chart display
 * @param {string} isoTimestamp
 */
function formatTime(isoTimestamp) {
  if (!isoTimestamp) return "";
  const date = new Date(isoTimestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

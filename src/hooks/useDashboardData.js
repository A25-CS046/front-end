import { useState, useEffect, useCallback } from "react";
import * as dashboardService from "@/api/dashboardService";

/**
 * Hook for dashboard summary data
 * @param {{ window?: string, asOf?: string, refetchInterval?: number }} options
 */
export function useDashboardSummary({
  window = "24h",
  asOf,
  refetchInterval = 30000,
} = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const result = await dashboardService.getSummary({ window, asOf });
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [window, asOf]);

  useEffect(() => {
    fetchData();
    if (refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refetchInterval]);

  return { data, isLoading, error, refetch: fetchData };
}

/**
 * Hook for active tasks data
 * @param {{ refetchInterval?: number }} options
 */
export function useActiveTasks({ refetchInterval = 60000 } = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const result = await dashboardService.getActiveTasks();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    if (refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refetchInterval]);

  return { data, isLoading, error, refetch: fetchData };
}

/**
 * Hook for team members data
 * @param {{ refetchInterval?: number }} options
 */
export function useTeamMembers({ refetchInterval = 60000 } = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const result = await dashboardService.getTeamMembers();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    if (refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refetchInterval]);

  return { data, isLoading, error, refetch: fetchData };
}

/**
 * Hook for team performance chart data
 * @param {{ weeks?: number, refetchInterval?: number }} options
 */
export function useTeamPerformance({
  weeks = 4,
  refetchInterval = 60000,
} = {}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const result = await dashboardService.getTeamPerformance({ weeks });
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [weeks]);

  useEffect(() => {
    fetchData();
    if (refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refetchInterval]);

  return { data, isLoading, error, refetch: fetchData };
}

/**
 * Hook for risk predictions
 * @param {{ limit?: number, refetchInterval?: number }} options
 */
export function useRiskPredictions({
  limit = 4,
  refetchInterval = 60000,
} = {}) {
  const [predictions, setPredictions] = useState([]);
  const [summary, setSummary] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const result = await dashboardService.getRiskPredictions({ limit });
      setPredictions(result.predictions);
      setSummary(result.summary);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
    if (refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refetchInterval]);

  return { predictions, summary, isLoading, error, refetch: fetchData };
}

/**
 * Hook for machines list (paginated)
 * @param {{ asOf?: string, limit?: number, initialOffset?: number }} options
 */
export function useMachines({ asOf, limit = 10, initialOffset = 0 } = {}) {
  const [data, setData] = useState({ items: [], count: 0 });
  const [offset, setOffset] = useState(initialOffset);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await dashboardService.getMachines({
        asOf,
        limit,
        offset,
      });
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [asOf, limit, offset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nextPage = () => {
    if (offset + limit < data.count) {
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
    machines: data.items,
    totalCount: data.count,
    currentPage: Math.floor(offset / limit),
    totalPages: Math.ceil(data.count / limit),
    isLoading,
    error,
    refetch: fetchData,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage: offset + limit < data.count,
    hasPrevPage: offset > 0,
  };
}

/**
 * Hook for telemetry data
 * @param {{ start: string, end: string, unitId?: string, aggregate?: string, limit?: number }} params
 */
export function useTelemetry({
  start,
  end,
  unitId,
  aggregate = "raw",
  limit = 100,
} = {}) {
  const [data, setData] = useState({ meta: {}, data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!start || !end) return;

    try {
      setIsLoading(true);
      setError(null);
      const result = await dashboardService.getTelemetry({
        start,
        end,
        unitId,
        aggregate,
        limit,
      });
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [start, end, unitId, aggregate, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, isLoading, error, refetch: fetchData };
}

/**
 * Hook for machine timeseries
 * @param {string} unitId
 * @param {{ start: string, end: string, interval?: string, pollingInterval?: number }} options
 */
export function useMachineTimeseries(
  unitId,
  { start, end, interval = "1h", pollingInterval = 0 } = {}
) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!unitId || !start || !end) return;

    try {
      setError(null);
      const result = await dashboardService.getMachineTimeseries(unitId, {
        start,
        end,
        interval,
      });
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [unitId, start, end, interval]);

  useEffect(() => {
    fetchData();
    if (pollingInterval > 0) {
      const timer = setInterval(fetchData, pollingInterval);
      return () => clearInterval(timer);
    }
  }, [fetchData, pollingInterval]);

  return { series: data, isLoading, error, refetch: fetchData };
}

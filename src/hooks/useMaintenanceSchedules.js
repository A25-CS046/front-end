import { useState, useEffect, useCallback, useRef } from "react";
import * as scheduleService from "@/api/maintenanceScheduleService";

/**
 * Hook for maintenance schedule data with pagination and filtering
 * @param {{ initialPage?: number, initialLimit?: number, refetchInterval?: number }} options
 */
export function useMaintenanceSchedules({
  initialPage = 1,
  initialLimit = 10,
  refetchInterval = 0,
} = {}) {
  const [schedules, setSchedules] = useState([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use refs to avoid infinite loops
  const paginationRef = useRef(pagination);
  const filtersRef = useRef(filters);

  useEffect(() => {
    paginationRef.current = pagination;
  }, [pagination]);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // Fetch schedules
  const fetchSchedules = useCallback(async () => {
    const currentPagination = paginationRef.current;
    const currentFilters = filtersRef.current;

    try {
      setIsLoading(true);
      setError(null);
      const result = await scheduleService.getSchedules({
        page: currentPagination.page,
        limit: currentPagination.limit,
        status: currentFilters.status,
        search: currentFilters.search,
      });
      setSchedules(result.data || []);
      if (result.pagination) {
        setPagination((prev) => ({
          ...prev,
          total: result.pagination.total,
          totalPages: result.pagination.totalPages,
        }));
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on filter/page changes
  useEffect(() => {
    fetchSchedules();
  }, [
    pagination.page,
    pagination.limit,
    filters.status,
    filters.search,
    fetchSchedules,
  ]);

  // Interval refetch
  useEffect(() => {
    if (refetchInterval > 0) {
      const interval = setInterval(fetchSchedules, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [refetchInterval, fetchSchedules]);

  // Pagination controls
  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const nextPage = useCallback(() => {
    setPagination((prev) => {
      if (prev.page < prev.totalPages) {
        return { ...prev, page: prev.page + 1 };
      }
      return prev;
    });
  }, []);

  const prevPage = useCallback(() => {
    setPagination((prev) => {
      if (prev.page > 1) {
        return { ...prev, page: prev.page - 1 };
      }
      return prev;
    });
  }, []);

  // Filter controls
  const setStatusFilter = useCallback((status) => {
    setFilters((prev) => ({ ...prev, status }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const setSearch = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  return {
    // Data
    schedules,
    pagination,
    filters,
    isLoading,
    error,

    // Actions
    refetch: fetchSchedules,

    // Pagination
    setPage,
    nextPage,
    prevPage,
    hasNextPage: pagination.page < pagination.totalPages,
    hasPrevPage: pagination.page > 1,

    // Filters
    setStatusFilter,
    setSearch,
  };
}

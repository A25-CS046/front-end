import { useState, useEffect, useCallback, useRef } from "react";
import * as userService from "@/api/userService";

/**
 * Hook for user management with CRUD operations
 * @param {{ initialPage?: number, initialLimit?: number, refetchInterval?: number }} options
 */
export function useUsers({
  initialPage = 1,
  initialLimit = 10,
  refetchInterval = 0,
} = {}) {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use refs to avoid infinite loops in useCallback dependencies
  const paginationRef = useRef(pagination);
  const filtersRef = useRef(filters);

  // Keep refs in sync
  useEffect(() => {
    paginationRef.current = pagination;
  }, [pagination]);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // Fetch users - use refs instead of state in dependencies
  const fetchUsers = useCallback(async () => {
    const currentPagination = paginationRef.current;
    const currentFilters = filtersRef.current;

    try {
      setIsLoading(true);
      setError(null);
      const result = await userService.getUsers({
        page: currentPagination.page,
        limit: currentPagination.limit,
        search: currentFilters.search,
        role: currentFilters.role,
        status: currentFilters.status,
      });
      setUsers(result.data || []);
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
  }, []); // Empty dependencies - uses refs instead

  // Initial fetch and refetch on filter/page changes
  useEffect(() => {
    fetchUsers();
  }, [
    pagination.page,
    pagination.limit,
    filters.search,
    filters.role,
    filters.status,
    fetchUsers,
  ]);

  // Interval refetch (if enabled)
  useEffect(() => {
    if (refetchInterval > 0) {
      const interval = setInterval(fetchUsers, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [refetchInterval, fetchUsers]);

  // Pagination controls
  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const nextPage = () => {
    setPagination((prev) => {
      if (prev.page < prev.totalPages) {
        return { ...prev, page: prev.page + 1 };
      }
      return prev;
    });
  };

  const prevPage = () => {
    setPagination((prev) => {
      if (prev.page > 1) {
        return { ...prev, page: prev.page - 1 };
      }
      return prev;
    });
  };

  // Filter controls - wrapped in useCallback to prevent re-renders
  const setSearch = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to page 1
  }, []);

  const setRoleFilter = useCallback((role) => {
    setFilters((prev) => ({ ...prev, role }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const setStatusFilter = useCallback((status) => {
    setFilters((prev) => ({ ...prev, status }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  // CRUD operations
  const createUser = async (data) => {
    try {
      setIsLoading(true);
      await userService.createUser(data);
      await fetchUsers();
      return { success: true };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id, data) => {
    try {
      setIsLoading(true);
      await userService.updateUser(id, data);
      await fetchUsers();
      return { success: true };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setIsLoading(true);
      await userService.deleteUser(id);
      await fetchUsers();
      return { success: true };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Data
    users,
    pagination,
    filters,
    isLoading,
    error,

    // Actions
    refetch: fetchUsers,

    // Pagination
    setPage,
    nextPage,
    prevPage,
    hasNextPage: pagination.page < pagination.totalPages,
    hasPrevPage: pagination.page > 1,

    // Filters
    setSearch,
    setRoleFilter,
    setStatusFilter,

    // CRUD
    createUser,
    updateUser,
    deleteUser,
  };
}

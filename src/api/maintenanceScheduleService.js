import { http } from "./axiosClient";

/**
 * Maintenance Schedule API Service
 */

/**
 * Get maintenance schedules with pagination and filters
 * @param {{ page?: number, limit?: number, status?: string, search?: string }} params
 */
export async function getSchedules({
  page = 1,
  limit = 10,
  status = "",
  search = "",
} = {}) {
  const response = await http.get("/maintenance-schedules", {
    page,
    limit,
    status,
    search,
  });
  return response.data;
}

/**
 * Get schedule by ID
 * @param {number} id
 */
export async function getScheduleById(id) {
  const response = await http.get(`/maintenance-schedules/${id}`);
  return response.data;
}

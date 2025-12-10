import { http } from "./axiosClient";

/**
 * User Management API Service
 */

/**
 * Get users with pagination and filters
 * @param {{ page?: number, limit?: number, search?: string, role?: string, status?: string }} params
 */
export async function getUsers({
  page = 1,
  limit = 10,
  search = "",
  role = "",
  status = "",
} = {}) {
  const response = await http.get("/users/data", {
    page,
    limit,
    search,
    role,
    status,
  });
  return response.data;
}

/**
 * Get user by ID
 * @param {number} id
 */
export async function getUserById(id) {
  const response = await http.get(`/users/${id}`);
  return response.data;
}

/**
 * Create new user
 * @param {{ email: string, name: string, role: string, specialization?: string, phone?: string, password: string }} data
 */
export async function createUser(data) {
  const response = await http.post("/users", data);
  return response.data;
}

/**
 * Update user
 * @param {number} id
 * @param {{ email?: string, name?: string, role?: string, specialization?: string, phone?: string, status?: string }} data
 */
export async function updateUser(id, data) {
  const response = await http.put(`/users/${id}`, data);
  return response.data;
}

/**
 * Delete user (soft delete)
 * @param {number} id
 */
export async function deleteUser(id) {
  const response = await http.delete(`/users/${id}`);
  return response.data;
}

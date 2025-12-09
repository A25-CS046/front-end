import { http } from "./axiosClient";

/**
 * Authentication API Service
 */

/**
 * Log in a user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function login(email, password) {
  const { data } = await http.post("/users/login", { email, password });
  return data;
}

/**
 * Log out the current user
 * @returns {Promise<void>}
 */
export async function logout() {
  await http.post("/users/logout");
}

/**
 * Get the current user's profile
 * @returns {Promise<object>}
 */
export async function getProfile() {
  const { data } = await http.get("/users/profile");
  return data;
}

/**
 * Change the current user's password
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Promise<{ message: string }>}
 */
export async function changePassword(currentPassword, newPassword) {
  const { data } = await http.put("/users/change-password", {
    currentPassword,
    newPassword,
  });
  return data;
}

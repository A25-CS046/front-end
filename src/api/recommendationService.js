import { http } from "./axiosClient";

/**
 * Get AI Recommendations
 * @param {Object} filters
 * @returns {Promise<Array>}
 */
export async function getRecommendations(filters = {}) {
  const { data } = await http.get("/recommendations", filters);
  
  return data.map(rec => ({
    ...rec,
    createdAt: rec.createdAt ? new Date(rec.createdAt) : new Date(),
    recommendedStart: rec.recommendedStart ? new Date(rec.recommendedStart) : null,
    recommendedEnd: rec.recommendedEnd ? new Date(rec.recommendedEnd) : null,
  }));
}

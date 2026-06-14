import { mapAthleteFromApi } from "../model/types";

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function listFeaturedAthletes() {
  const response = await fetch(`${API_BASE}/api/athletes/featured`);

  const data = await response.json().catch(() => []);

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch featured athletes");
  }

  return data.map((dto) => mapAthleteFromApi(dto));
}

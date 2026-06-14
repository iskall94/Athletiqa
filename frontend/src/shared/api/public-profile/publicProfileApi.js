import { apiFetch } from "../base/apiClient";

export function getPublicAthleteProfile(publicProfileId) {
  return apiFetch(`/api/athletes/${publicProfileId}`);
}

export function getPublicAthletePosts(publicProfileId) {
  return apiFetch(`/api/athletes/${publicProfileId}/posts`);
}

export function getPublicAthleteCampaigns(publicProfileId) {
  return apiFetch(`/api/athletes/${publicProfileId}/campaigns`);
}

export function getPublicSponsorProfile(publicProfileId) {
  return apiFetch(`/api/sponsors/${publicProfileId}`);
}

export function getPublicSponsorDonations(publicProfileId) {
  return apiFetch(`/api/sponsors/${publicProfileId}/donations`);
}

export function getMySponsorDonations() {
  return apiFetch("/api/users/me/donations");
}

// Stub APIs — replace with real fetch calls once backend has follow/unfollow endpoints

export async function followAthlete(athleteId) {
  console.log("TODO: backend follow endpoint not built. Pretending to follow:", athleteId);
  return { athleteId, isFollowing: true };
}

export async function unfollowAthlete(athleteId) {
  console.log("TODO: backend unfollow endpoint not built. Pretending to unfollow:", athleteId);
  return { athleteId, isFollowing: false };
}
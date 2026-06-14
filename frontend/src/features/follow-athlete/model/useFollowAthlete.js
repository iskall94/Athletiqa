import { useState } from "react";
import { followAthlete, unfollowAthlete } from "../api/followAthleteApi";

// Handles the follow / unfollow API call + tracks loading + error state.
// Returns a single `handleToggleFollow(athleteId, isFollowing)` that picks
// the right endpoint based on the current state.
export function useFollowAthlete() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggleFollow = async (athleteId, isFollowing) => {
    setIsLoading(true);
    setError(null);
    try {
      if (isFollowing) {
        return await unfollowAthlete(athleteId);
      } else {
        return await followAthlete(athleteId);
      }
    } catch (err) {
      setError(err);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleToggleFollow, isLoading, error };
}

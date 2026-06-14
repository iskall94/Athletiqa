import { useState } from "react";
import { likePost, unlikePost } from "../api/likePostApi";

// Handles like/unlike logic for posts and tracks loading/error state.
function useLikePost() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLike = async (postId, isLiked) => {
    setIsLoading(true);
    setError(null);
    try {
      if (isLiked) {
        return await unlikePost(postId);
      } else {
        return await likePost(postId);
      }
    } catch (err) {
      setError(err);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleToggleLike,
    isLoading,
    error,
  };
}

export default useLikePost;

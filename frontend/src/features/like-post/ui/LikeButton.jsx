import { Button } from "../../../shared/ui/button";
// Button for toggling a like on a specific post.
// It calls the provided onToggleLike handler and updates its label based on isLiked.
function LikeButton({ postId, likesCount, isLiked, onToggleLike, isLoading }) {
  return (
    <div>
      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike(postId, isLiked);
        }}
        disabled={isLoading}
      >
        {isLiked ? "❤️ Liked" : "🤍 Like"}
        {likesCount}
      </Button>
    </div>
  );
}

export default LikeButton;

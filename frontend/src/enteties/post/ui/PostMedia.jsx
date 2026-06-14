export function PostMedia({ imageUrl }) {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="post-media">
      <img src={imageUrl} alt="Post media" className="post-media__image" />
    </div>
  );
}

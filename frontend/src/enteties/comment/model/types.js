export function mapCommentFromApi(dto) {
  return {
    id: dto.id,
    authorName: dto.authorName,
    authorAvatar: dto.authorAvatar,
    authorFallback: dto.authorFallback,
    content: dto.content,
    createdAt: new Date(dto.createdAt).toLocaleString('sv-SE'),
  };
}

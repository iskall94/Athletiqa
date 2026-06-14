export const mockPosts = [
  {
    postId: 1,
    athleteId: "u1",
    authorName: "Adison Vetrovs",
    authorAvatar: "https://placehold.co/40x40?text=Adison",
    title: "Ny trofé",
    content:
      "Idag tog jag hem en pokal i min tennis tävling, det känns fortfarande overkligt. Varje timme på träningen, varje match ledde till det här.",
    sport: "Tennis",
    mediaContents: [
      { mediaContentId: 1, mediaUrl: "https://placehold.co/600x600?text=Trophy+1", mediaType: "Image" },
      { mediaContentId: 2, mediaUrl: "https://placehold.co/600x600?text=Trophy+2", mediaType: "Image" },
      { mediaContentId: 3, mediaUrl: "https://placehold.co/600x600?text=Trophy+3", mediaType: "Image" },
    ],
    likes: 21,
    isLiked: false,
    commentsCount: 3,
    createdAt: "2024-02-01T12:00:00Z",
  },
  // duplicate this object 3-6 more times with different ids/titles
];
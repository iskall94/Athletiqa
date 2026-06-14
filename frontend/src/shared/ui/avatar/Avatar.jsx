import {
  DefaultAvatarAnonym,
  DefaultAvatarCompany,
  DefaultAvatarMan,
  DefaultAvatarOther,
  DefaultAvatarWoman,
} from "../../assets";

/*
    Circle avatar, renders an <img> when src is given,
    or a placeholder circle when it isn't. Size
    presets match the dimensions already used across
    app
*/
const SIZES = {
  xs: "w-6 h-6",
  s: "w-9 h-9",
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-28 h-28",
  xl: "w-44 h-44",
};

// Falls back to a specified default avatar if the user has no avatar
function getDefaultAvatar(fallback) {
  const normalizedFallback = String(fallback ?? "anonym").toLowerCase();

  if (
    normalizedFallback === "1" ||
    normalizedFallback === "male" ||
    normalizedFallback === "man"
  ) {
    return DefaultAvatarMan;
  }

  if (
    normalizedFallback === "2" ||
    normalizedFallback === "female" ||
    normalizedFallback === "woman"
  ) {
    return DefaultAvatarWoman;
  }

  if (normalizedFallback === "3" || normalizedFallback === "other") {
    return DefaultAvatarOther;
  }

  if (normalizedFallback === "company" || normalizedFallback === "sponsor") {
    return DefaultAvatarCompany;
  }

  return DefaultAvatarAnonym;
}

function Avatar({
  src,
  alt = "",
  size = "md",
  className = "",
  fallback = "anonym",
}) {
  const base = `${SIZES[size]} rounded-full flex-shrink-0`;
  const avatarSrc = src || getDefaultAvatar(fallback);

  return (
    <img
      src={avatarSrc}
      alt={alt}
      className={`${base} object-cover ${className}`}
    />
  );
}

export default Avatar;

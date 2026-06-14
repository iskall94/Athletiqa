export function formatRelativeTime(dateInput) {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  const now = new Date();
  const diffMs = now - date;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} år sedan`;
  if (months > 0) return `${months} ${months === 1 ? "månad" : "månader"} sedan`;
  if (days > 0) return `${days} ${days === 1 ? "dag" : "dagar"} sedan`;
  if (hours > 0) return `${hours} ${hours === 1 ? "timme" : "timmar"} sedan`;
  if (minutes > 0) return `${minutes} ${minutes === 1 ? "minut" : "minuter"} sedan`;
  return "Just nu";
}
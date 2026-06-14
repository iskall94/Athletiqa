import { MedalsSteps, LockedMedal } from "../config/medalsSteps";

export default function MedalBadge({
  medal,
  locked = false,
  size = "h-16 w-16",
}) {
  if (!medal) {
    return null;
  }

  return (
    <img
      src={medal.icon}
      alt={medal.label}
      className={[size, `object-contain`, locked ? "opacity-100 " : ""].join(
        " ",
      )}
    />
  );
}

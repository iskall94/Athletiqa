import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../shared/ui/avatar";
import { Button } from "../../../shared/ui/button";

export function AthleteCard({ athlete }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/athlete-profile/${athlete.publicProfileId}`);
  };

  const hasPhoto = Boolean(athlete.photoUrl);

  return (
    <article className="flex-shrink-0 w-[17.5rem] h-[23rem] rounded-xl overflow-hidden">
      <Button
        variant="none"
        onClick={handleNavigate}
        className="relative w-full h-full !p-0 !rounded-xl overflow-hidden text-left group"
      >
        <div className="absolute inset-0 bg-primary-light overflow-hidden">
          <Avatar
            src={athlete.photoUrl}
            alt={athlete.name}
            fallback={athlete.gender}
            className={
              hasPhoto
                ? "!w-full !h-full !rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                : "!w-[135%] !h-[135%] !max-w-none !rounded-none object-cover -translate-x-[12%] -translate-y-[10%] transition-transform duration-300 group-hover:scale-110"
            }
          />
        </div>

        <div className="absolute left-6 right-6 bottom-5 rounded-lg bg-surface px-4 py-3 text-center shadow-sm">
          <p className="text-xl font-bold text-primary leading-6">
            {athlete.name}
          </p>
          <p className="mt-2 text-base text-primary leading-5">
            {athlete.sport}
          </p>
        </div>
      </Button>
    </article>
  );
}

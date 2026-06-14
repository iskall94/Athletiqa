import Button from "../button/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";

export default function ArrowButton({
  direction,
  id,
  activeButton,
  setActiveButton,
  onClick
}) {
  const isActive = activeButton === id;

  return (
    <Button
      variant="none"
      type="button"
      size="icon"
      aria-label={direction === "left" ? "Previous" : "Next"}
      onClick={() => {setActiveButton(id); onClick();}}
      className={`w-14 h-14 shrink-0 !rounded-full border-1 text-primary
                         inline-flex items-center 
                         justify-center text-5xl leading-none  
                         transition-colors duration-500 ease-in-out             
                         ${isActive ? "bg-primary text-surface border-transparent" : "bg-transparent text-primary border-primary hover:text-primary hover:bg-primary-light hover:border-transparent"}
                         `}
    >
      {direction === "left" ? (
        <ArrowLeftIcon className="w-6 h-6" />
      ) : (
        <ArrowRightIcon className="w-6 h-6" />
      )}
    </Button>
  );
}

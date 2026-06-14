import { XIcon } from "../../assets";
import { Button } from "../button";

function Modal({ isOpen, onClose, children, className = "" }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`bg-surface rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="none"
          size="icon"
          onClick={onClose}
          aria-label="Stäng"
          className="absolute top-2 right-2 text-2xl text-gray-500 w-8 h-8 flex items-center justify-center hover:text-primary"
        >
          <XIcon className="w-full h-full" />
        </Button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

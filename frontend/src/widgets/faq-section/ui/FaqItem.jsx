import {PlusIcon} from "../../../shared/assets";
import {MinusIcon} from "../../../shared/assets";
import { useState } from "react";
import { Button } from "../../../shared/ui/button";
import { useTranslation } from "react-i18next";

export default function FaqItem({ question, answer, questionKey, answerKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="relative inline-block w-full z-10 mb-[1.5rem]">
      <Button
        variant="none"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-8 py-4 w-full bg-bg rounded-xl border-1
        inline-flex justify-between items-center gap-3 overflow-hidden transition-colors ${isOpen ? "!bg-accent border-transparent" : "border-gray-300 hover:border-accent"}`}
      >
        <p className="text-xl text-left text-gray-700 font-normal  leading-7">
          {questionKey ? t(questionKey, question) : question}
        </p>
        <span className="relative shrink-0 inline-flex items-center justify-center ">
           <PlusIcon className={`absolute w-6 h-6 transition-opacity duration-700 ease-out ${isOpen? "opacity-0": "opacity-100"}`}/>
            <MinusIcon className={`absolute w-6 h-6 transition-opacity duration-700 ease-out ${isOpen? "opacity-100": "opacity-0"}`}/>
        </span>
      </Button>
      {isOpen && (
        <div className="py-4 px-3 mt-2 w-full bg-bg border border-gray-300 rounded-xl ">
          <p className="text-gray-700 text-base leading-6">
            {answerKey ? t(answerKey, answer) : answer}
          </p>
        </div>
      )}
    </div>
  );
}

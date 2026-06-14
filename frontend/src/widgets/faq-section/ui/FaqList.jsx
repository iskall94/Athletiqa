import { faqData } from "../model/faqData";
import FaqItem from "./FaqItem";


export default function FaqList({  items=[],className = "", itemsProps={} }) {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      {items.map((item) => (
        <FaqItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          questionKey={item.questionKey}
          answerKey={item.answerKey}
          {...itemsProps}
        />
      ))}
    </div>
  );
}


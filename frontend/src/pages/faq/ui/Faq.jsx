import { useState } from "react";
import { DeocorativeBlob } from "../../../shared/assets";
import { pageContainer } from "../../../shared/config/layout";
import { faqData, FaqList, FaqSection } from "../../../widgets/faq-section";
import FaqTabs from "../../../widgets/faq-section/ui/FaqTabs";
import { useTranslation } from "react-i18next";


export default function Faq() {
  const [activeCategory, setActiveCategory]=useState(faqData[0].id)
  const { t } = useTranslation();

  const activeGroup=faqData.find((group) =>group.id===activeCategory);
  return (
    <main className="w-full relative overflow-hidden bg-bg min-h-screen">
      <div
        aria-hidden="true"
        style={{
          backgroundImage: `url("${DeocorativeBlob}")`,
        }}
        className=" absolute inset-x-0 top-0 h-[100rem] pointer-events-none z-0 bg-no-repeat
          bg-[length:180rem_auto] bg-[position:center_-8rem]
          md:bg-[length:100%_auto] md:bg-[position:center_-5rem]"
      />
      <div className="mt-[11rem] md:mt-[9rem] mx-auto w-full max-w-[50rem] px-5 md:px-0 py-7">
        <h1 className="text-primary text-3xl md:text-[2rem] font-bold leading-9 md:leading-10 max-w-[28rem]">
          {t("Vad vill du ha mer information om?")}
            </h1>    

      </div>
        
        <FaqTabs  categories={faqData} activeCategory={activeCategory} onCategoryChange={setActiveCategory}/>

      <section className="relative z-10 pt-[6rem] pb-[8.5rem] flex justify-center items-center ">
        <div className="mx-auto flex w-full max-w-[50rem] flex-col items-center">
          <FaqList key={activeCategory} items={activeGroup?.items ?? []} className="w-full" />
        </div>
      </section>
    </main>
  );
}

import { Button } from "../../../shared/ui/button";

export default function FaqTabs({
  categories = [],
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flflex flex-nowrap gap-4 overflow-x-auto pb-2 px-5 md:px-0">
      <div className="mx-auto  flex  justify-start items-center max-w-[50rem] flex-wrap justify-center gap-5">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <Button
              variant="none"
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`rounded-xl border px-5 py-3  text-base font-medium leading-6 text-primary transition-colors ${
                isActive
                  ? "border-accent bg-accent text-primary"
                  : "border-gray-300 text-gray-700 bg-bg  hover:border-primary"
              }`}
            >
              {category.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

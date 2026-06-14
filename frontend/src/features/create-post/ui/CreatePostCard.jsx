import { PlusIcon } from "../../../shared/assets";
import { Button } from "../../../shared/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function CreatePostCard() {
  const { t } = useTranslation();
  return (
    <Link to="/create-post"
      className="!rounded-xl w-full flex flex-col items-center justify-center gap-4 min-h-[25rem] border border-dashed"
    >
      <span className="w-14 h-14 flex items-center justify-center border-2 border-gray-700 rounded-md text-3xl text-gray-700">
        <PlusIcon className="w-6 h-6" />
      </span>
      <span className="text-xl text-gray-700">{t("Skapa ett nytt inlägg")}</span>
    </Link>
  );
}
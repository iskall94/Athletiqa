import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Header from "../../../widgets/header/ui/Header";
import { Button } from "../../../shared/ui/button";
import Footer from "../../../widgets/footer/ui/Footer";
import { useTranslation } from "react-i18next";


// Hard-coded list of sports for selection.
const SPORTS = [
  "Fotboll",
  "Innebandy",
  "Ishockey",
  "Ridsport",
  "Gymnastik",
  "Handball",
  "Friidrott",
  "Simning",
  "Basket",
  "Volleyball",
  "Längdskidåkning",
  "Alpint (Skidor)",
  "Bordtennis",
  "Badminton",
  "Bandy",
  "Dans",
  "Tennis",
  "Konstsimn",
];



export default function SportsSelectionPage() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Loops through the selected array and keeps only the sports whose conditions are true,
  // and unpacks all existing items from the selected array into a new array
  const toggleSport = (sport) => {
    if (selected.includes(sport)) {
      setSelected(selected.filter((s) => s !== sport));
    } else if (selected.length < 5) {
      setSelected([...selected, sport]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="bg-surface rounded-2xl shadow-md p-10 w-full max-w-[31.25rem]">
          <h1 className="text-2xl font-bold text-primary text-center mb-3">
            {t("Välj dina sporter")}
          </h1>

          <p className="text-sm text-gray-500 text-center mb-8">
            {t("Välj upp till 5 sporter som intresserar dig - du kan när som helst uppdatera dina val i inställningarna.")}
          </p>

          {/* Maps all the sports into clickable buttons, and fills the clicked ones with a different color */}
          <div className="flex flex-wrap gap-3">
            {SPORTS.map((sport) => (
              <Button
                key={sport}
                variant={selected.includes(sport) ? "accent" : "outline"}
                onClick={() => toggleSport(sport)}
              >
                {sport}
              </Button>
            ))}
          </div>

          {/* Currently navigates to the home page */}
          <Button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-lg bg-primary text-surface font-semibold cursor-pointer mb-4 mt-6"
          >
            {t("Klart")}
          </Button>

          <Button
            variant="none"
            className="w-full text-sm text-gray-500 cursor-pointer hover:underline"
          >
            {t("Gör det senare")}
          </Button>
        </div>
      </main>

    </div>
  );
}

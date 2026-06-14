import AthelteInfoPicture from "../../../shared/assets/athleteInfo-picture.svg?url";
import SponsorInfoPicture from "../../../shared/assets/sponsorInfo-picture.svg?url";
import YellowBackGround from "../../../shared/assets/infoHighlight-background-yellow.svg?url";
import BlueBackGround from "../../../shared/assets/infoHighlight-background-blue.svg?url";
export const infoHighlightData = {
  ahtlete: {
    title: "För vårdnadshavare",
    description:
      "Är ditt barn under 18 år och vill starta en insamling? För oss är det viktigt att hela familjen känner sig bekväm med hur Athletiqa fungerar. Läs mer om vilken roll du som vårdnadshavare har, hur vi skyddar unga användare och vad som gäller rent praktiskt när ni skapar ett konto.",
    image: AthelteInfoPicture,
    imageAlt: "Vårdnashavare bild",
    linkTo: "/",
    backroundText: '"Din dröm, vårt gemensamma mål."',
    textVariant: "text-primry",
    backgroundImage:YellowBackGround
  },
  sponsor: {
    title: "Athletiqas vision",
    description:
      "Vår vision är en framtid där ingen ung talang tvingas sluta idrotta på grund av ekonomiska hinder. Vi vet att sportens gemenskap bygger karaktär och håller unga på rätt spår i livet. Genom att koppla samman atleter med engagerade sponsorer vill vi se till att fler får chansen att stanna i en positiv miljö och nå sin fulla potential.",
    image: SponsorInfoPicture,
    imageAlt: "Athletiqa bild",
    linkTo: "/",
    backgroundText: '"Tillsammans bygger vi framtidens idrott."',
    textVariant: "text-accent",
    backgroundImage:BlueBackGround
  }
};

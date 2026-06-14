//Sponsor guest background image
import firstStepSponsor from "../../../shared/assets/stepOne-sponsor.svg?url";
import secondStepSponsor from "../../../shared/assets/stepTwo-sponsor.svg?url";
import thirdStepSponsor from "../../../shared/assets/stepThree-sponsor.svg?url";
//Athlete auth background image
import firstStepAthleteAuth from "../../../shared/assets/stepOneAuth-athlete.svg?url";
import secondStepAthleteAuth from "../../../shared/assets/stepTwoAuth-athlete.svg?url";
import thirdStepAthleteAuth  from "../../../shared/assets/stepThreeAuth-athlete.svg?url";
//Athlete guest background image
import firstStepAthlete from "../../../shared/assets/stepOne-athlete.svg?url";
import secondStepAthlete from "../../../shared/assets/stepTwo-athlete.svg?url";
import thirdStepAthlete from "../../../shared/assets/stepThree-athlete.svg?url";

const sponsor = {
  guest: [{
        id: "firstStepGuest-sponsor",
        title: "Gör skillnad direkt - med eller utan konto",
        description:
          "Hos oss väljer du själv hur du vill bidra. Du kan snabbt och enkelt donera utan att registrera dig.Skapar du eller ditt företag istället ett konto får ni en egen profil där ni kan samla medaljer för era insatser, visa upp ert stöd offentligt och följa atleternas resor på nära håll.",
        image: firstStepSponsor,
        imageAlt: "Sponsorer och företag",
        imagePosition: "right",
        buttons: [
          {
            id:"sponsorGuuesstCreate",
            text: "Skapa konto",
            to: "/register",
            variant: "primary"
          },
          {
            id:"sponsorGuestDonate",
            text: "Donera",
            to: "/explore",
            variant: "accent"
          },
        ],
      },
      {
        id: "secondStepGuest-sponsor",
        title: "Heja på atleterna",
        description:
          "Att stötta unga idrottare handlar om mer än bara ekonomiska bidrag – uppmuntran är minst lika viktigt!  Om du skapar ett konto får du möjlighet att chatta direkt med de atleter du har hjälpt. Ett lycka till inför nästa match eller träningsläger kan göra mer än du tror.",
        image:secondStepSponsor,
        imageAlt: "Sponsorer kan heja på atleterna",
        imagePosition: "left",
        buttons: [],
      },
      {
        id: "thirdStepGuest-sponsor",
        title: "Få medaljer för ditt stöd",
        description:
          "Gör en insats och bli belönad! När du eller ditt företag stöttar flera atleter, eller når upp till en viss donationssumma, tilldelas ni  medaljer på plattformen.Dessa kan ni sedan enkelt dela vidare på sociala medier för att stolt visa upp ert stöd för nästa generations idrottsstjärnor.",
        image: thirdStepSponsor,
        imageAlt: "Sponsor medaljer",
        imagePosition: "right",
        buttons:  [],
      },],

  auth: [{
        id: "firstStepAuth-sponsor",
        title: "Hitta nästa dröm att stötta",
        description:
          "Välkommen in! Nu är du redo att börja hjälpa. Klicka på Donera för att upptäcka drivna atleter som behöver ert stöd, eller gå till Min profil för att få en överblick över era tidigare bidrag, samlade milstolpar och konversationer.",
        image: firstStepSponsor,
        imageAlt: "Sponsorer kan stötta",
        imagePosition: "right",
        buttons: [
          {
            id:"sponsorAuthProfile",
            text: "Gå till min profil",
            to: "/sponsor-profile",
            variant: "primary",
          },
          {
            id:"sponsorAuthDonate",
            text: "Donera",
            to: "/explore",
            variant: "accent"
          },
        ],
      },
      {
        id: "secondStepAuth-sponsor",
        title: "Skicka lite pepp!",
        description:
          "Nu när du är inloggad har du direktkontakt med de atleter du stöttar. Gå in i chatten och skicka ett lycka till inför nästa match eller fråga hur det går med träningen. Ditt personliga engagemang och några peppande ord betyder minst lika mycket som det ekonomiska bidraget.",
        image:secondStepSponsor,
        imageAlt: "Sponsorer kan kontakta atleter",
        imagePosition: "left",
        buttons:  [],
      },
      {
        id: "thirdStepAuth-sponsor",
        title: "Se och dela dina framsteg",
        description:
          "Varje bidrag räknas och tar er närmare nästa utmärkelse! Under din profil kan du enkelt följa vilka medaljer ni har fått genom era donationer. Klicka dig in för att se era prestationer och dela dem stolt på sociala medier för att inspirera fler att göra skillnad.",
        image: thirdStepSponsor,
        imageAlt: "Sponsor kan se sina framsteg",
        imagePosition: "right",
        buttons:  [],
      },]
};

const athlete = {
  guest: [
      {
        id: "firstStepGuest-athlete",
        title: "Skapa konto",
        description:
          "Börja din resa med att skapa ett konto och bygga din profil på Athletiqa. Berätta din historia! Beskriv dina drömmar, din nuvarande situation och varför ett ekonomiskt bidrag skulle göra skillnad för just dig. Ju mer du delar med dig av din passion för sporten, desto lättare blir det för sponsorer att vilja stötta din utveckling.",
        image: firstStepAthlete,
        imageAlt: "Skapa ett konto",
        imagePosition: "right",
        buttons: [
          {
            id:"sponsorGuestAtheleteCreate",
            text: "Skapa konto",
            to: "/register",
            variant: "primary"
          },
        ],
      },
      {
        id: "secondStepGuest-athlete",
        title: "Starta din insamling",
        description:
          "När profilen är på plats är det dags att dra igång din första insamling! Berätta exakt vad du behöver stöd för – vare sig det är en cupresa, nya löparskor eller terminsavgiften. Sätt ett tydligt ekonomiskt mål och beskriv hur insamlingen kommer att hjälpa dig framåt i din satsning.",
        image: secondStepAthlete,
        imageAlt: "Starta din insamling",
        imagePosition: "left",
        buttons:  [],
      },
      {
        id: "thirdStepGuest-athlete",
        title: " Sprid din insamling",
        description:
          "Din insamling är öppen och synlig för alla besökare på Athletiqa, även för de utan konto. Men för att nå ditt mål snabbare är det smart att ta hjälp av ditt nätverk! Dela din profil på sociala medier och be familj, vänner och klubbkamrater att sprida den vidare. Ju fler som ser din satsning, desto större är chansen att du når hela vägen fram.",
        image: thirdStepAthlete,
        imageAlt: "Sprid din insamling",
        imagePosition: "right",
        buttons:  [],
      }
    ],

  auth: [{
        id: "firstStepAuth-athlete",
        title: "Skapa insamlingar",
        description:
          "Behöver du nya fotbollsskor, hjälp med avgiften till nästa cup eller ett bidrag till träningslägret? Genom att skapa en insamling kan du berätta om dina drömmar och få exakt det ekonomiska stöd du behöver för att fortsätta utvecklas inom din sport.",
        image:firstStepAthleteAuth ,
        imageAlt: "Skapa insamlingar",
        imagePosition: "right",
        buttons: [
          {
            id:"sponsorAuthAtheleteCreate",
            text: "Skapa insamling",
            to: "/create-post",
            variant: "primary"
          },
        ],
      },
      {
        id: "secondStepAuth-athlete",
        title: "Skapa inlägg",
        description:
          "Dela med dig av din resa! Genom att skapa inlägg kan du visa dina sponsorer hur det går för dig. Lägg upp en bild från senaste matchen, berätta om hur träningen går eller passa på att tacka för stödet. En aktiv profil där du bjuder på dig själv skapar större engagemang och visar att bidragen gör verklig nytta.",
        image: secondStepAthleteAuth ,
        imageAlt: "Starta din insamling",
        imagePosition: "left",
        buttons: [
          {
            id:"sponsorAuthAtheleteCreatePost",
            text: "Skapa inlägg",
            to: "/create-post",
            variant:"primary"
          },
        ],
      },
      {
        id: "thirdStepAuth-athlete",
        title: "Chatta med kompisar och sponsorer",
        description:
          "Kommunikation är en viktig del av din satsning. Använd chatten för att bygga starka band med dina supportrar. Vare sig det handlar om att få lyckönskningar från kompisar eller att visa uppskattning till en ny sponsor, gör funktionen det enkelt att hålla en personlig och nära kontakt med alla som hejar på dig.",
        image: thirdStepAthleteAuth ,
        imageAlt: "Chatta med kompisar",
        imagePosition: "right",
        buttons:  [],
      }]
}

export const howItWorksData = {

  athlete,
  sponsor,

  Athlete: athlete,
  SponsorUser: sponsor,
  SponsorCompanyUser: sponsor

};

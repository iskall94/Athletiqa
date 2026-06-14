import { FirstVideoAbout, SecondVideoAbout } from "../../../shared/assets";
import videoUnion from "../../../shared/assets/video-union.svg?url";
import videoUnionLeft from "../../../shared/assets/videoUnion-left.svg?url";


export const aboutInfoData = {
  hero: {
    title: "Om Athletiqa",
    description:
      "Vi är Athletiqa – en plattform med målet att hålla drömmar vid liv och unga kvar i idrotten. Ofta är det ekonomin som sätter stopp för unga atleters utveckling, vilket kan leda till att de lämnar sportens trygga gemenskap. Här kan du som sportintresserad gå in och direkt stötta en ung talang med de resurser de behöver för att fortsätta träna och tävla. Tillsammans bygger vi en framtid där talang och vilja avgör, inte plånboken.",
    video: {
      src: FirstVideoAbout,
      title: "Tre barn",
      maskImage: videoUnionLeft,
    },
  },
  problem: {
    title: "Idrott förändrar liv, men ekonomin sätter ofta stopp",
    description:
      "Idrott är en fantastisk frizon för unga. Den bygger karaktär, skapar livslång gemenskap och är en av de absolut starkaste skyddsfaktorerna för att hålla unga borta från dåliga umgängen. Men i takt med att träningsavgifter, cupresor och sportutrustning blir allt dyrare, tvingas många unga talanger att ge upp sin passion. Vi tyckte inte att det var rättvist att plånboken skulle avgöra vem som får fortsätta jaga sin dröm.",
  },
  solution: {
    title: "Vår lösning",
    description: [
      "Därför skapade vi Athletiqa.",
      "Vi ville bygga en trygg mötesplats där unga, drivna atleter kan kopplas samman med privatpersoner och företag som vill göra verklig skillnad.",
      "På Athletiqa gör vi det enkelt för idrottare att berätta sin historia och samla in de medel de behöver för att ta nästa steg.",
      "Samtidigt gör vi det otroligt smidigt för sportintresserade eldsjälar och företag att kliva in som sponsorer, följa atleternas resor på nära håll och bidra med både ekonomiskt stöd och livsviktig pepp.",
    ],
    video: {
      src: SecondVideoAbout,
      title: "Ett barn",
      maskImage: videoUnion,
    },
  },
};

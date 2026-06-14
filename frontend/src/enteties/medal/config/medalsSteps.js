import FiftyTimes from "../assets/fiftyTimes-medal.svg?url";
import FirstTime from "../assets/firstTime-medal.svg?url";
import FiveTimes from "../assets/fiveTimes-medal.svg?url";
import HundredTimes from "../assets/hundredTimes-medal.svg?url";
import NoName from "../assets/noName-medal.svg?url";
import TenTimes from "../assets/tenTimes-medal.svg?url";
import TwentyTimes from "../assets/twentyTimes-medal.svg?url";

export const MedalsSteps = [
  {
    id: "first-donation",
    label: "Debutinsats",
    description: "Första donationen - början på din resa som supporter.",
    target: 1,
    icon: FirstTime,
  },
  {
    id: "five-donations",
    label: "Stödspelare",
    description: "5 donationer - du visar att du verkligen bryr dig om communityn.",
    target: 5,
    icon: FiveTimes,
  },
  {
    id: "ten-donations",
    label: "Lagsponsor",
    description: "10 donationer - en stabil kraft som hjälper laget framåt.",
    target: 10,
    icon: TenTimes,
  },
  {
    id: "twenty-donations",
    label: "Stödets kapten",
    description: "20 donationer - en ledare som inspirerar andra att bidra.",
    target: 20,
    icon: TwentyTimes,
  },
  {
    id: "fifty-donations",
    label: "Sponsringsmästare",
    description: "50 donationer - en av de mest dedikerade stöttepelarna.",
    target: 50,
    icon: FiftyTimes,
  },
  {
    id: "hundred-donations",
    label: "Klubbens legend",
    description: "100 donationer - en ikon vars stöd formar hela communityt.",
    target: 100,
    icon: HundredTimes,
  },
];

export const LockedMedal = 
  {
    id: "locked-medal",
    label: "Locked medal",
    target:0,
    icon: NoName,
  };


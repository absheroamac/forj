export interface ScheduleCard {
  id: string;
  number: string;
  day: string;
  name: string;
  subtitle: string;
  description: string;
}

export const WEEKLY_SCHEDULE: ScheduleCard[] = [
  {
    id: "mon",
    number: "01",
    day: "MONDAY",
    name: "STRONG",
    subtitle: "Full-body strength",
    description: "Heavy compound lifts off the bar. The week's foundation, laid first.",
  },
  {
    id: "tue",
    number: "02",
    day: "TUESDAY",
    name: "ENGINE",
    subtitle: "Conditioning",
    description: "Runs, carries, intervals and bodyweight circuits that build an engine. No machines required — you are the machine.",
  },
  {
    id: "wed",
    number: "03",
    day: "WEDNESDAY",
    name: "LEGS",
    subtitle: "Lower body",
    description: "Squats, hinges and single-leg strength. The original measures of strong.",
  },
  {
    id: "thu",
    number: "04",
    day: "THURSDAY",
    name: "HYBRID",
    subtitle: "Strength + conditioning",
    description: "Lifts paired with timed efforts. The day that tests what the week built.",
  },
  {
    id: "fri",
    number: "05",
    day: "FRIDAY",
    name: "UPPER",
    subtitle: "Upper body",
    description: "Press, pull, hold — upper-body strength with the core working underneath all of it.",
  },
  {
    id: "sat-sun",
    number: "06",
    day: "SATURDAY & SUNDAY",
    name: "SWEAT",
    subtitle: "Weekend crew sessions",
    description: "Bigger, louder, together. Partner and team formats — and the one session you can bring a friend to.",
  },
];

export const TICKER_ITEMS = [
  "FORJ Strong",
  "FORJ Engine",
  "FORJ Legs",
  "FORJ Hybrid",
  "FORJ Upper",
  "FORJ Sweat",
  "Capped at eight",
];

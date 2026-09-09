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
    description: "Heavy compound lifts and progressive barbell overload.",
  },
  {
    id: "tue",
    number: "02",
    day: "TUESDAY",
    name: "ENGINE",
    subtitle: "Aerobic capacity",
    description: "Sustained conditioning on ergs and skillmills.",
  },
  {
    id: "wed",
    number: "03",
    day: "WEDNESDAY",
    name: "LEGS",
    subtitle: "Lower body",
    description: "Squats, hinges, and unilateral strength building.",
  },
  {
    id: "thu",
    number: "04",
    day: "THURSDAY",
    name: "HYBRID",
    subtitle: "Strength + conditioning",
    description: "High-output combinations testing work capacity.",
  },
  {
    id: "fri",
    number: "05",
    day: "FRIDAY",
    name: "UPPER",
    subtitle: "Upper body",
    description: "Presses, pulls, and core stability under load.",
  },
  {
    id: "sat-sun",
    number: "06",
    day: "SATURDAY & SUNDAY",
    name: "SWEAT",
    subtitle: "Weekend partner sweat",
    description: "High-energy team conditioning sessions with a community focus.",
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

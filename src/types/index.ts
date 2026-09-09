export interface ScheduleDay {
  day: string;
  dateNumber: string;
  name: string;
  subtitle: string;
  spots: string;
  isWeekend?: boolean;
  accent?: boolean;
}

export interface PillarItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface PerkItem {
  number: string;
  text: string;
  muted?: boolean;
}

export interface ImageSlotData {
  id: string;
  src: string;
  alt: string;
  credit: string;
  creditHref: string;
  placeholder?: string;
  caption?: string;
}

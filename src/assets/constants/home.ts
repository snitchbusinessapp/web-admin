import {
  CompassToolIcon,
  EyeIcon,
  HeartIcon,
  PhoneCallIcon,
} from "@phosphor-icons/react";

export const DASHBOARD_SECTIONS = [
  { label: "Overview", id: "overview" },
  { label: "Profile Analytics", id: "profile_analytics" },
  { label: "Workshops Analytics", id: "workshops_analytics" },
];
export const DATE_RANGES = [
  { label: "Last 7 days", id: "Last_7_days" },
  { label: "Last 30 days", id: "Last_30_days" },
  { label: "Last 90 days", id: "Last_90_days" },
  { label: "This year", id: "This_year" },
];

const CHART_VALUES = [
  2300, 1050, 600, 1000, 1950, 650, 2350, 900, 2600, 1650, 850, 1650, 1000,
  3100, 1850, 950, 350, 650, 2450, 1100, 1650, 500, 2100, 300, 1100, 1650, 600,
  2100, 2500, 2800,
];

const formatChartLabel = (date: Date): string =>
  date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

const CHART_START_DATE = new Date(2026, 5, 10);

export const VIEWS_CHART_DATA = CHART_VALUES.map((value, index) => {
  const date = new Date(CHART_START_DATE);
  date.setDate(CHART_START_DATE.getDate() + index);
  return { label: formatChartLabel(date), value };
});

export const PIE_CHART_DATA = [
  { name: "Group A", value: 400, fill: "#0088FE" },
  { name: "Group B", value: 300, fill: "#00C49F" },
  { name: "Group C", value: 300, fill: "#FFBB28" },
  { name: "Group D", value: 200, fill: "#FF8042" },
];

export const OVERVIEW_ANALYTICS = [
  {
    id: "total_views",
    title: "Total views",
    count: 1526,
    trend: "up",
    trendPct: 11,
    Icon: EyeIcon,
  },
  {
    id: "total_saves",
    title: "Total saves",
    count: 390,
    trend: "up",
    trendPct: 9,
    Icon: HeartIcon,
  },
  {
    id: "contact_taps",
    title: "Contact taps",
    count: 89,
    trend: "up",
    trendPct: 5,
    Icon: PhoneCallIcon,
  },
  {
    id: "workshop_views",
    title: "Workshop views",
    count: 242,
    trend: "down",
    trendPct: 14,
    Icon: CompassToolIcon,
  },
];

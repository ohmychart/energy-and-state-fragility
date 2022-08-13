import { scaleOrdinal } from 'd3-scale';

export const LABELS = ["ALERT", "WARNING", "STABLE", "SUSTAINABLE"];

export const LEVELS = [
  "Very sustainable",
  "Sustainable",
  "More stable",
  "Stable",
  "Less stable",
  "Warning",
  "Elevated warning",
  "High warning",
  "Alert",
  "High alert",
  "Very high alert",
];

export const COLORS = [
  "#67001f",
  "#b2182b",
  "#d6604d",
  "#f4a582",
  "#fddbc7",
  "#ffffff",
  "#e0e0e0",
  "#bababa",
  "#878787",
  "#4d4d4d",
  "#1a1a1a",
];

export const scaleColor = scaleOrdinal()
.range(COLORS.reverse())
.domain([
    'Very sustainable',
    'Sustainable',
    'More stable',
    'Stable',
    'Less stable',
    'Warning',
    'Elevated warning',
    'High warning',
    'Alert',
    'High alert',
    'Very high alert'
]);
const mongoose = require("mongoose");

// Predefined color palette (24 colors)
const COLORS = [
  "#FF6633", "#FFB399", "#FFFF99", "#00B3E6",
  "#E6B333", "#E6B3B3", "#6680B3", "#CB99C9",
  "#66991A", "#FF99E6", "#CCFF1A", "#FF1A66",
  "#33FFCC", "#B366CC", "#CC80CC", "#E666FF",
  "#4DB3FF", "#1AB399", "#E666B3", "#00E680",
  "#FBC4AB", "#D0F0C0", "#FFB347", "#FF6961",
  "#77DD77", "#CDA4DE", "#FFFACD", "#B0E0E6",
];
const labelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: () => COLORS[Math.floor(Math.random() * COLORS.length)] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Label", labelSchema);
import mongoose, { Schema, Document } from "mongoose";

const COLORS: string[] = [
  "#f44336",
  "#e81e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
  "#000000",
  "#F28B82",
  "#FBBC04",
  "#FFF475",
  "#CCFF90",
  "#A7FFEB",
  "#CBF0F8",
  "#AECBFA",
  "#D7AEFB",
  "#FDCFE8",
  "#E6C9A8",
];

export interface ILabel extends Document {
  name: string;
  color: string;
}

const LabelSchema = new Schema<ILabel>(
  {
    name: {
      type: String,
      maxlength: [20, "Label name cannot exceed 20 characters"],
      required: true,
    },
    color: {
      type: String,
      default: () => COLORS[Math.floor(Math.random() * COLORS.length)],
    },
  },
  { timestamps: true }
);

const Label = mongoose.model<ILabel>("Label", LabelSchema);
export default Label;

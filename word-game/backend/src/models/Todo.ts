import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITodo extends Document {
  task: string;
  completed: boolean;
  priority: "none" | "low" | "medium" | "high";
  dueDate?: Date;
  labels: Types.ObjectId[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    task: {
      type: String,
      required: true,
      maxlength: [300, "Todos cannot exceed 100 characters"],
    },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["none", "low", "medium", "high"],
      default: "none",
    },
    dueDate: { type: Date },
    labels: [{ type: Schema.Types.ObjectId, ref: "Label" }],
    notes: {
      type: String,
      maxlength: [300, "Notes cannot exceed 300 characters"],
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;

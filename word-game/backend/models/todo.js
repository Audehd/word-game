const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      maxlength: [300, "Todos cannot exceed 100 characters"],
    }, // Task description
    completed: { type: Boolean, default: false }, // Completion status
    priority: {
      type: String,
      enum: ["none", "low", "medium", "high"],
      default: "none",
    }, // Priority
    dueDate: { type: Date }, // Optional due date
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }], // reference labels
    notes: {
      type: String,
      maxlength: [300, "Notes cannot exceed 300 characters"], // validation
    }, // Optional notes/details
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Todo", todoSchema);

const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// ==========================
// GET all todos
// ==========================
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ success: true, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================
// GET single todo by ID
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ success: false, error: "Todo not found" });
    res.json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================
// POST create new todo
// ==========================
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ==========================
// PUT update todo by ID
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTodo) return res.status(404).json({ success: false, error: "Todo not found" });

    res.json({ success: true, data: updatedTodo });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ==========================
// DELETE todo by ID
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ success: false, error: "Todo not found" });

    res.json({ success: true, data: deletedTodo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
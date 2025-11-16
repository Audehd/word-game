import { Router, type Request, type Response } from "express";
import Todo from "../models/Todo.js";

const router = Router();

// ==========================
// GET all todos
// ==========================
router.get("/", async (_req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json({ success: true, data: todos });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================
// GET single todo by ID
// ==========================
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: "Todo not found" });
    }
    res.json({ success: true, data: todo });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================
// POST create new todo
// ==========================
router.post("/", async (req: Request, res: Response) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json({ success: true, data: todo });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ==========================
// PUT mark all todos as done
// ==========================
router.put("/markAllAsDone", async (_req: Request, res: Response) => {
  try {
    await Todo.updateMany({}, { completed: true });
    const todos = await Todo.find();
    res.status(200).json({
      success: true,
      data: todos,
      message: "All todos marked as done",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================
// PUT mark all todos as not done
// ==========================
router.put("/markAllAsNotDone", async (_req: Request, res: Response) => {
  try {
    await Todo.updateMany({}, { completed: false });
    const todos = await Todo.find();
    res.status(200).json({
      success: true,
      data: todos,
      message: "All todos marked as not done",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================
// PUT update todo by ID
// ==========================
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ success: false, error: "Todo not found" });
    }

    res.json({ success: true, data: updatedTodo });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ==========================
// DELETE todo by ID
// ==========================
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ success: false, error: "Todo not found" });
    }

    res.json({ success: true, data: deletedTodo });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

import { Router, type Request, type Response } from "express";
import Todo from "../models/Todo.js";

const router = Router();

// ==========================
// GET all todos
// ==========================
router.get("/", async (_req: Request, res: Response) => {
  const todos = await Todo.find();
  res.json({ success: true, data: todos });
});

// ==========================
// GET single todo by ID
// ==========================
router.get("/:id", async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ success: false, error: "Todo not found" });
  }
  res.json({ success: true, data: todo });
});

// ==========================
// POST create new todo
// ==========================
router.post("/", async (req: Request, res: Response) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).json({ success: true, data: todo });
});

// ==========================
// PUT mark all todos as done
// ==========================
router.put("/markAllAsDone", async (_req: Request, res: Response) => {
  await Todo.updateMany({}, { completed: true });
  const todos = await Todo.find();
  res.status(200).json({
    success: true,
    data: todos,
    message: "All todos marked as done",
  });
});

// ==========================
// PUT mark all todos as not done
// ==========================
router.put("/markAllAsNotDone", async (_req: Request, res: Response) => {
  await Todo.updateMany({}, { completed: false });
  const todos = await Todo.find();
  res.status(200).json({
    success: true,
    data: todos,
    message: "All todos marked as not done",
  });
});

// ==========================
// PUT update todo by ID
// ==========================
router.put("/:id", async (req: Request, res: Response) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTodo) {
    return res.status(404).json({ success: false, error: "Todo not found" });
  }
  res.json({ success: true, data: updatedTodo });
});

// ==========================
// DELETE todo by ID
// ==========================
router.delete("/:id", async (req: Request, res: Response) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  if (!deletedTodo) {
    return res.status(404).json({ success: false, error: "Todo not found" });
  }
  res.json({ success: true, data: deletedTodo });
});

export default router;

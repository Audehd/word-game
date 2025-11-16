import { Router, type Request, type Response } from "express";
import Label from "../models/Label.js";

const router = Router();

// ==========================
// GET all labels
// ==========================
router.get("/", async (_req: Request, res: Response) => {
  try {
    const labels = await Label.find();
    res.json({ success: true, data: labels });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================
// GET single label by ID
// ==========================
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const label = await Label.findById(req.params.id);
    if (!label) {
      return res.status(404).json({ success: false, error: "Label not found" });
    }
    res.json({ success: true, data: label });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================
// POST create new label
// ==========================
router.post("/", async (req: Request, res: Response) => {
  try {
    const label = new Label(req.body);
    await label.save();
    res.status(201).json({ success: true, data: label });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ==========================
// PUT update label by ID
// ==========================
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedLabel = await Label.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLabel) {
      return res.status(404).json({ success: false, error: "Label not found" });
    }

    res.json({ success: true, data: updatedLabel });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ==========================
// DELETE label by ID
// ==========================
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedLabel = await Label.findByIdAndDelete(req.params.id);

    if (!deletedLabel) {
      return res.status(404).json({ success: false, error: "Label not found" });
    }

    res.json({ success: true, data: deletedLabel });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

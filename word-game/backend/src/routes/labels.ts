import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import Label from "../models/Label.js";

const router = Router();

// ==========================
// GET all labels
// ==========================
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  const labels = await Label.find();
  res.json({ success: true, data: labels });
});

// ==========================
// GET single label by ID
// ==========================
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const label = await Label.findById(req.params.id);
  if (!label) {
    return res.status(404).json({ success: false, error: "Label not found" });
  }
  res.json({ success: true, data: label });
});

// ==========================
// POST create new label
// ==========================
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const label = new Label(req.body);
  await label.save();
  res.status(201).json({ success: true, data: label });
});

// ==========================
// PUT update label by ID
// ==========================
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const updatedLabel = await Label.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedLabel) {
    return res.status(404).json({ success: false, error: "Label not found" });
  }
  res.json({ success: true, data: updatedLabel });
});

// ==========================
// DELETE label by ID
// ==========================
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedLabel = await Label.findByIdAndDelete(req.params.id);
    if (!deletedLabel) {
      return res.status(404).json({ success: false, error: "Label not found" });
    }
    res.json({ success: true, data: deletedLabel });
  }
);

export default router;

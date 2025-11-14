const express = require("express");
const router = express.Router();
const Label = require("../models/Label");

// ==========================
// GET all labels
// ==========================
router.get("/", async (req, res) => {
  try {
    const labels = await Label.find();
    res.json({ success: true, data: labels });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

// ==========================
// GET single label by ID
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const label = await Label.findById(req.params.id);
    if (!label) return res.status(res.status || 404).json({ success: false, error: "Label not found" });
    res.json({ success: true, data: label });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

// ==========================
// POST create new label
// ==========================
router.post("/", async (req, res) => {
  try {
    const label = new Label(req.body);
    await label.save();
    res.status(res.status || 201).json({ success: true, data: label });
  } catch (err) {
    res.status(err.status || 400).json({ success: false, error: err.message });
  }
});

// ==========================
// PUT update label by ID
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const updatedLabel = await Label.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLabel) return res.status(res.status || 404).json({ success: false, error: "Label not found" });

    res.json({ success: true, data: updatedLabel });
  } catch (err) {
    res.status(err.status || 400).json({ success: false, error: err.message });
  }
});

// ==========================
// DELETE label by ID
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const deletedLabel = await Label.findByIdAndDelete(req.params.id);
    if (!deletedLabel) return res.status(res.status || 404).json({ success: false, error: "Label not found" });

    res.json({ success: true, data: deletedLabel });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

module.exports = router;
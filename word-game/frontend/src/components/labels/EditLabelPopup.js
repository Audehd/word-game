import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  DialogActions,
  Button,
} from "@mui/material";

const COLORS = [
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

export default function EditLabelDialog({ open, label, onClose, onSave }) {
  const [name, setName] = useState(label.name);
  const [color, setColor] = useState(label.color);
  const [error, setError] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    onSave({ ...label, name, color });
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (error && value.trim()) setError(false);
  };

  const handleClose = () => {
    setError(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Label</DialogTitle>
      <DialogContent>
        <TextField
          value={name}
          onChange={handleNameChange}
          label="Label Name"
          fullWidth
          margin="dense"
          error={error}
          helperText={error ? "Label name cannot be empty" : ""}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {COLORS.map((c) => (
            <Box
              key={c}
              onClick={() => setColor(c)}
              sx={{
                width: 30,
                height: 30,
                backgroundColor: c,
                borderRadius: "4px",
                border: color === c ? "2px solid #000" : "1px solid #ccc",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { useState } from "react";
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

export default function EditLabelDialog({
  open,
  label,
  onClose,
  onSave,
  labelInputProps,
}) {
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
    if (error && value.trim()) {
      setError(false);
    }
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
          inputProps={labelInputProps}
          error={error}
          helperText={
            error
              ? "Label name cannot be empty"
              : `${name.length}/20 characters`
          }
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

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Labels.css";
import {
  fetchLabels,
  createLabel,
  updateLabel,
  deleteLabel,
} from "../../redux/labelsSlice";

import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MyButton from "../reusable-components/Button";
import EditLabelModal from "./EditLabelModal";

function Labels() {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.labels.items);
  const [editOpen, setEditOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (error && value) {
      setError(false);
    }
    setName(value);
  };

  const handleAdd = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    dispatch(createLabel({ name }));
    setName("");
  };

  const handleDelete = (id) => {
    dispatch(deleteLabel(id));
  };

  const handleEditClick = (label) => {
    setCurrentLabel(label);
    setEditOpen(true);
  };

  const handleClose = () => {
    setCurrentLabel(null);
    setEditOpen(false);
  };

  const handleSave = (updatedLabel) => {
    dispatch(updateLabel({ id: updatedLabel._id, label: updatedLabel }));
    setCurrentLabel(null);
    setEditOpen(false);
  };

  return (
    <div className="labels-wrapper">
      <div className="create-label-wrapper">
        <TextField
          value={name}
          onChange={handleNameChange}
          placeholder="New Label"
          variant="outlined"
          size="small"
          error={error}
          helperText={
            error
              ? "Label name cannot be empty"
              : `${name.length}/20 characters`
          }
        />
        <MyButton
          variant="contained"
          onClick={handleAdd}
          sx={{ height: "40px" }}
        >
          Add label
        </MyButton>
      </div>

      <List>
        {labels.map((label) => (
          <ListItem
            key={label._id}
            secondaryAction={
              <>
                <Button onClick={() => handleEditClick(label)}>Edit</Button>
                <Button onClick={() => handleDelete(label._id)}>Delete</Button>
              </>
            }
          >
            <Box
              sx={{
                padding: "0rem 0.5rem",
                borderRadius: "4px",
                border: `1px solid ${label.color}`,
                backgroundColor: label.color,
                color: "#fff",
              }}
            >
              <ListItemText primary={label.name} />
            </Box>
          </ListItem>
        ))}
      </List>
      {currentLabel && (
        <EditLabelModal
          open={editOpen}
          label={currentLabel}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Labels;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLabels, createLabel, updateLabel, deleteLabel } from "../redux/labelsSlice";

import { TextField, Button, List, ListItem, ListItemText, Box } from "@mui/material";

function Labels() {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.labels.items);

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

  const handleAdd = () => {
    if (!name) return;
    dispatch(createLabel({ name }));
    setName("");
  };

  const handleDelete = (id) => {
    dispatch(deleteLabel(id));
  };

  return (
    <div>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Label"
        variant="outlined"
        size="small"
      />
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>

      <List>
        {labels.map((label) => (
<ListItem
            key={label._id}
            secondaryAction={
              <Button onClick={() => handleDelete(label._id)}>Delete</Button>
            }
          >
            <Box
              sx={{
                display: "inline-block",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                border: `1px solid ${label.color}`,
                backgroundColor: label.color,
                color: "#fff", // text color, you could make this dynamic for contrast if needed
              }}
            >
              <ListItemText primary={label.name} />
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Labels;
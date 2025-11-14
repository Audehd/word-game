import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../redux/todosSlice";
import { fetchLabels } from "../redux/labelsSlice";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box
} from "@mui/material";

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const labels = useSelector((state) => state.labels.items);

  const [task, setTask] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedLabelIds, setSelectedLabelIds] = useState([]);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchLabels());
  }, [dispatch]);

  const handleAdd = () => {
    if (!task) return;
    dispatch(
      createTodo({
        task,
        completed: false,
        labels: selectedLabelIds,
        notes
      })
    );
    setTask("");
    setNotes("");
    setSelectedLabelIds([]);
  };

  const handleToggle = (todo) => {
    dispatch(updateTodo({ id: todo._id, todo: { ...todo, completed: !todo.completed } }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleLabelChange = (e) => {
    setSelectedLabelIds(e.target.value); // MUI Select gives array directly
  };

  return (
    <div>
      {/* Task input */}
      <TextField
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Todo"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
      />

      {/* Notes input */}
      <TextField
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        multiline
        rows={2}
      />

      {/* Label multiselect */}
      <Select
        multiple
        value={selectedLabelIds}
        onChange={handleLabelChange}
        displayEmpty
        fullWidth
        margin="normal"
      >
        {labels.map((label) => (
          <MenuItem key={label._id} value={label._id}>
            {label.name}
          </MenuItem>
        ))}
      </Select>

      <Button variant="contained" onClick={handleAdd} fullWidth sx={{ mt: 1, mb: 2 }}>
        Add Todo
      </Button>

      {/* List of todos */}
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo._id}
            secondaryAction={
              <Button onClick={() => handleDelete(todo._id)}>Delete</Button>
            }
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
            <ListItemText
              primary={todo.task}
              secondary={
                <>
                  {/* Label badges */}
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 0.5 }}>
                    {todo.labels?.map((id) => {
                      const label = labels.find((l) => l._id === id);
                      if (!label) return null;
                      return (
                        <Box
                          key={label._id}
                          sx={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            border: `1px solid ${label.color}`,
                            backgroundColor: label.color,
                            color: "#fff",
                            fontSize: "0.75rem"
                          }}
                        >
                          {label.name}
                        </Box>
                      );
                    })}
                  </Box>
                  {/* Notes */}
                  {todo.notes && <Box sx={{ mt: 0.5 }}>{todo.notes}</Box>}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Todos;
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  markAllAsDone,
} from "../../redux/todosSlice";
import "./Todos.css";
import { fetchLabels } from "../../redux/labelsSlice";

import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MyButton from "../reusable-components/Button";
import LabelAutocomplete from "../labels/LabelsAutoComplete";

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
        notes,
      })
    );
    setTask("");
    setNotes("");
    setSelectedLabelIds([]);
  };

  const handleToggle = (todo) => {
    dispatch(
      updateTodo({
        id: todo._id,
        todo: { ...todo, completed: !todo.completed },
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleMarkAllAsDone = () => {
    dispatch(markAllAsDone());
  };

  const taskInputProps = {
    maxLength: 100,
  };

  const notesInputProps = {
    maxLength: 300,
  };

  return (
    <div className="todos-wrapper">
      {/* Task input */}
      <TextField
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Todo"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        inputProps={taskInputProps}
        helperText={`${task.length}/100 characters`} // shows counter
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
        inputProps={notesInputProps}
        helperText={`${notes.length}/300 characters`} // shows counter
      />
      {/* Label multiselect */}
      <LabelAutocomplete
        labels={labels}
        selectedLabelIds={selectedLabelIds}
        setSelectedLabelIds={setSelectedLabelIds}
      />
      <MyButton
        variant="contained"
        onClick={handleAdd}
        fullWidth
        sx={{ mt: 1, mb: 2 }}
      >
        Add Todo
      </MyButton>
      {/* List of todos */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<DoneAllIcon />}
        onClick={handleMarkAllAsDone}
        sx={{ mb: 2 }}
      >
        Mark all as complete
      </Button>
      <List
        sx={{
          maxHeight: 800,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {todos.map((todo) => (
          <ListItem
            sx={{
              minHeight: "110px",
              border: 1,
              borderColor: "#e0e0e0",
              borderRadius: "10px",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
            }}
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
              sx={{ mr: 5 }}
              primary={todo.task}
              secondary={
                <>
                  {/* Notes */}
                  {todo.notes && (
                    <Box sx={{ mt: 0.5, mr: 5 }}>{todo.notes}</Box>
                  )}
                  {/* Label badges */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      mt: 0.5,
                    }}
                  >
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
                            fontSize: "0.75rem",
                          }}
                        >
                          {label.name}
                        </Box>
                      );
                    })}
                  </Box>
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

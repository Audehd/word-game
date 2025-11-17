import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  markAllAsDone,
  fetchNotDoneTodos,
  fetchDoneTodos,
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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MyButton from "../reusable-components/Button";
import ShowDoneSwitch from "./ShowDoneSwitch";
import LabelAutocomplete from "../labels/LabelsAutoComplete";
import LabelsModal from "../labels/LabelsModal";

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const labels = useSelector((state) => state.labels.items);

  const [task, setTask] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(false);
  const [selectedLabelIds, setSelectedLabelIds] = useState([]);
  const [openLabels, setOpenLabels] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [hasFetchedDone, setHasFetchedDone] = useState(false);

  const handleOpen = () => setOpenLabels(true);
  const handleClose = () => setOpenLabels(false);

  useEffect(() => {
    dispatch(fetchNotDoneTodos());
    dispatch(fetchLabels());
  }, [dispatch]);

  useEffect(() => {}, [dispatch]);

  const handleTaskChange = (e) => {
    const value = e.target.value;
    if (error && value) {
      setError(false);
    }
    setTask(value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleAdd = () => {
    if (!task.trim()) {
      setError(true);
      return;
    }
    if (!task) return;
    dispatch(
      createTodo({
        task,
        completed: false,
        labels: selectedLabelIds,
        notes,
      })
    );
    setError(false);
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

  const handleToggleShowDone = () => {
    const nextValue = !showDone;
    setShowDone(nextValue);

    if (nextValue && !hasFetchedDone) {
      dispatch(fetchDoneTodos());
      setHasFetchedDone(true);
    }
  };

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => showDone || !todo.completed);
  }, [todos, showDone]);

  const taskInputProps = {
    maxLength: 100,
  };

  const notesInputProps = {
    maxLength: 300,
  };

  return (
    <div className="todos-wrapper">
      <TextField
        value={task}
        onChange={handleTaskChange}
        placeholder="New Todo"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        inputProps={taskInputProps}
        error={error}
        helperText={
          error ? "Todo name cannot be empty" : `${task.length}/100 characters`
        }
      />
      <TextField
        value={notes}
        onChange={handleNotesChange}
        placeholder="Notes (optional)"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        inputProps={notesInputProps}
        helperText={`${notes.length}/300 characters`}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <LabelAutocomplete
          labels={labels}
          selectedLabelIds={selectedLabelIds}
          setSelectedLabelIds={setSelectedLabelIds}
        />
        <Button variant="outlined" onClick={handleOpen}>
          Edit Labels
        </Button>
        <Dialog open={openLabels} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit Labels</DialogTitle>
          <DialogContent>
            <LabelsModal />
          </DialogContent>
        </Dialog>
      </div>
      <MyButton
        variant="contained"
        onClick={handleAdd}
        fullWidth
        sx={{ mt: 1, mb: 2 }}
      >
        Add Todo
      </MyButton>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DoneAllIcon />}
          onClick={handleMarkAllAsDone}
          sx={{ mb: 2, mr: "auto" }}
        >
          Mark all as complete
        </Button>
        <ShowDoneSwitch showDone={showDone} onToggle={handleToggleShowDone} />
      </div>
      <List
        sx={{
          maxHeight: 800,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {visibleTodos.map((todo) => (
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
                  {todo.notes && (
                    <Box sx={{ mt: 0.5, mr: 5 }}>{todo.notes}</Box>
                  )}
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

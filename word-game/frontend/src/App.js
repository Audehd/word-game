import { useState } from "react";
import "./App.css";
import Labels from "./components/labels/Labels";
import Todos from "./components/todos/Todos";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

function App() {
  const [openLabels, setOpenLabels] = useState(false);

  const handleOpen = () => setOpenLabels(true);
  const handleClose = () => setOpenLabels(false);

  return (
    <div className="main-wrapper">
      <Todos />
      <Button variant="outlined" onClick={handleOpen}>
        Edit Labels
      </Button>
      <Dialog open={openLabels} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Labels</DialogTitle>
        <DialogContent>
          <Labels />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;

import React from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ShowDoneSwitch({ showDone, onToggle }) {
  return (
    <FormControlLabel
      label="Show done todos"
      control={
        <Switch checked={showDone} onChange={onToggle} color="primary" />
      }
    />
  );
}

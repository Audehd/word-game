import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Autocomplete, Chip } from "@mui/material";
import { createLabel } from "../../redux/labelsSlice";

export default function LabelAutocomplete({
  labels,
  selectedLabelIds,
  setSelectedLabelIds,
}) {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const handleChange = (event, newValue) => {
    setError(false);
    const newIds = newValue.map((item) => {
      if (typeof item === "string") {
        if (item.length > 20) {
          setError(true);
          return null;
        }
        addLabel(item);
        return null;
      } else {
        return item._id;
      }
    });
    setSelectedLabelIds(newIds);
  };

  const selectedLabels = selectedLabelIds
    .map((id) => labels.find((label) => label._id === id))
    .filter(Boolean);

  const addLabel = (name) => {
    if (!name) return;

    dispatch(createLabel({ name })).then((resultAction) => {
      if (createLabel.fulfilled.match(resultAction)) {
        const newLabelId = resultAction.payload._id;
        setSelectedLabelIds((prevIds) => [...prevIds, newLabelId]);
      }
    });
  };

  return (
    <Autocomplete
      sx={{ flexGrow: 1 }}
      multiple
      freeSolo // allows adding new labels
      options={labels}
      getOptionLabel={(option) => option.name || option} // option can be string if freeSolo
      value={selectedLabels}
      onChange={handleChange}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option._id || option}
            label={option.name || option}
            {...getTagProps({ index })}
            style={{
              backgroundColor: option.color || "#1976d2",
              color: "#fff",
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Labels"
          placeholder="Select or create labels"
          onKeyDown={() => setError(false)}
          variant="outlined"
          size="small"
          error={error}
          helperText={error ? "Label name cannot exceed 20 characters" : ""}
        />
      )}
      isOptionEqualToValue={(option, value) => option._id === value._id}
    />
  );
}

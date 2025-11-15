import { TextField, Autocomplete, Chip } from "@mui/material";
import { createLabel } from "../../redux/labelsSlice";
import { useDispatch } from "react-redux";

export default function LabelAutocomplete({
  labels,
  selectedLabelIds,
  setSelectedLabelIds,
}) {
  const dispatch = useDispatch();

  const selectedLabels = selectedLabelIds
    .map((id) => labels.find((label) => label._id === id))
    .filter(Boolean);

  const addLabel = (name) => {
    if (!name) return;

    // Dispatch the async thunk and wait for the result
    dispatch(createLabel({ name })).then((resultAction) => {
      if (createLabel.fulfilled.match(resultAction)) {
        const newLabelId = resultAction.payload._id;
        setSelectedLabelIds((prevIds) => [...prevIds, newLabelId]);
      }
    });
  };

  return (
    <Autocomplete
      multiple
      freeSolo // allows adding new labels
      options={labels}
      getOptionLabel={(option) => option.name || option} // option can be string if freeSolo
      value={selectedLabels}
      onChange={(event, newValue) => {
        const newIds = newValue.map((item) => {
          if (typeof item === "string") {
            addLabel(item);
          } else {
            return item._id;
          }
        });
        setSelectedLabelIds(newIds);
      }}
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
          variant="outlined"
          size="small"
        />
      )}
      isOptionEqualToValue={(option, value) => option._id === value._id}
    />
  );
}

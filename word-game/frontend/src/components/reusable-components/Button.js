import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Create a styled MUI Button
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4caf50",   // green background
  color: "#fff",                // white text
  borderRadius: "12px",
  padding: "10px 20px",
  fontWeight: 500,
  '&:hover': {
    backgroundColor: "#45a049", // slightly darker on hover
  },
}));

//Add variants, primary, secondary...

// Reusable component
const MyButton = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default MyButton;
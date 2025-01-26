import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Light green
      light: "#80e27e",
      dark: "#087f23",
    },
    background: {
      default: "#ffffff", // White
      paper: "#f1f8e9", // Very light green
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

export default theme


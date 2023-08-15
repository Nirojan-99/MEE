import { BrowserRouter as Router } from "react-router-dom";
//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Pages from "./Pages";

function App() {
  //theme data
  let theme1 = createTheme({
    typography: {
      mode: "light",
      primary: {
        main: "#299FB5",
      },
    },
    palette: {
      mode: "light",

      primary: {
        main: "#299FB5",
        button: "#299FB5",
      },
      status: {
        main: "#ddd",
      },
      // background: {
      //   default: "#1A374D",
      //   paper: "#fff",
      //   button: "#2B4865",
      // },
      // divider: "#2B4865",
      secondary: {
        main: "#406882",
      },
      text: {
        primary: "#299FB5",
        secondary: "#fff",
      },
      success: {
        main: "#FEC260",
      },
      info: {
        main: "#1597BB",
      },
      error: {
        main: "#FF0000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme1}>
      <Router>
        <Pages />
      </Router>
    </ThemeProvider>
  );
}

export default App;

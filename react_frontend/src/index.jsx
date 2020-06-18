import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffd28f",
      main: "#f5b95f",
      dark: "#e0a348",
      contrastText: "#000000",
    },
    secondary: {
      light: "#d0ed53",
      main: "#bbd938",
      dark: "#96b319",
      contrastText: "#000000",
    },
    error: {
      light: "#b5317c",
      main: "#912763",
      dark: "#731e4e",
      contrastText: "#ffffff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux"; // Importa el Provider de Redux
import { store } from "./redux/store"; // Importa el store configurado

const theme = createTheme({
  palette: {
    mode: "light", // Cambia a "dark" si prefieres tema oscuro
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);



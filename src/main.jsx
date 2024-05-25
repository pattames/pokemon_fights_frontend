import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DataContextProvider from "./context/DataContext.jsx";
import { BrowserRouter } from "react-router-dom";
import SelectPokeContextProvider from "./context/SelectPokeContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx"; // Import your ThemeProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        {" "}
        {/* Wrap your app with ThemeProvider */}
        <AuthContextProvider>
          <SelectPokeContextProvider>
            <DataContextProvider>
              <App />
            </DataContextProvider>
          </SelectPokeContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

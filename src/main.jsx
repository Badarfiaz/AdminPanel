import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import AdminStore from "./Redux/AdminStore.jsx";
import App from "./App.jsx";

// Create the root container
const root = createRoot(document.getElementById("root"));

// Render the app using createRoot
root.render(
  <StrictMode>
    <Provider store={AdminStore}>
      <App />
    </Provider>
  </StrictMode>
);

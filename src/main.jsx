import "flowbite/dist/flowbite.min.js";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "flowbite";
import UserContextProvider from "./Components/UserContext/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./utils/AppRoutes";

const router = createBrowserRouter(AppRoutes);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

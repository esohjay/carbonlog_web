import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error.tsx";
import Greeting from "./Greeting.tsx";
import Login from "./screens/Login.tsx";
import Register from "./screens/Register.tsx";
import Home from "./screens/Home.tsx";
import { AuthProvider } from "./context/providers/auth.tsx";
import { SurveyProvider } from "./context/providers/survey.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "greet",
    element: <Greeting />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <Register />,
  },
  {
    path: ":userId",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SurveyProvider>
        <RouterProvider router={router} />
      </SurveyProvider>
    </AuthProvider>
  </React.StrictMode>
);

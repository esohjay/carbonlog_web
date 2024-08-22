import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error.tsx";
import Greeting from "./Greeting.tsx";
import Login from "./screens/Login.tsx";
import Register from "./screens/Register.tsx";
import Home from "./screens/Home.tsx";
import Track from "./screens/Track.tsx";
import Action from "./screens/Action.tsx";
import ActDetails from "./screens/ActionDetail.tsx";
import AllActionsScreen from "./screens/AllActions.tsx";
import CampaignContainer from "./screens/CampaignContainer.tsx";
import CampaignScreen from "./screens/Campaign.tsx";
import AllCampaignScreen from "./screens/AllCampaigns.tsx";
import { AuthProvider } from "./context/providers/auth.tsx";
import { SurveyProvider } from "./context/providers/survey.tsx";
import { CampaignProvider } from "./context/providers/campaign.tsx";
import { ActionProvider } from "./context/providers/action.tsx";
import { TrackProvider } from "./context/providers/track.tsx";
import MyActions from "./screens/MyActions.tsx";
import Template from "./screens/Template.tsx";
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
    element: <Template />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <Track />,
        path: "track",
      },
      {
        element: <Action />,
        path: "act",
      },
      {
        element: <MyActions />,
        path: "my-actions",
      },
      {
        element: <AllActionsScreen />,
        path: "all-actions",
      },
      {
        element: <ActDetails />,
        path: ":actionId",
      },
      {
        element: <CampaignContainer />,
        path: "campaign",
        children: [
          {
            element: <CampaignScreen />,
            index: true,
          },
          {
            element: <AllCampaignScreen />,
            path: "all",
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <React.StrictMode>
      <CampaignProvider>
        <SurveyProvider>
          <ActionProvider>
            <TrackProvider>
              <RouterProvider router={router} />
            </TrackProvider>
          </ActionProvider>
        </SurveyProvider>
      </CampaignProvider>
    </React.StrictMode>
  </AuthProvider>
);

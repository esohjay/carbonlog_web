import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorPage from "./error.tsx";
import Root from "./Root.tsx";
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
import Chat from "./screens/Chat.tsx";
import CampaignDetails from "./screens/CampaignDetails.tsx";
import SettingsScreen from "./screens/Settings.tsx";
import About from "./screens/About.tsx";
import ProfileScreen from "./screens/Profile.tsx";
import { AuthProvider } from "./context/providers/auth.tsx";
import { SurveyProvider } from "./context/providers/survey.tsx";
import { CampaignProvider } from "./context/providers/campaign.tsx";
import { ActionProvider } from "./context/providers/action.tsx";
import { TrackProvider } from "./context/providers/track.tsx";
import MyActions from "./screens/MyActions.tsx";
import Template from "./screens/Template.tsx";
import "./index.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route path="" index element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<Register />} />
      <Route path=":userId" element={<Template />}>
        <Route path="" index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="track" element={<Track />} />
        <Route path="act" element={<Action />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="my-actions" element={<MyActions />} />
        <Route path="all-actions" element={<AllActionsScreen />} />
        <Route path=":actionsId" element={<ActDetails />} />
        <Route element={<CampaignContainer />} path="campaign">
          <Route index element={<CampaignScreen />} />
          <Route path=":campaignId" element={<CampaignDetails />} />
          <Route path=":campaignId/chat" element={<Chat />} />
        </Route>
        <Route path="all-campaign" element={<AllCampaignScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
      </Route>
    </Route>
  )
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "greet",
//     element: <Greeting />,
//   },
//   {
//     path: "login",
//     element: <Login />,
//   },
//   {
//     path: "sign-up",
//     element: <Register />,
//   },
//   {
//     path: ":userId",
//     element: <Template />,
//     children: [
//       {
//         index: true,

//         element: <Home />,
//       },
//       {
//         element: <Track />,
//         path: "track",
//       },
//       {
//         element: <Action />,
//         path: "act",
//       },
//       {
//         element: <MyActions />,
//         path: "my-actions",
//       },
//       {
//         element: <AllActionsScreen />,
//         path: "all-actions",
//       },
//       {
//         element: <ActDetails />,
//         path: ":actionId",
//       },
//       {
//         element: <CampaignContainer />,
//         path: "campaign",
//         children: [
//           {
//             element: <CampaignScreen />,
//             index: true,
//           },
//           {
//             element: <AllCampaignScreen />,
//             path: "campaign/all",
//           },
//         ],
//       },
//     ],
//   },
// ]);

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

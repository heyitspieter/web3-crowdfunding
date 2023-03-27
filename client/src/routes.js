import App from "App";
import Home from "pages/Home/Home";
import Profile from "pages/Profile/Profile";
import Campaign from "pages/Campaign/Campaign";
import NewCampaign from "pages/Campaign/NewCampaign/NewCampaign";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/campaign/new",
        element: <NewCampaign />,
      },
      {
        path: "/campaign/:id",
        element: <Campaign />,
      },
    ],
  },
];

import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "assets";

export const navlinks = [
  {
    name: "dashboard",
    src: dashboard,
    path: "/",
  },
  {
    name: "campaign",
    src: createCampaign,
    path: "/campaign/new",
  },
  {
    name: "payment",
    src: payment,
    path: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    src: withdraw,
    path: "/",
    disabled: true,
  },
  {
    name: "profile",
    src: profile,
    path: "/profile",
  },
  {
    name: "logout",
    src: logout,
    path: "/",
    disabled: true,
  },
];

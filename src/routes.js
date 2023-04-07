// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import AddNewEvent from "layouts/addNewEvent";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/login";
import CommiteeReg from "layouts/committee-auth/sign-up/index.js";
import CommiteeLogin from "layouts/committee-auth/login/index.js";
import CommitteeDashboard from "layouts/dashboard copy/index.js";

// @mui icons/
import Icon from "@mui/material/Icon";
import GetStudentApplications from "layouts/getStudentApplications";
import SetNewAdvertiseMent from "layouts/setAdvertisements";
import GetAdminAdvertisements from "layouts/getAdminAdvertisements";
import GetAdminSponsershipForms from "layouts/getAdminSponsershipForms";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "Add New Event",
    key: "add-new-event",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/add-new-event",
    component: <AddNewEvent />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "Student Applications",
    key: "student-applications",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/student-applications",
    component: <GetStudentApplications />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "Add Advertisement",
    key: "add-advertisement",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/add-advertisement",
    component: <SetNewAdvertiseMent />,
    toShow: true,
  },
  
  {
    type: "collapse",
    name: "All Advertisements",
    key: "all-advertise",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/admin-all-advertisements",
    component: <GetAdminAdvertisements />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "All Sponsership Forms",
    key: "all-sponserships",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/admin-all-sponserships",
    component: <GetAdminSponsershipForms />,
    toShow: true,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  //   toShow: true,
  // },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
    toShow: true,
  },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  //   toShow: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  //   toShow: true,
  // },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/",
    component: <SignIn />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/login",
    component: <SignIn />,
    toShow: false,
  }
];

export default routes;

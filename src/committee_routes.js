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
import CommitteeAddNewEvent from "layouts/committeeAddNewEvent/index.js"
import SetNewCommitteeAdvertiseMent from "layouts/setCommitteeAdvertisements/index.js"
import SetSponsershipForm from "layouts/setSponsershipForm/index.js"
import GetCommitteeSponsershipForms from "layouts/getCommitteeSponsershipForms/index.js"

// @mui icons/
import Icon from "@mui/material/Icon";
import GetStudentApplications from "layouts/getStudentApplications";
import SetNewAdvertiseMent from "layouts/setAdvertisements";
import GetCommitteeAdvertisements from "layouts/getCommitteeAdvertisements";

const committee_routes = [  
  {
    type: "collapse",
    name: "Commitee Dashboard",
    key: "committe-dashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/committee-dashboard",
    component: <CommitteeDashboard />,
    toShow: true,
  },
  
  {
    type: "collapse",
    name: "Add New Event",
    key: "add-new-event",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/committee-add-new-event",
    component: <CommitteeAddNewEvent />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "Add New Advertisement",
    key: "add-new-advertise",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/committee-add-new-advertise",
    component: <SetNewCommitteeAdvertiseMent />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "Sponsership Form",
    key: "submit-sponserhip",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/committee-submit-sponsership",
    component: <SetSponsershipForm />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "All Advertisements",
    key: "all-committee-advertisements",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/all-committee-advertisements",
    component: <GetCommitteeAdvertisements />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "All Sponsership Forms",
    key: "all-committee-sponserships",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/all-committee-sponserships",
    component: <GetCommitteeSponsershipForms />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/committee-auth/logout",
    component: <CommiteeLogin />,
    toShow: true,
  },
  {
    type: "collapse",
    name: "Committee Register",
    key: "committee-register",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/committee-auth/register",
    component: <CommiteeReg />,
    toShow: false,
  },
  {
    type: "collapse",
    name: "Committee Login",
    key: "committee-login",
    icon: <Icon fontSize="small">Login</Icon>,
    route: "/committee-auth/login",
    component: <CommiteeLogin/>,
    toShow: false,
  }
];

export default committee_routes;

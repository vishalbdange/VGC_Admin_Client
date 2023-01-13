// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

function AddNewEvent() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={6} mb={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={8}>
                        <Card>
                            <MDBox p={2}>
                                <MDTypography variant="h5">Alerts</MDTypography>
                            </MDBox>
                            {/* <MDBox spacing={5} pt={2} px={2}> */}
                            <MDInput sx={{ p: 2 }} type="text" label="Text" value="John Smith" />
                            <MDInput sx={{ p: 2 }} type="search" label="Search" value="Creative Tim" />
                            <MDInput sx={{ p: 2 }} type="email" label="Email" value="someone@example.com" />
                            <MDInput sx={{ p: 2 }} type="url" label="URL" value="www.creative-tim.com" />
                            <MDInput sx={{ p: 2 }} type="tel" label="Phone" value="40-(770)-888-444" />
                            <MDInput sx={{ p: 2 }} type="password" label="Password" value="password" />
                            <MDInput sx={{ p: 2 }} type="number" label="Number" value="123456789" />
                            <MDInput sx={{ p: 2 }} type="datetime" label="Date time" value="2018-11-23T10:30:00" />
                            <MDInput sx={{ p: 2 }} type="date" label="Date" value="2018-11-23" />
                            <MDInput sx={{ p: 2 }} type="month" label="Month" value="2018-11" />
                            <MDInput sx={{ p: 2 }} type="week" label="Week" value="2018-W23" />
                            <MDInput sx={{ p: 2 }} type="time" label="Time" value="10:30:00" />
                            <MDInput sx={{ p: 2 }} type="color" label="Color" value="#17c1e8" />
                            {/* </MDBox> */}
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    )

}
export default AddNewEvent;
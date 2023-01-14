import { useState } from "react";
// import fs from 'fs'
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
import MDButton from "components/MDButton";
import { toast } from "react-toastify";
import { AddNewEventDataToDatabase } from "api/api";
import { useNavigate } from "react-router-dom";

function AddNewEvent() {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        eventName: '',
        eventDescription: '',
        eventVenue: '',
        eventDate: '',
        eventStartTime: '',
        eventEndTime: '',
        eventCommittee: '',
        eventContact: '',
        file: ''
    });

    const handleChange = (target) => {
        if (target.name == "file") {
            // File size should be less than 3 MB
            if (target.files[0].size > 3145728) {
                toast.info("File size should be less than 3 MB");
                setEventData({ ...eventData, file: "" })
                target.value = ""
                return
            } else if (target.files[0].type != "image/jpeg" && target.files[0].type != "image/png") {
                toast.info("File type should be either jpeg or png");
                setEventData({ ...eventData, file: "" })
                target.value = ""
                return
            }
        }
        setEventData({ ...eventData, [target.name]: target.name == "file" ? target.files[0] : target.value.toString() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.info("Event data submitted", eventData);

        const result = await AddNewEventDataToDatabase(eventData);

        if (result.status == 200) {
            toast.info("Event data submitted successfully");
            navigate("/dashboard", { replace: true });
        } else {
            toast.warning("Something went wrong");
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={6} mb={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={8}>
                        <Card>
                            <form onSubmit={handleSubmit} >
                                <MDBox p={2}>
                                    <MDTypography variant="h5">Add New Event Details</MDTypography>
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="eventName" label="Event Name" type="text" value={eventData.eventName} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="eventDescription" label="Event Description" value={eventData.eventDescription} type="text" multiline rows={5} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="eventCommittee" label="Committee" type="text" value={eventData.eventCommittee} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="eventVenue" label="Venue" type="text" value={eventData.eventVenue} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="eventDate" label="Date" value={eventData.eventDate} type="date" data-date-format="DD MMM YYYY" onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="eventStartTime" label="Start Time" value={eventData.eventStartTime} type="time" onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="eventEndTime" label="End Time" value={eventData.eventEndTime} type="time" onChange={(e) => handleChange(e.target)} />
                                </MDBox>

                                <MDBox p={2}>
                                    <MDInput required fullWidth name="eventContact" label="Contact Number" type="number" value={eventData.eventContact} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth type="file" name="file" label="Poster Image" onChange={(e) => handleChange(e.target)} />
                                </MDBox>

                                <MDBox p={5} display="flex" justifyContent="center" alignItems="center">
                                    <MDButton variant="gradient" color="info" type="submit">
                                        Submit
                                    </MDButton>
                                </MDBox>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    )

}
export default AddNewEvent;
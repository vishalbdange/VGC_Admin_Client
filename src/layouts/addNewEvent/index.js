import { useState } from "react";

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
import { FormControl } from "@mui/material";
import { toast } from "react-toastify";

function AddNewEvent() {
    const [eventData, setEventData] = useState({
        eventName: '',
        eventDescription: '',
        venue: '',
        date: '',
        startTime: '',
        endTime: '',
        committee: '',
        contact: '',
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

    const handleSubmit = (e) => {
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:5000/signin',
        //   data: signInData, // you are sending body instead
        //   headers: {
        //   'Content-Type': 'application/json'
        //   }, 
        // })
        e.preventDefault();
        // if (eventData.file !== null) {
        //     console.log(eventData.file)
        //     if (eventData.file.size > 3145728) {
        //         // console.log(target.files[0].size)
        //         toast.info("File size should be less than 3 MB");
        //         return
        //     } else if (eventData.file.type != "image/jpeg" && eventData.file.type != "image/png") {
        //         // console.log(target.files[0].type)
        //         toast.info("File type should be either jpeg or png");
        //         return
        //     }
        // }
        console.info("Event data submitted", eventData);
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
                                    <MDInput required fullWidth name="committee" label="Committee" type="text" value={eventData.committee} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="venue" label="Venue" type="text" value={eventData.venue} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="date" label="Date" value={eventData.date} type="date" data-date-format="DD MMM YYYY" onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="startTime" label="Start Time" value={eventData.startTime} type="time" onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="endTime" label="End Time" value={eventData.endTime} type="time" onChange={(e) => handleChange(e.target)} />
                                </MDBox>

                                <MDBox p={2}>
                                    <MDInput required fullWidth name="contact" label="Contact Number" type="number" value={eventData.contact} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required type="file" accept="images/*" fullWidth name="file" label="Poster Image" onChange={(e) => handleChange(e.target)} />
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
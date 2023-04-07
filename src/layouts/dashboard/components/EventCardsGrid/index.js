import { useState, useEffect } from "react";
import { GetAllEventDetails } from "api/api";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";

// import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Divider, Icon } from "@mui/material";
import {UpdateAdminEventById} from 'api/api'

function EventsCardGrid() {

    const [allEvents, setAllEvents] = useState([]);

    useEffect(async () => {
        const fetchEvents = await GetAllEventDetails();
        setAllEvents(fetchEvents.data.allevents);
    }, []);

    
    const handleAcceptSubmit = async (_id) => {
        const result = await UpdateAdminEventById({
            id: _id,
            eventStatus: "Accepted"
        });
        console.log("Inside Accepting")

        if (result.status === 200) {
            toast.info("Event Approved successfully");
        } 
        window.location.reload()
        
    }
    const handleRejectSubmit = async (_id) => {
        console.log("Inside rejecting")

        const result = await UpdateAdminEventById({
            id: _id,
            eventStatus: "Rejected"
        });
        if (result.status === 200) {
            toast.info("Event rejected successfully");
        } 
        window.location.reload()
    }

    return (
        <MDBox mt={4.5}>
            <MDTypography mb={8} variant="h4" fontWeight="medium" textTransform="capitalize">
                All Events
            </MDTypography>
            <Grid container spacing={3}>
                {allEvents.map((event, index) => (

                    <Grid key={index} item xs={12} md={6} lg={4}>
                        <MDBox mb={3}>
                            <Card>
                                <MDBox position="relative" borderRadius="lg" mt={-3} mx={2}>
                                    <MDBox
                                        component="img"
                                        src={event.eventFile}
                                        alt={event.eventName}
                                        borderRadius="lg"
                                        shadow="md"
                                        width="100%"
                                        height="100%"
                                        position="relative"
                                        zIndex={1}
                                    />
                                    <MDBox
                                        borderRadius="lg"
                                        shadow="md"
                                        width="100%"
                                        height="100%"
                                        position="absolute"
                                        left={0}
                                        top="3%"
                                        sx={{
                                            backgroundImage: `url(${event.eventFile})`,
                                            transform: "scale(0.94)",
                                            filter: "blur(12px)",
                                            backgroundSize: "cover",
                                        }}
                                    />
                                </MDBox>
                                <MDBox p={3}>
                                    <MDTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
                                        {event.eventName}
                                    </MDTypography>
                                    <Divider />
                                    <MDTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="bold">
                                        {event.eventCommittee}
                                    </MDTypography>
                                    <MDBox mt={2} mb={3}>
                                        <MDTypography variant="body2" component="p" color="text">
                                            {event.eventDescription.substring(0, 150) + "..."}
                                        </MDTypography>
                                    </MDBox>

                                    <MDBox display="flex" alignItems="center">
                                        <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                            <Icon fontSize="medium" color="dark">place</Icon>
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="light">
                                            {event.eventVenue}
                                        </MDTypography>

                                        <MDTypography ml={5} variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                            <Icon fontSize="medium" color="dark">phone</Icon>
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="light">
                                            {event.eventContact}
                                        </MDTypography>
                                    </MDBox>

                                    <MDBox display="flex" alignItems="center">
                                        <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                            <Icon fontSize="medium" color="dark">event</Icon>
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="light">
                                            {event.eventDate}
                                        </MDTypography>

                                        <MDTypography ml={5} variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                            <Icon fontSize="medium" color="dark">schedule</Icon>
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="light">
                                            {event.eventStartTime} to {event.eventEndTime}
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox display="flex" alignItems="center">
                                            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                                <Icon fontSize="medium" color="primary">place</Icon>
                                            </MDTypography>

                                            {
                                                event.eventStatus === "Pending" ?
                                                    <MDTypography variant="button" color="info" fontWeight="light">
                                                        Status - <strong>Pending</strong>
                                                    </MDTypography> :
                                                    event.eventStatus === "Rejected" ?
                                                        <MDTypography variant="button" color="warning" fontWeight="light">
                                                            Status - <strong>Rejected</strong>
                                                        </MDTypography>
                                                        : <MDTypography variant="button" color="success" fontWeight="light">
                                                            Status - <strong>Accepted</strong>
                                                        </MDTypography>
                                            }
                                    </MDBox>
                                    { // Accepted Rejected Pending
                                            event.eventStatus === "Pending" ?
                                                // <MDBox display="flex" alignItems="center">
                                                //     <MDBox p={2}>
                                                //         <MDInput required fullWidth name="enter-coins" label="Give coins" type="number" onChange={handleCoinTextBoxChangeEvent} />
                                                //     </MDBox>

                                                // </MDBox>
                                                // : null
                                                <>
                                                    <MDBox p={2}>
                                                        <MDButton fullWidth color="info" onClick={() => handleAcceptSubmit(event._id)} >
                                                            Accept
                                                        </MDButton>
                                                    </MDBox>

                                                    <MDBox p={2}>
                                                        <MDButton fullWidth color="warning" onClick={() => handleRejectSubmit(event._id)} >
                                                            Reject
                                                        </MDButton>
                                                    </MDBox>


                                                </>
                                                : null
                                        }
                                    {/* <MDBox display="flex" alignItems="center">

                                    </MDBox> */}

                                </MDBox>
                            </Card>


                        </MDBox>
                    </Grid>
                ))}


            </Grid>
        </MDBox>
    );
}


export default EventsCardGrid;
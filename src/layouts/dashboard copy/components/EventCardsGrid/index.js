import { useState, useEffect } from "react";
import { GetAllEventDetails } from "api/api";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
// import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Divider, Icon } from "@mui/material";

function EventsCardGrid() {

    const [allEvents, setAllEvents] = useState([]);
    var my_committee_email = JSON.parse(localStorage.getItem("committee")).committee_email;

    useEffect(async () => {
        const fetchEvents = await GetAllEventDetails();

        console.log(fetchEvents)
        var my_events = [];
        fetchEvents.data.allevents.forEach(function (r) {
            console.log(r.eventCommittee)
            
            console.log(my_committee_email)
            if(r.eventCommittee == my_committee_email){
                my_events.push(r);
            }
        });
        console.log(my_events)

        setAllEvents(my_events);
    }, []);

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
                                    

                                    <MDBox  mb={2} display="flex" alignItems="center">
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
                                    <MDBox mt={2} mb={2} display="flex" alignItems="center">
                                        <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                                <Icon fontSize="medium" color="primary">square</Icon>
                                        </MDTypography>
                                        <MDTypography variant="button" color="warning" fontWeight="light">
                                            Status - <strong>{event.eventStatus}</strong>
                                        </MDTypography>
                                    </MDBox>
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
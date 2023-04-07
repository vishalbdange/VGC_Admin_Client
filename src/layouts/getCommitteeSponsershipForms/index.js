import React from "react";
import { GetAdvertisements } from "api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { default: Committee_DashboardLayout } = require("examples/LayoutContainers/Committee_DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Button, Divider, Icon, Modal } from "@mui/material";
import MDInput from "components/MDInput";
import { Box } from "@mui/system";
import MDButton from "components/MDButton";
import { UpdateAdminSponsershipFormById } from "api/api";
import {GetSponserships} from "api/api"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};



function GetCommitteeSponsershipForms() {

    const [sponserhips, setSponserships] = useState([]);

    const [open, setOpen] = React.useState(false);

    const [coins, setCoins] = useState(0);
    const [id, setId] = useState("");
 

    const handleOpen = (_id) => {
        setId(_id);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    var my_committee_email = JSON.parse(localStorage.getItem("committee")).committee_email;

    useEffect(async () => {
        const result = await GetSponserships();
        var my_ads = [];
        result.data.forEach(function (r) {
            console.log(r.sponser_committee_email)
            
            console.log(my_committee_email)
            if(r.sponser_committee_email === my_committee_email){
                my_ads.push(r);
            }
        });

        
        if (result.status === 200) {
           
            setSponserships(my_ads);
        } else {
            console.log("Error");
            toast.warning("Oops! Something went wrong.");
        }

    }, []);


    return (
        <Committee_DashboardLayout>
            <DashboardNavbar />
            {/* {JSON.stringify(studentApplications)} */}

            <MDBox mt={4.5}>
                <MDTypography mb={8} variant="h4" fontWeight="medium" textTransform="capitalize">
                    All Sponsership Forms
                </MDTypography>
                <Grid container spacing={3}>
                    {sponserhips.map((application, index) => (

                        <Grid key={index} item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <Card>
                                    <MDBox p={3}>
                                        <MDTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
                                            {application.sponserName}
                                        </MDTypography><br />
                                        <MDTypography display="inline" variant="h6" textTransform="capitalize" fontWeight="bold">
                                            Committee Email - {application.sponser_committee_email}
                                        </MDTypography>

                                        <Divider />
                                        
                                        <MDBox mt={2} mb={3}>
                                            <MDTypography variant="body2" component="p" color="text">
                                                <strong>Description</strong> <br />
                                                {application.sponserDescription}
                                            </MDTypography>
                                        </MDBox>

                                        <MDBox display="flex" alignItems="center">
                                            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                                <Icon fontSize="medium" color="primary">place</Icon>
                                            </MDTypography>

                                            {
                                                application.sponsershipStatus === "Pending" ?
                                                    <MDTypography variant="button" color="info" fontWeight="light">
                                                        Status - <strong>Pending</strong>
                                                    </MDTypography> :
                                                    application.sponsershipStatus === "Rejected" ?
                                                        <MDTypography variant="button" color="warning" fontWeight="light">
                                                            Status - <strong>Rejected</strong>
                                                        </MDTypography>
                                                        : <MDTypography variant="button" color="success" fontWeight="light">
                                                            Status - <strong>Accepted</strong>
                                                        </MDTypography>
                                            }
                                        </MDBox>



                                       
                                    </MDBox>
                                </Card>


                            </MDBox>
                        </Grid>
                    ))
                    }


                </Grid >
            </MDBox >
        </Committee_DashboardLayout >
    );
}

export default GetCommitteeSponsershipForms;
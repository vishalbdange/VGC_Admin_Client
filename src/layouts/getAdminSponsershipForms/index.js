import React from "react";
import { GetAdvertisements } from "api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
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



function GetAdminSponsershipForms() {

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


    const handleAcceptSubmit = async (_id,_sponserAmount) => {

        const result = await UpdateAdminSponsershipFormById({
            id: _id,
            sponserAmount:_sponserAmount,
            sponsershipStatus: "Accepted"
        });
        if (result.status === 200) {
            toast.info("Application Approved successfully");
        } 
        window.location.reload()
        
    }
    const handleRejectSubmit = async (_id) => {
        const result = await UpdateAdminSponsershipFormById({
            id: _id,
            sponserAmount:sponserAmount,
            sponsershipStatus: "Rejected"
        });
        if (result.status === 200) {
            toast.info("Application rejected successfully");
        } 
        window.location.reload()
    }
  
    useEffect(async () => {
        const result = await GetSponserships();

        if (result.status === 200) {
           
            setSponserships(result.data);
        } else {
            console.log("Error");
            toast.warning("Oops! Something went wrong.");
        }

    }, []);


    return (
        <DashboardLayout>
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
                                    <MDBox p={2}>
                                        <MDTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
                                            {application.sponserName}
                                        </MDTypography><br />
                                        <MDTypography variant="body2" display="inline"  color="text"  component="p">
                                        <strong>Committee : </strong> {application.sponser_committee_email}
                                        </MDTypography>

                                        
                                        <MDBox mt={2} >
                                            <MDTypography variant="body2" component="p" color="text">
                                                <strong>Amount : </strong> 
                                                Rs.{application.sponserAmount}
                                            </MDTypography>
                                        </MDBox>
                                        
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



                                        { // Accepted Rejected Pending
                                            application.sponsershipStatus === "Pending" ?
                                                // <MDBox display="flex" alignItems="center">
                                                //     <MDBox p={2}>
                                                //         <MDInput required fullWidth name="enter-coins" label="Give coins" type="number" onChange={handleCoinTextBoxChangeEvent} />
                                                //     </MDBox>

                                                // </MDBox>
                                                // : null
                                                <>
                                                    <MDBox p={2}>
                                                        <MDButton fullWidth color="info" onClick={() => handleAcceptSubmit(application._id,application.sponserAmount)} >
                                                            Accept  
                                                        </MDButton>
                                                    </MDBox>

                                                    <MDBox p={2}>
                                                        <MDButton fullWidth color="warning" onClick={() => handleRejectSubmit(application._id)} >
                                                            Reject
                                                        </MDButton>
                                                    </MDBox>


                                                </>
                                                : null
                                        }

                                    </MDBox>
                                </Card>


                            </MDBox>
                        </Grid>
                    ))
                    }


                </Grid >
            </MDBox >
        </DashboardLayout >
    );
}

export default GetAdminSponsershipForms;
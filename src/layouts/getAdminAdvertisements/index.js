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
import { UpdateAdminAdvertisementById } from "api/api";


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



function GetAdminAdvertisements() {

    const [advertisements, setAdvertisements] = useState([]);

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


    const handleAcceptSubmit = async (_id) => {

        const result = await UpdateAdminAdvertisementById({
            id: _id,
            advertisementStatus: "Accepted"
        });
        if (result.status === 200) {
            toast.info("Advertisement Approved successfully");
        } 
        window.location.reload()
        
    }
    const handleRejectSubmit = async (_id) => {
        const result = await UpdateAdminAdvertisementById({
            id: _id,
            advertisementStatus: "Rejected"
        });
        if (result.status === 200) {
            toast.info("Application rejected successfully");
        } 
        window.location.reload()
    }
   

    var isUriImage = function (uri) {
        //make sure we remove any nasty GET params 
        uri = uri.split('?')[0];
        //moving on, split the uri into parts that had dots before them
        var parts = uri.split('.');
        //get the last part ( should be the extension )
        var extension = parts[parts.length - 1];
        //define some image types to test against
        var imageTypes = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp'];
        //check if the extension matches anything in the list.
        if (imageTypes.indexOf(extension) !== -1) {
            return true;
        }
        return false;
    }


    useEffect(async () => {
        const result = await GetAdvertisements();

        if (result.status === 200) {
            result.data.map((application) => {
                if (isUriImage(application.advertisementImageLink)) {
                    application.isUriImage = true;
                } else {
                    application.isUriImage = false;
                }
            })
            setAdvertisements(result.data);
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
                    All Advertisements
                </MDTypography>
                <Grid container spacing={3}>
                    {advertisements.map((application, index) => (

                        <Grid key={index} item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <Card>
                                    <MDBox position="relative" borderRadius="lg" mt={-3} mx={2}>
                                        <MDBox
                                            component="img"
                                            src={application.advertisementImageLink}
                                            alt={application.advertisementName}
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
                                                backgroundImage: `url(${application.advertisementImageLink})`,
                                                transform: "scale(0.94)",
                                                filter: "blur(12px)",
                                                backgroundSize: "cover",
                                            }}
                                        />
                                    </MDBox>
                                    <MDBox p={3}>
                                        <MDTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
                                            {application.advertisementName}
                                        </MDTypography><br />
                                        <MDTypography display="inline" variant="h6" textTransform="capitalize" fontWeight="bold">
                                            Committee Email - {application.advertisement_committee_email}
                                        </MDTypography>

                                        <Divider />
                                        
                                        <MDBox mt={2} mb={3}>
                                            <MDTypography variant="body2" component="p" color="text">
                                                <strong>Description</strong> <br />
                                                {application.advertisementDescription}
                                            </MDTypography>
                                        </MDBox>

                                        <MDBox display="flex" alignItems="center">
                                            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                                <Icon fontSize="medium" color="primary">place</Icon>
                                            </MDTypography>

                                            {
                                                application.advertisementStatus === "Pending" ?
                                                    <MDTypography variant="button" color="info" fontWeight="light">
                                                        Status - <strong>Pending</strong>
                                                    </MDTypography> :
                                                    application.advertisementStatus === "Rejected" ?
                                                        <MDTypography variant="button" color="warning" fontWeight="light">
                                                            Status - <strong>Rejected</strong>
                                                        </MDTypography>
                                                        : <MDTypography variant="button" color="success" fontWeight="light">
                                                            Status - <strong>Accepted</strong>
                                                        </MDTypography>
                                            }



                                        </MDBox>



                                        { // Accepted Rejected Pending
                                            application.advertisementStatus === "Pending" ?
                                                // <MDBox display="flex" alignItems="center">
                                                //     <MDBox p={2}>
                                                //         <MDInput required fullWidth name="enter-coins" label="Give coins" type="number" onChange={handleCoinTextBoxChangeEvent} />
                                                //     </MDBox>

                                                // </MDBox>
                                                // : null
                                                <>
                                                    <MDBox p={2}>
                                                        <MDButton fullWidth color="info" onClick={() => handleAcceptSubmit(application._id)} >
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

export default GetAdminAdvertisements;
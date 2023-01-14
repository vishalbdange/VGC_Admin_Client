import React from "react";
import { GetStudentApplicationsDetails } from "api/api";
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
import { RejectApplicationByStudentId } from "api/api";
import { UpdateCoinsByStudentId } from "api/api";


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



function GetStudentApplications() {

    const [studentApplications, setStudentApplications] = useState([]);

    const [open, setOpen] = React.useState(false);

    const [coins, setCoins] = useState(0);
    const [id, setId] = useState("");

    const handleCoinsChange = (e) => {
        setCoins(e.target.value);
    }

    const handleOpen = (_id) => {
        setId(_id);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleCoinsSubmit = async (e) => {
        if (coins == 0) {
            toast.info("Coins cannot be 0");
            return;
        }
        const result = await UpdateCoinsByStudentId({
            id: id,
            studentApplicationStatus: "Approved",
            studentApplicationIssuedCoins: coins
        });
        if (result.status === 200) {
            toast.info("Coins updated successfully");
            setOpen(false);
        }
        else {
            toast.info("Coins updation failed! Please try again later.");
        }
    }

    const handleRejectSubmit = async (_id) => {
        const result = await RejectApplicationByStudentId({
            id: _id,
            studentApplicationStatus: "Rejected",
            studentApplicationIssuedCoins: 0
        });
        if (result.status === 200) {
            toast.info("Application rejected successfully");
            setOpen(false);
        }
        else {
            toast.info("Coins updation failed! Please try again later.");
        }
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
        const result = await GetStudentApplicationsDetails();

        if (result.status === 200) {
            result.data.map((application) => {
                if (isUriImage(application.studentApplicationFile)) {
                    application.isUriImage = true;
                } else {
                    application.isUriImage = false;
                }
            })
            setStudentApplications(result.data);
        } else {
            console.log("Error");
            toast.warning("Oops! Something went wrong.");
        }

    }, []);


    return (
        <DashboardLayout>
            <DashboardNavbar />
            {/* {JSON.stringify(studentApplications)} */}
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <MDBox sx={{ ...style }}>
                    <MDTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="bold">
                        Isue New Coins
                    </MDTypography>
                    <MDBox p={2}>
                        <MDInput required fullWidth name="giveCoins" value={coins} label="Enter no. of coins" type="number" onChange={handleCoinsChange} />
                    </MDBox>
                    <MDBox display="flex" alignItems="center">
                        <MDButton color="dark" onClick={handleClose}>Cancel</MDButton>
                        <MDButton color="success" onClick={handleCoinsSubmit}>Give Coins</MDButton>
                    </MDBox>
                </MDBox>
            </Modal>

            <MDBox mt={4.5}>
                <MDTypography mb={8} variant="h4" fontWeight="medium" textTransform="capitalize">
                    Applications submitted by Students
                </MDTypography>
                <Grid container spacing={3}>
                    {studentApplications.map((application, index) => (

                        <Grid key={index} item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <Card>
                                    <MDBox position="relative" borderRadius="lg" mt={-3} mx={2}>
                                        <MDBox
                                            component="img"
                                            src={application.studentApplicationFile}
                                            alt={application.studentApplicationName}
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
                                                backgroundImage: `url(${application.studentApplicationFile})`,
                                                transform: "scale(0.94)",
                                                filter: "blur(12px)",
                                                backgroundSize: "cover",
                                            }}
                                        />
                                    </MDBox>
                                    <MDBox p={3}>
                                        <MDTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
                                            {application.studentApplicationName}
                                        </MDTypography><br />
                                        <MDTypography display="inline" variant="h6" textTransform="capitalize" fontWeight="bold">
                                            Applicant - {application.studentApplicationCollegeId}
                                        </MDTypography>

                                        <Divider />
                                        {application.studentApplicationIssuedCoins !== 0 ?
                                            <>
                                                <MDBox display="flex" alignItems="center">
                                                    <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                                        <MDAvatar src="https://i.imgur.com/JaBRMua.png" alt="Avatar" />
                                                    </MDTypography>
                                                    <MDTypography variant="h3" color="text" fontWeight="bold">
                                                        {application.studentApplicationIssuedCoins}
                                                    </MDTypography>
                                                </MDBox>
                                                <Divider />
                                            </> : null}

                                        <MDTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="bold">
                                            Organiser - {application.studentApplicationOrganizer}
                                        </MDTypography>
                                        <MDBox mt={2} mb={3}>
                                            <MDTypography variant="body2" component="p" color="text">
                                                <strong>Description</strong> <br />
                                                {application.studentApplicationDescription}
                                            </MDTypography>
                                        </MDBox>

                                        <MDBox display="flex" alignItems="center">
                                            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                                <Icon fontSize="medium" color="primary">place</Icon>
                                            </MDTypography>

                                            {
                                                application.studentApplicationStatus === "Pending" ?
                                                    <MDTypography variant="button" color="info" fontWeight="light">
                                                        Status - <strong>Pending</strong>
                                                    </MDTypography> :
                                                    application.studentApplicationStatus === "Rejected" ?
                                                        <MDTypography variant="button" color="warning" fontWeight="light">
                                                            Status - <strong>Rejected</strong>
                                                        </MDTypography>
                                                        : <MDTypography variant="button" color="success" fontWeight="light">
                                                            Status - <strong>Accepted</strong>
                                                        </MDTypography>
                                            }



                                        </MDBox>
                                        <MDBox display="flex" alignItems="center">
                                            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                                <Icon fontSize="medium" color="info">category</Icon>
                                            </MDTypography>
                                            <MDTypography variant="button" color="text" fontWeight="light">
                                                {application.studentApplicationCategory}
                                            </MDTypography>
                                        </MDBox>

                                        <MDBox display="flex" alignItems="center">
                                            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                                                <Icon fontSize="medium" color="info">schedule</Icon>
                                            </MDTypography>
                                            <MDTypography variant="button" color="text" fontWeight="light">
                                                {application.studentApplicationDate}
                                            </MDTypography>
                                        </MDBox>

                                        { // Accepted Rejected Pending
                                            application.studentApplicationStatus === "Pending" ?
                                                // <MDBox display="flex" alignItems="center">
                                                //     <MDBox p={2}>
                                                //         <MDInput required fullWidth name="enter-coins" label="Give coins" type="number" onChange={handleCoinTextBoxChangeEvent} />
                                                //     </MDBox>

                                                // </MDBox>
                                                // : null
                                                <>
                                                    <MDBox p={2}>
                                                        <MDButton fullWidth color="info" onClick={() => handleOpen(application._id)} >
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

export default GetStudentApplications;
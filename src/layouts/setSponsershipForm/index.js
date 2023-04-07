import { useState } from "react";
// import fs from 'fs'
// Material Dashboard 2 React examples
import Committee_DashboardLayout from "examples/LayoutContainers/Committee_DashboardLayout";
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
import { useNavigate } from "react-router-dom";
import { submitSponsershipForm } from "api/api";

function SetSponsershipForm() {
    const navigate = useNavigate();
    const comm_email  = (JSON.parse(localStorage.getItem("committee"))).committee_email

    const [adData, setAdData] = useState({
        sponserName: '',
        sponserDescription: '',
        sponserAmount: 0,
        sponsershipStatus:"Pending",
        sponser_committee_email : comm_email
    });

    const handleChange = (target) => {
        if (target.name == "file") {
            // File size should be less than 3 MB
            if (target.files[0].size > 3145728) {
                toast.info("File size should be less than 3 MB");
                setAdData({ ...adData, file: "" })
                target.value = ""
                return
            } else if (target.files[0].type != "image/jpeg" && target.files[0].type != "image/png") {
                toast.info("File type should be either jpeg or png");
                setAdData({ ...adData, file: "" })
                target.value = ""
                return
            }
        }
        setAdData({ ...adData, [target.name]: target.name == "file" ? target.files[0] : target.value.toString() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.info("Sponsership data submitted", adData);

        const result = await submitSponsershipForm(adData);

        if (result.status == 200) {
            toast.info("Sponsership data submitted successfully");
            navigate("/committee-dashboard", { replace: true });
        } else {
            toast.warning("Something went wrong");
        }
    }

    return (
        <Committee_DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={6} mb={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={8}>
                        <Card>
                            <form onSubmit={handleSubmit} >
                                <MDBox p={2}>
                                    <MDTypography variant="h5">Sponsership form</MDTypography>
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="sponserName" label="Sponser Name" type="text" value={adData.sponserName} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="sponserDescription" label="Sponser Description" value={adData.sponserDescription} type="text" multiline rows={5} onChange={(e) => handleChange(e.target)} />
                                </MDBox>
                                <MDBox p={2}>
                                    <MDInput required fullWidth name="sponserAmount" label="Amount" type="number" value={adData.sponserAmount} onChange={(e) => handleChange(e.target)} />
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
        </Committee_DashboardLayout>
    )

}
export default SetSponsershipForm;
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import axios from 'axios'

import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

//toast
import { toast } from "react-toastify";


function Basic() {
  // const [rememberMe, setRememberMe] = useState(false);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate()
  const [signInData, setSignInData] = useState({
    committee_email: '',
    committee_password: ''
  });

  const handleChange = (target) => {

    setSignInData({ ...signInData, [target.name]: target.value })
    console.log(signInData)
  }
  const handleSubmit = async() => {
    if(signInData.committee_email== '' || signInData.committee_password == '' ) {
      toast.info("All fields are compulsory !")
    }
    try{
      const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/committee/login',
        data: signInData, // you are sending body instead
        headers: {
        'Content-Type': 'application/json'
        }, 
      })
      console.log(result)
     if(result.status == 200){
        toast.info("Logging in...")
        localStorage.setItem("committee",JSON.stringify(signInData))
        navigate("/committee-dashboard")  
     }else{
  
        toast.info(result.message)
     }
      
        
    }catch(e){
      console.log(e)
      toast.info("Invalid Credentials , Kindly Login Again")
    }
   
   
  }

  return (
    <BasicLayout image={bgImage}>
      <Card mt={5}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Commitee Login
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="username" label="Committee Email" name="committee_email" variant="standard" fullWidth onChange={(e) => handleChange(e.target)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="committee_password" variant="standard" fullWidth onChange={(e) => handleChange(e.target)} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                 Login
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;

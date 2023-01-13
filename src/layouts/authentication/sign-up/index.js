


import {useState} from 'react'
import axios from 'axios'

import { Routes, Route, Navigate, useLocation ,useNavigate} from "react-router-dom"

// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {

  const navigate = useNavigate()
  const [signInData,setSignInData] = useState({
    username : '',
    password : ''
  });

  const handleChange = (target) => {

    setSignInData({ ...signInData, [target.name]: target.value })
    console.log(signInData)
  }
  const handleSubmit = () =>{
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5000/signin',
      //   data: signInData, // you are sending body instead
      //   headers: {
      //   'Content-Type': 'application/json'
      //   }, 
      // })
    if(signInData.username == "admin123" && signInData.password == "654321"){
        navigate("/dashboard")
    }
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Admin Login
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your Username and Password  to Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="username" label="Username" name="username" variant="standard" fullWidth onChange={(e) => handleChange(e.target)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="password" variant="standard" fullWidth onChange={(e) => handleChange(e.target)} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign In
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;

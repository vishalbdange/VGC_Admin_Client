


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

//toast
import { toast } from "react-toastify";

function Cover() {

  const navigate = useNavigate()
  const [registerData,setRegisterData] = useState({
    committee_name : '',
    committee_type:'',
    committee_email:'',
    password : '',
    confirm_password:''
  });

  const handleChange = (target) => {

    setRegisterData({ ...registerData, [target.name]: target.value })
    console.log(registerData)
  }
  const handleSubmit = () =>{

     if(registerData.committee_name === '' || registerData.committee_type === '' || registerData.password === '' || registerData.confirm_password === '' || registerData.committee_email === '') {
        toast.info("All fields are compulsory !")
     }
     else if(registerData.password != registerData.confirm_password){
        toast.info("Passwords are not matching !")
     }else {
        axios({
          method: 'post',
          url: 'https://vgc-server.onrender.com/committee/signup/',
          data: registerData, // you are sending body instead
          headers: {
          'Content-Type': 'application/json'
          }, 
        }) 
      
        navigate("/committee-auth/login")
     }
     
    // if(signInData.username == "admin123" && signInData.password == "654321"){
      // navigate("/committee-dashboard")
    // }
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
            Commitee Registration
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Please fill following details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Committee Name" name="committee_name" variant="standard" placeholder="Committee Name" fullWidth onChange={(e) => handleChange(e.target)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Committee Type" name="committee_type" variant="standard" placeholder="Technical/Cultural/Sports/..." fullWidth onChange={(e) => handleChange(e.target)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Committee Email" name="committee_email" variant="standard" placeholder="Committee Email" fullWidth onChange={(e) => handleChange(e.target)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="password" variant="standard" fullWidth onChange={(e) => handleChange(e.target)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Confirm Password" name="confirm_password" variant="standard" fullWidth onChange={(e) => handleChange(e.target)} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                 Register
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;

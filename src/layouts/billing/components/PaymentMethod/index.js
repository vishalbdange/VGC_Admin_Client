// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useEffect } from "react";
import { FlushCanteenCoinsByPayment } from "api/api";
import { toast } from "react-toastify";
import { FlushStationeryCoinsByPayment } from "api/api";

function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleFlushCanteenCoins = async () => {
    console.log("PaymentMethod");
    const result = await FlushCanteenCoinsByPayment();
    if (result.status === 200) {
      console.log("PaymentMethod", result);
      toast.success("Paid to Canteen successfully.");
    }
    else {
      console.log("PaymentMethod", result);
      toast.warning("Oops! Something went wrong.");
    }
  }

  const handleFlushStationeryCoins = async () => {
    console.log("PaymentMethod");
    const result = await FlushStationeryCoinsByPayment();
    if (result.status === 200) {
      console.log("PaymentMethod", result);
      toast.success("Paid to Stationery Shop successfully.");
    }
    else {
      console.log("PaymentMethod", result);
      toast.warning("Oops! Something went wrong.");
    }
  }

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Payment Method
        </MDTypography>
        {/* <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new card
        </MDButton> */}
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox component="img" src={masterCardLogo} alt="master card" width="10%" mr={2} />
              <MDTypography variant="h6" fontWeight="medium">
                Canteen <br />
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <MDButton variant="gradient" color="info" onClick={handleFlushCanteenCoins}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp; Pay
                </MDButton>
                {/* <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip> */}
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox component="img" src={visaLogo} alt="master card" width="10%" mr={2} />
              <MDTypography variant="h6" fontWeight="medium">
                Stationery <br />
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <MDButton variant="gradient" color="info" onClick={handleFlushStationeryCoins}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp; Pay
                </MDButton>
                {/* <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip> */}
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;

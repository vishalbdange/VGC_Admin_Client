import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import EventsCardGrid from "./components/EventCardsGrid";
import { GetCoinSupplyRedeemedAmount } from "api/api";
import { toast } from "react-toastify";


function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [totalSupply, setTotalSupply] = useState(0);
  const [totalRedeem, setTotalRedeem] = useState(0);


  useEffect(async () => {
    const result = await GetCoinSupplyRedeemedAmount();

    if (result.status === 200) {
      console.log("Success");
      setTotalSupply(result.data.supply.value);
      setTotalRedeem(result.data.redeemed.value);
    } else {
      console.log("Error");
      toast.warning("Oops! Something went wrong.");
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="token"
                title=<strong>Total Coins Distributed</strong>
                count={totalSupply}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title=<strong>Total Redeemed Coins</strong>
                count={totalRedeem}
                percentage={{
                  color: "warning",
                  amount: "-20%",
                  label: "of total issued coins",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="token"
                title=<strong>Total Coins in Circulation</strong>
                count={totalSupply - totalRedeem}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="person_add"
                title=<strong>Revenue</strong>
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+15%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>

        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Weekly Coins Issued"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="Monthly Redeemed Coins"
                  description={
                    <>
                      Monthwise redeeming statistics
                    </>
                  }
                  date="updated yesterday"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Incoming Investments"
                  description="Per month statistics"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <EventsCardGrid />

        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard//Sales';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';

import {
  getAds,
  countAds,
  countFeatureAdsRequests,
  countFeatureAds,
  adsStats
} from '../Connection/Ads';
import { getUsers } from '../Connection/Users';

const Dashboard = () => {
  const [ads, setAds] = useState();
  const [users, setUsers] = useState();
  const [featureAds, setFeatureAds] = useState();
  const [featureAdsRequests, setFeatureAdsRequests] = useState();
  const [stats, setStats] = useState();
  useEffect(() => {
    const fetchAds = async () => {
      let foundAds = await countAds();
      console.log(foundAds);
      setAds(foundAds.data.ads);
    };

    const fetchFeatureAds = async () => {
      let foundAds = await countFeatureAds();
      console.log(foundAds);
      setFeatureAds(foundAds.data.ads);
    };

    const fetchFeatureAdsRequests = async () => {
      let foundAds = await countFeatureAdsRequests();
      console.log(foundAds);
      setFeatureAdsRequests(foundAds.data.ads);
    };

    const fetchAdsStats = async () => {
      let res = await adsStats();
      console.log(res);
      setStats(res.data.stats);
    };

    const fetchUsers = async () => {
      let res = await getUsers();
      console.log(res);
      setUsers(res.data.users);
    };
    fetchAdsStats();
    fetchFeatureAdsRequests();
    fetchFeatureAds();
    fetchUsers();
    fetchAds();
  }, []);
  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              {ads && <Budget data={ads} />}
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              {users && <TotalCustomers data={users.length} />}
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              {featureAdsRequests && (
                <TasksProgress data={featureAdsRequests} />
              )}
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              {featureAds && (
                <TotalProfit sx={{ height: '100%' }} data={featureAds} />
              )}
            </Grid>
            {/* <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid> */}
            <Grid item lg={6} md={6} xl={6} xs={12}>
              {stats && (
                <TrafficByDevice
                  sx={{ height: '100%' }}
                  data={{
                    value1: stats.activeAds,
                    value2: stats.totalAds - stats.activeAds
                  }}
                  titles={{ title1: 'Active Ads', title2: 'Non Active Ads' }}
                  heading="Chart of Active/Non Active Ads"
                />
              )}
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              {stats && (
                <TrafficByDevice
                  sx={{ height: '100%' }}
                  data={{
                    value1: stats.approvedAds,
                    value2: stats.rejectedAds
                  }}
                  titles={{ title1: 'Approved Ads', title2: 'Rejected Ads' }}
                  heading="Chart of Approved/Rejected Ads"
                />
              )}
            </Grid>

            {/* <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;

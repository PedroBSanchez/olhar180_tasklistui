import React from "react";

import { AppBar, Grid } from "@mui/material";

import olhar180Logo from "../../assets/olhar180Logo.png";

import { HeaderWrapper, LogoHeader } from "../../styles/styles";
import App from "../../App";

const AppHeader = () => {
  return (
    <AppBar position="static">
      <HeaderWrapper>
        <Grid container>
          <Grid item sm={4} paddingTop={2} paddingLeft={3}>
            <LogoHeader src={olhar180Logo} width={70} />
          </Grid>
        </Grid>
      </HeaderWrapper>
    </AppBar>
  );
};

export default AppHeader;

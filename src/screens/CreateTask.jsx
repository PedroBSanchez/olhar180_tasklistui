import React from "react";
import AppHeader from "../components/header/AppHeader";
import { Container, Grid } from "@mui/material";
import { DefaultTitle } from "../styles/styles";

const CreateTask = () => {
  return (
    <>
      <AppHeader />
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          justifyItems="center"
          marginTop={2}
        >
          <Grid item>
            <DefaultTitle>Task List</DefaultTitle>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateTask;

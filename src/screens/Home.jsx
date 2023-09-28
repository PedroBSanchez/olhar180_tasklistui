import React, { useState } from "react";
import AppHeader from "../components/header/AppHeader";
import { Button, Container, Grid, Typography } from "@mui/material";
import { DefaultTitle } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "../config/axiosConfig";
import TasksTable from "../components/tasksTable/TasksTable";
import Loading from "../components/loading/Loading";
import swal from "sweetalert2";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const handleNavigate = (url) => {
    navigate(url);
  };

  const getTasks = async () => {
    setLoading(true);
    await axios
      .get("/tasks")
      .then((response) => {
        setLoading(false);
        setTasks(response.data);
      })
      .catch((error) => {
        setLoading(false);
        swal.fire({
          title: "Erro ao carregar lista de tarefas",
          icon: "error",
        });
        console.log(error);
      });
  };

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
            <DefaultTitle>Lista de Tarefas</DefaultTitle>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item marginLeft={5} marginTop={3}>
            <Button
              color="success"
              variant="contained"
              endIcon={<AddBoxIcon />}
              onClick={() => {
                handleNavigate("cadastro");
              }}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          marginTop={5}
          justifyContent={"center"}
          justifyItems={"center"}
        >
          <Grid item md={10} sm={12}>
            <TasksTable tasks={tasks} getTasks={getTasks} />
          </Grid>
        </Grid>
      </Container>
      <Loading show={loading} />
    </>
  );
};

export default Home;

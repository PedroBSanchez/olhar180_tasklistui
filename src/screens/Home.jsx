import React, { useEffect, useState } from "react";
import AppHeader from "../components/header/AppHeader";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { DefaultTitle } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "../config/axiosConfig";
import TasksTable from "../components/tasksTable/TasksTable";
import Loading from "../components/loading/Loading";
import swal from "sweetalert2";
import { verifyToken } from "../shared/verifyToken";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [searchTask, setSearchTask] = useState("");

  const [priorities, setPriorities] = useState([
    { title: "BAIXA", value: "BAIXA" },
    { title: "MÉDIA", value: "MEDIA" },
    { title: "ALTA", value: "ALTA" },
  ]);
  const [searchPriority, setSearchPriority] = useState("");

  const handleNavigate = (url) => {
    navigate(url);
  };

  const getTasks = async () => {
    setLoading(true);
    await axios
      .get(`/tasks?title=${searchTask}&priority=${searchPriority}`)
      .then((response) => {
        setLoading(false);
        setTasks(response.data);
      })
      .catch((error) => {
        setLoading(false);
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
                handleNavigate("/cadastro");
              }}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          spacing={2}
          marginLeft={3}
          marginTop={2}
        >
          <Grid item md={2} sm={4}>
            <TextField
              label="Título"
              value={searchTask}
              onChange={(e) => {
                setSearchTask(e.target.value);
              }}
            />
          </Grid>
          <Grid item md={2} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Prioridade</InputLabel>
              <Select
                value={searchPriority}
                onChange={(e) => {
                  setSearchPriority(e.target.value);
                }}
              >
                <MenuItem value={""}>Nenhuma</MenuItem>
                {priorities.map((priorityElement, index) => {
                  return (
                    <MenuItem key={index} value={priorityElement.value}>
                      {priorityElement.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2} sm={4}>
            <IconButton onClick={getTasks}>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          marginTop={5}
          justifyContent={"center"}
          justifyItems={"center"}
        >
          <Grid item md={10} sm={12} paddingBottom={2}>
            <TasksTable tasks={tasks} getTasks={getTasks} />
          </Grid>
        </Grid>
      </Container>
      <Loading show={loading} />
    </>
  );
};

export default Home;

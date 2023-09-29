import React, { useEffect, useRef, useState } from "react";
import AppHeader from "../components/header/AppHeader";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CardActions,
  Button,
  NativeSelect,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DefaultSubTitle, DefaultTitle } from "../styles/styles";

import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../config/axiosConfig";
import Loading from "../components/loading/Loading";

const EditTask = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const [newTaskConclusionDate, setNewTaskConclusionDate] = useState();
  const [newTaskPriority, setNewTaskPriority] = useState();
  const [defaultPriority, setDefaultPriority] = useState();

  const [priorities, setPriorities] = useState(["BAIXA", "MÉDIA", "ALTA"]);

  const handleCreateNewTask = async () => {
    if (
      !validateFields(
        newTaskTitle,
        newTaskDescription,
        newTaskPriority,
        newTaskConclusionDate
      )
    ) {
      return Swal.fire({ title: "Campos inválidos", icon: "warning" });
    }

    let dateFormated = new Date(newTaskConclusionDate);
    dateFormated.setHours(dateFormated.getHours() - 3);

    const options = {
      url: `/tasks/${id}`,
      method: "PUT",
      data: {
        title: newTaskTitle,
        description: newTaskDescription,
        priority: newTaskPriority,
        conclusionDate: dateFormated,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        setIsValid(false);
        Swal.fire({ title: "Tarefa Editada com sucesso", icon: "success" });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({ title: "Falha ao editar tarefa", icon: "error" });
      });
  };

  const validateFields = (title, description, priority, date) => {
    if (!title || !description || !priority || !date) {
      setIsValid(false);

      return false;
    }

    setIsValid(true);
    return true;
  };

  const findTask = async () => {
    setLoading(true);
    await axios
      .get(`/tasks/${id}`)
      .then((response) => {
        setLoading(false);
        setNewTaskTitle(response.data.title);
        setNewTaskDescription(response.data.description);
        setNewTaskPriority(response.data.priority);
        setDefaultPriority(response.data.priority);
        let date = new Date(response.data.conclusionDate);

        setNewTaskConclusionDate(formatDateForInput(date));
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({ title: "Tarefa não encontrada", icon: "error" });
        navigate("/");
      });
  };

  const formatDateForInput = (date) => {
    if (date instanceof Date) {
      date.setHours(date.getHours() + 3);
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      const hours = `0${date.getHours()}`.slice(-2);
      const minutes = `0${date.getMinutes()}`.slice(-2);

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
  };

  useEffect(() => {
    findTask();
  }, []);

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
        <Grid container direction={"row"} marginTop={2}>
          <Button
            color="inherit"
            variant="outlined"
            endIcon={<ArrowBackIcon />}
            onClick={() => {
              navigate("/");
            }}
          >
            Voltar
          </Button>
        </Grid>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          marginTop={5}
        >
          <Grid item md={8} sm={12}>
            <Card>
              <CardContent>
                <Grid container direction={"row"} marginTop={1}>
                  <DefaultSubTitle>Cadastro de Tarefa</DefaultSubTitle>
                </Grid>
                <Grid container direction={"row"} marginTop={5} spacing={2}>
                  <Grid item marginTop={1} md={12} sm={12}>
                    <TextField
                      id="inputTitle"
                      label="Título"
                      variant="outlined"
                      fullWidth
                      value={newTaskTitle}
                      onChange={(e) => {
                        setNewTaskTitle(e.target.value);
                        validateFields(
                          e.target.value,
                          newTaskDescription,
                          newTaskPriority,
                          newTaskConclusionDate
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container direction={"row"} marginTop={2} spacing={2}>
                  <Grid item marginTop={1} md={12} sm={12}>
                    <TextField
                      id="inputDescription"
                      label="Descrição"
                      variant="outlined"
                      multiline
                      rows={2}
                      fullWidth
                      value={newTaskDescription}
                      onChange={(e) => {
                        setNewTaskDescription(e.target.value);
                        validateFields(
                          newTaskTitle,
                          e.target.value,
                          newTaskPriority,
                          newTaskConclusionDate
                        );
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container direction={"row"} marginTop={2} spacing={2}>
                  <Grid item marginTop={1} md={6} sm={12}>
                    <FormControl fullWidth variant="contained">
                      <InputLabel>Prioridade</InputLabel>
                      <NativeSelect
                        id="inputPriority"
                        value={newTaskPriority}
                        onChange={(e) => {
                          setNewTaskPriority(e.target.value);
                          validateFields(
                            newTaskTitle,
                            newTaskDescription,
                            e.target.value,
                            newTaskConclusionDate
                          );
                        }}
                      >
                        {priorities.map((priority, index) => {
                          return (
                            <option key={index} value={priority}>
                              {priority}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                  <Grid item marginTop={1} md={6} sm={12}>
                    <TextField
                      id="inputConclusionDate"
                      variant="standard"
                      focused
                      label="Data de Conclusão"
                      type="datetime-local"
                      value={newTaskConclusionDate}
                      onChange={(e) => {
                        setNewTaskConclusionDate(e.target.value);
                        validateFields(
                          newTaskTitle,
                          newTaskDescription,
                          newTaskPriority,
                          e.target.value
                        );
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container direction={"row"} justifyContent={"flex-end"}>
                  <Button
                    disabled={!isValid}
                    variant="contained"
                    color="success"
                    onClick={handleCreateNewTask}
                  >
                    Confirmar
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Loading show={loading} />
    </>
  );
};

export default EditTask;

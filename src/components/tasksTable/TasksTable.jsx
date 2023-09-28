import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Chip,
  IconButton,
} from "@mui/material";
import axios from "../../config/axiosConfig";

import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Loading from "../loading/Loading";
import Swal from "sweetalert2";

const TasksTable = (props) => {
  const [loading, setLoading] = useState(false);

  const handleChangeTaskIsOpen = async (taskId, isOpen) => {
    setLoading(true);
    await axios
      .patch(`/tasks/${taskId}`)
      .then((response) => {
        setLoading(false);
        props.getTasks();
        Swal.fire({
          title: `${isOpen ? "Tarefa Concluída" : "Tarefa reaberta novamente"}`,
          icon: "success",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({ title: "Erro ao atualizar tarefa", icon: "error" });
      });
  };

  const handleDeleteTask = async (taskId) => {
    setLoading(true);

    await axios
      .delete(`/tasks/${taskId}`)
      .then((response) => {
        setLoading(false);
        Swal.fire({ title: "Tarefa removida com suecsso", icon: "success" });
        props.getTasks();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({ title: "Erro ao remover tarefa", icon: "error" });
      });
  };

  const brDateFormat = (date) => {
    if (date instanceof Date) {
      const dia = String(date.getDate()).padStart(2, "0");
      const mes = String(date.getMonth() + 1).padStart(2, "0");
      const ano = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${dia}/${mes}/${ano} ${hours}:${minutes}`;
    }

    return `Data inválida`;
  };

  useEffect(() => {
    props.getTasks();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Data de Conclusão</TableCell>
              <TableCell>Prioridade</TableCell>
              <TableCell>Concluída</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map((task, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Tooltip
                      title={task.description}
                      style={{ cursor: "pointer" }}
                    >
                      <InfoIcon color="primary" />
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {brDateFormat(new Date(task.conclusionDate))}
                  </TableCell>
                  <TableCell>
                    {task.priority == "ALTA" && (
                      <Chip label={task.priority} color="error" />
                    )}
                    {task.priority == "MÉDIA" && (
                      <Chip label={task.priority} color="warning" />
                    )}
                    {task.priority == "BAIXA" && (
                      <Chip label={task.priority} color="success" />
                    )}
                  </TableCell>
                  <TableCell>
                    {task.isOpen && <CheckCircleIcon color="success" />}
                    {!task.isOpen && <DoDisturbOnIcon color="error" />}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Remover">
                      <IconButton
                        onClick={() => {
                          handleDeleteTask(task.id);
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>

                    {task.isOpen && (
                      <Tooltip title="Concluir">
                        <IconButton
                          onClick={() => {
                            handleChangeTaskIsOpen(task.id, task.isOpen);
                          }}
                        >
                          <CheckIcon color="success" />
                        </IconButton>
                      </Tooltip>
                    )}

                    {!task.isOpen && (
                      <Tooltip title="Abrir Novamente">
                        <IconButton
                          onClick={() => {
                            handleChangeTaskIsOpen(task.id, task.isOpen);
                          }}
                        >
                          <RestartAltIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Loading show={loading} />
    </>
  );
};

export default TasksTable;

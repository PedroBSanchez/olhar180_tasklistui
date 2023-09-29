import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { LoginBackground, LoginCard } from "../styles/styles";
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  Typography,
} from "@mui/material";
import axios from "axios";
import axiosInstance from "../config/axiosConfig";
import Swal from "sweetalert2";

const LoginDefault = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCloseModalSignUp = () => {
    setShowModalSignUp(false);
  };

  const handleOpenModalSignUp = () => {
    setShowModalSignUp(true);
  };

  const handleSignUp = async () => {
    if (!newUsername || !newPassword) {
      setShowModalSignUp(false);
      return Swal.fire({ title: "Campos inválidos", icon: "warning" });
    }

    const options = {
      url: `${import.meta.env.VITE_API_URL}/users`,
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      data: {
        username: newUsername,
        password: newPassword,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        setShowModalSignUp(false);
        Swal.fire({ title: "Usuário Cadastrado", icon: "success" });
      })
      .catch((error) => {
        setLoading(false);
        setShowModalSignUp(false);
        setNewPassword("");
        setNewUsername("");
        Swal.fire({
          title: `${
            error.response.data.message
              ? error.response.data.message
              : "Falha ao cadastrar usuário"
          }`,
          icon: "error",
        });
      });
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setShowModalSignUp(false);
      return Swal.fire({ title: "Campos inválidos", icon: "warning" });
    }

    const options = {
      url: `${import.meta.env.VITE_API_URL}/auth/login`,
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      data: {
        username: username,
        password: password,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then(async (response) => {
        setLoading(false);
        setShowModalSignUp(false);
        await cleanLocalCache();
        localStorage.setItem("apiToken", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        setShowModalSignUp(false);
        Swal.fire({
          title: `${
            error.response.data.message
              ? error.response.data.message
              : "Usuário e/ou senha inválido"
          }`,
          icon: "error",
        });
      });
  };

  const cleanLocalCache = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.clear();
        resolve();
      }, 1000);
    });
  };

  return (
    <>
      <LoginBackground>
        <LoginCard>
          <Grid container direction={"row"}>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                color="primary"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction={"row"} marginTop={3}>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Senha"
                color="primary"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction={"row"}
            marginTop={3}
            spacing={2}
            justifyContent={"space-between"}
          >
            <Grid item>
              <Button color="primary" onClick={handleOpenModalSignUp}>
                Cadastrar
              </Button>
            </Grid>
            <Grid item>
              <Button color="success" variant="contained" onClick={handleLogin}>
                Login
              </Button>
            </Grid>
          </Grid>
        </LoginCard>
      </LoginBackground>
      <Dialog onClose={handleCloseModalSignUp} open={showModalSignUp}>
        <Grid container direction="row" justifyContent={"flex-start"}>
          <DialogTitle>Cadastro</DialogTitle>
        </Grid>

        <Grid container diretion="row" padding={3}>
          <Grid item>
            <TextField
              id="inputNewUsername"
              fullWidth
              value={newUsername}
              label="Username"
              onChange={(e) => {
                setNewUsername(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container diretion="row" padding={3}>
          <Grid item>
            <TextField
              id="inputNewPassword"
              fullWidth
              value={newPassword}
              label="Password"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent={"flex-end"} padding={3}>
          <Button variant="contained" color="success" onClick={handleSignUp}>
            Cadastrar
          </Button>
        </Grid>
      </Dialog>
      <Loading show={loading} />
    </>
  );
};

export default LoginDefault;

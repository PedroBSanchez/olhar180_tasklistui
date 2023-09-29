import { Box } from "@mui/material";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  background-color: #2fb0ab;
`;

export const LogoHeader = styled.img`
  border: 1px solid black;
  border-radius: 5px;
`;

export const DefaultTitle = styled.h1`
  font-family: "Quicksand";
`;

export const DefaultSubTitle = styled.h3`
  font-family: "Quicksand";
`;

export const LoginBackground = styled.div`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgb(14, 11, 77) 0%,
    rgba(9, 121, 91, 1) 60%,
    rgba(0, 212, 255, 1) 100%
  );
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginCard = styled.div`
  background-color: rgba(211, 209, 209, 0.062);
  border: 2px solid rgba(255, 255, 255, 0.171);
  border-radius: 15px;
  padding: 20px;
`;

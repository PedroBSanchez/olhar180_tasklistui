import styled from "styled-components";

export const LoaderText = styled.span`
  font-family: Quicksand;
  color: white;
`;

export const Loader = styled.div`
  --background: linear-gradient(135deg, #23c4f8, #275efe);
  --shadow: rgba(39, 94, 254, 0.28);
  --text: #6c7486;
  --page: rgba(255, 255, 255, 0.36);
  --page-fold: rgba(255, 255, 255, 0.52);
  --duration: 3s;
  width: 200px;
  height: 140px;
  position: relative;

  &:before,
  &:after {
    --r: -6deg;
    content: "";
    position: absolute;
    bottom: 8px;
    width: 120px;
    top: 80%;
    box-shadow: 0 16px 12px var(--shadow);
    transform: rotate(var(--r));
  }

  &:before {
    left: 4px;
  }

  &:after {
    --r: 6deg;
    right: 4px;
  }

  div {
    width: 100%;
    height: 100%;
    border-radius: 13px;
    position: relative;
    z-index: 1;
    perspective: 600px;
    box-shadow: 0 4px 6px var(--shadow);
    background-image: var(--background);
  }

  div ul {
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
  }
  div ul li {
    --r: 180deg;
    --o: 0;
    --c: var(--page);
    position: absolute;
    top: 10px;
    left: 10px;
    transform-origin: 100% 50%;
    color: var(--c);
    opacity: var(--o);
    transform: rotateY(var(--r));
    -webkit-animation: var(--duration) ease infinite;
    animation: var(--duration) ease infinite;
  }

  div ul li:nth-child(2) {
    --c: var(--page-fold);
    -webkit-animation-name: page-2;
    animation-name: page-2;
  }

  div ul li:nth-child(3) {
    --c: var(--page-fold);
    -webkit-animation-name: page-3;
    animation-name: page-3;
  }

  div ul li:nth-child(4) {
    --c: var(--page-fold);
    -webkit-animation-name: page-4;
    animation-name: page-4;
  }

  div ul li:nth-child(5) {
    --c: var(--page-fold);
    -webkit-animation-name: page-5;
    animation-name: page-5;
  }

  div ul li svg {
    width: 90px;
    height: 120px;
    display: block;
  }

  div ul li:first-child {
    --r: 0deg;
    --o: 1;
  }

  div ul li:last-child {
    --o: 1;
  }

  span {
    display: block;
    left: 0;
    right: 0;
    top: 100%;
    margin-top: 20px;
    text-align: center;
  }
`;

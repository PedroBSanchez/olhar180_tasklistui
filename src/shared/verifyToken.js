import axios from "../config/axiosConfig";

const verifyToken = async () => {
  let validToken = false;

  await axios
    .get("/users/verifytoken")
    .then((response) => {
      validToken = true;
    })
    .catch((error) => {
      validToken = false;
    });

  return validToken;
};

export { verifyToken };

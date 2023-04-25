import axios from "axios";
import { getEnvVariables } from "./getEnvVariables";

const { BACK_SERVER } = getEnvVariables()

export const apiRequest = axios.create({
  baseURL: BACK_SERVER
})

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      // Realizar alguna acción si se necesita, como redireccionar a una página de inicio de sesión
    }
    return Promise.reject(error);
  }
);

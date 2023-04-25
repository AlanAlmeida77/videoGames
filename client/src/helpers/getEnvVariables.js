export const getEnvVariables = () => {
  const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;

  if (!BACK_SERVER) {
    throw new Error("La variable de entorno REACT_APP_BACK_SERVER no está definida");
  }

  return { BACK_SERVER };
};
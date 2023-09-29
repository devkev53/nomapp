import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useFetchAndLoad = () => {
  const [isLoading, setLoading] = useState(false);
  let controller; // Genera un controlador final

  // Llama al endpon con la funcion asincrona
  const callEndpoint = async (axiosCall) => {
    if (axiosCall.controller) controller = axiosCall.controller; // Valida y envia al controlador
    setLoading(true);

    let result = {};

    try {
      result = await axiosCall.call;
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }

    setLoading(false);
    return result;
  };

  // Cancelar la llamada al endpoint
  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { isLoading, callEndpoint };
};

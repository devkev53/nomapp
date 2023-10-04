export const getValidationError = (errorCode) => {
  const codeMatcher = {
    ERR_BAD_REQUEST: "Lo sentimos su soliitud no pudo ser procesada..!",
    ERR_CANCELED: "La solicitud fue cancelada por el cliente..!",
  };
  return codeMatcher[errorCode];
};

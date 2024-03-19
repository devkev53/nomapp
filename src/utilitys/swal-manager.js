import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ErrorSwal = withReactContent(Swal);

export const mySwall = (icon = "error", message, title) => {
  ErrorSwal.fire({
    icon: icon,
    title: title,
    text: message,
  });
};

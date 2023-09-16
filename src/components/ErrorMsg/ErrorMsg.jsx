import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetErrorAction } from "../../redux/slices/globalAction/globalAction";
import { useEffect } from "react";

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
  useEffect(() => {
    dispatch(resetErrorAction());
  }, [dispatch]);
};

export default ErrorMsg;

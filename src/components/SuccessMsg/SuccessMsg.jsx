import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetSuccessAction } from "../../redux/slices/globalAction/globalAction";
import { useEffect } from "react";

const SuccessMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "success",
    title: "Good job!",
    text: message,
  });
  useEffect(() => {
    dispatch(resetSuccessAction({}));
  }, [dispatch]);
};

export default SuccessMsg;

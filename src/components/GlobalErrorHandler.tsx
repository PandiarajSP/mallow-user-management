import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setError } from "../store/errorSlice";
import ModalComponent from "./modal-component/ModalComponent";

const GlobalErrorHandler = () => {
  const error = useSelector((state: RootState) => state.globalError.error);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setError(null));
  };

  if (!error) return null;

  return (
    <ModalComponent
      title={error.title}
      message={error.message}
      showCloseButton={false}
      onConfirm={handleClose}
      confirmButtonText="Close"
      onCancel={handleClose}
      visible={!!error}
    />
  );
};

export default GlobalErrorHandler;

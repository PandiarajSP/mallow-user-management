import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setError } from "../store/errorSlice";
import { Modal } from "antd";

const GlobalErrorHandler = () => {
  const error = useSelector((state: RootState) => state.globalError.error);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setError(null)); 
  };

  if (!error) return null;

  return (
    <Modal
      title={error.title}
      open={!!error}
      onOk={handleClose}
      onCancel={handleClose}
    >
      <p>{error.message}</p>
    </Modal>
  );
};

export default GlobalErrorHandler;

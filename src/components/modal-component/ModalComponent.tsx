import { Modal, Button } from "antd";

interface ModalComponentProps {
  title: string;
  message: string;
  visible: boolean;
  showCloseButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  message,
  visible,
  showCloseButton = true,
  onConfirm,
  onCancel,
  confirmButtonText = "OK",
  cancelButtonText = "Cancel",
}) => {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={confirmButtonText}
      cancelText={cancelButtonText}
      footer={[
      
        showCloseButton && (
          <Button key="cancel" onClick={onCancel} className="ant-btn-default">
            {cancelButtonText}
          </Button>
        ),
        <Button key="confirm" onClick={onConfirm} type="primary">
          {confirmButtonText}
        </Button>,
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ModalComponent;

import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { UserModel } from "./user.model";
import userService from "./user.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  userData: UserModel | null;
  editMode: boolean;
  cardTitle: string;
}
const UsersCreateOrEdit: React.FC<Props> = ({
  visible,
  onCancel,
  onSuccess,
  userData,
  editMode,
  cardTitle,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (visible) {
      if (editMode && userData) {
        form.setFieldsValue({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          avatar: userData.avatar,
        });
      } else {
        form.resetFields();
      }
    }
  }, [userData, editMode, form, visible]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editMode && userData?.id) {
        await userService.updateUser(dispatch, values, userData?.id.toString());
        message.success("User updated successfully!");
      } else {
        await userService.createUser(dispatch, values);
        message.success("User created successfully!");
      }
      onSuccess();
    } catch (error) {
      message.error("Error submitting form");
      console.error(error);
    }
  };

  return (
    <Modal
      title={cardTitle}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Submit"
      forceRender
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            { required: true, message: "Please enter first name" },
            {
              whitespace: true,
              message: "First name cannot be empty or only spaces",
            },
            {
              pattern: /^[A-Za-z\s'-]+$/,
              message: "Only letters, spaces, hyphens and apostrophes allowed",
            },
          ]}
        >
          <Input placeholder="Please enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            { required: true, message: "Please enter last name" },
            {
              whitespace: true,
              message: "Last name cannot be empty or only spaces",
            },
            {
              pattern: /^[A-Za-z\s'-]+$/,
              message: "Only letters, spaces, hyphens and apostrophes allowed",
            },
          ]}
        >
          <Input placeholder="Please enter last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email address" },
            { max: 100, message: "Email cannot exceed 100 characters" },
          ]}
        >
          <Input placeholder="Please enter email" />
        </Form.Item>

        {!editMode && (
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Please enter password" />
          </Form.Item>
        )}

        <Form.Item
          label="Profile Image Link"
          name="avatar"
          rules={[
            { required: true, message: "Please enter profile image link" },
            {
              type: "url",
              message: "Please enter a valid URL (https://...)",
            },
            { max: 250, message: "URL cannot exceed 250 characters" },
          ]}
        >
          <Input placeholder="Please enter profile image link" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UsersCreateOrEdit;

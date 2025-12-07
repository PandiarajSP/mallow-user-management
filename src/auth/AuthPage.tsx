import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import authService from "./auth.service";
import { Alert, Button, Form, Input, Spin, Typography, Checkbox } from "antd";
import sessionService from "../services/session.service";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../store/userSlice";

const AuthPage = () => {
  const [spinStatus, setSpinStatus] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = sessionService.getToken();
    if (token) {
      navigate("/users-list");
    }
  }, [navigate]);

  const onFinish = async (values: any) => {
    setSpinStatus(true);
    setFormError(null);

    try {
      // Login request
      let payload = {
        email: values.email,
        password: values.password,
      };
      const response = await authService.loginUser(dispatch, payload);

      if (response.token) {
        sessionService.storeToken(response.token, values.remember);
        sessionStorage.setItem("userEmail", values.email);
        navigate("/users-list");
      }
    } catch (error: any) {
      setFormError(error.message || "Invalid credentials");
    } finally {
      setSpinStatus(false);
    }
  };

  return (
    <Spin spinning={spinStatus}>
      <div className="auth-container">
        <div className="auth-card">
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="custom-input"
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="custom-input"
                prefix={<LockOutlined />}
                iconRender={() => null}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {formError && (
              <Alert
                message={formError}
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form.Item style={{ marginBottom: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ borderRadius: 8 }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default AuthPage;

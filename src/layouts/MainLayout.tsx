import { LogoutOutlined } from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "../auth/auth.service";
import "../index.css";
import sessionService from "../services/session.service";
import { AppDispatch } from "../store";
import { setError } from "../store/errorSlice";
import "./MainLayout.css";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      const [first, rest] = email.split("@")[0].split(".");
      setFirstName(first || "");
      setLastName(rest || "");
    }
  }, []);
  const handleLogout = async () => {
    await authService
      .logoutUser(dispatch)
      .then(() => {
        sessionService.clear();
        navigate("/login");
      })
      .catch((err) => {
        dispatch(
          setError({
            title: err,
            message: "Something Went Wrong!..",
          })
        );
      });
  };

  return (
    <>
      <Layout>
        <Header
          style={{
            backgroundColor: "#00182E",
            height: "70px",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Row
            justify="end"
            align="middle"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Col>
              <span style={{ color: "white", fontSize: 16 }}>
                {firstName} {lastName}
              </span>
            </Col>

            <Col>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "0.2s ease",
                  marginLeft: "20px", 
                }}
              >
                <LogoutOutlined
                  style={{ color: "white" }}
                  onClick={handleLogout}
                />
              </div>
            </Col>
          </Row>
        </Header>

        <Content>
          <div
            style={{
              background: "#f9fafc",
              minHeight: 280,
              padding: 24,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "right", background: "#ffffff" }}>
          Mallow ©{new Date().getFullYear()} Created by Mallow
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;

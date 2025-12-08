import { Navigate } from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import MainLayout from "./layouts/MainLayout";
import UserList from "./users/UsersList";

const routes = [
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      {
        path: "/users-list",
        element: <UserList />,
      }
    ],
  },
];
export default routes;

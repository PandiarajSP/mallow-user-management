import { Navigate } from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import MainLayout from "./layouts/MainLayout";
import UserList from "./users/UsersList";
import UsersCreateOrEdit from "./users/UserCreateOrEdit";
// import MainLayout from "./layouts/MainLayout";

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
  //   {
  //     path: "/*",
  //     element: <MainLayout />,
  //   },
];
export default routes;

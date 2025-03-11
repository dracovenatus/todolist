import { App } from "app/App";
import { Main } from "app/Main";
import { Page404 } from "common/components";
import { Login } from "features/auth/ui/Login/Login";
import { createBrowserRouter, RouteObject } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";

export const Path = {
  Main: "/todolist",
  Login: "login",
  NotFound: "*",
} as const;

const privateRoutes: RouteObject[] = [
  {
    path: Path.Main,
    element: <Main />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: privateRoutes,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
      {
        path: Path.NotFound,
        element: <Page404 />,
      },
    ],
  },
]);

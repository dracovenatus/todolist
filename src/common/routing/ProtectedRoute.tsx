import { Navigate, Outlet } from "react-router";
import { Path } from "./routing";
import { useAppSelector } from "common/hooks";
import { selectIsLoggedIn } from "app/appSlice";

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    // Если пользователь не авторизован, перенаправляем на логин
    return <Navigate to={Path.Login} />;
  }

  // Если авторизован, показываем дочерние элементы
  return <Outlet />;
};

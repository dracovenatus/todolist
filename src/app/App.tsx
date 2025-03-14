import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Header, ErrorSnackbar } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getTheme } from "common/theme";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import s from "./App.module.css";
import { Outlet } from "react-router";
import { selectThemeMode, setIsLoggedIn } from "./appSlice";
import { useMeQuery } from "features/auth/api/authApi";
import { ResultCode } from "common/enums";

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const themeMode = useAppSelector(selectThemeMode);
  const { data, isLoading } = useMeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      }
    }
  }, [isLoading, data, dispatch]);

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    );
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Outlet />
      <ErrorSnackbar />
    </ThemeProvider>
  );
};

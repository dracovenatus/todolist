import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Header, ErrorSnackbar } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getTheme } from "common/theme";
import { useEffect } from "react";
import {
  initializeAppTC,
  selectIsInitialized,
} from "features/auth/model/authSlice";
import { CircularProgress } from "@mui/material";
import s from "./App.module.css";
import { Outlet } from "react-router";
import { selectThemeMode } from "./appSlice";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const isInitialized = useAppSelector(selectIsInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

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

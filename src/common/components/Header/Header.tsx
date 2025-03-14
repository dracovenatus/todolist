import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import {
  changeTheme,
  selectAppStatus,
  selectIsLoggedIn,
  selectThemeMode,
  setIsLoggedIn,
} from "../../../app/appSlice";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getTheme } from "common/theme";
import { MenuButton } from "../MenuButton/MenuButton";
import { useLogoutMutation } from "features/auth/api/authApi";
import { ResultCode } from "common/enums";
import { clearTasks } from "features/todolists/model/tasksSlice";
import { clearTodolists } from "features/todolists/model/todolistsSlice";

export const Header = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectAppStatus);

  const theme = getTheme(themeMode);

  const changeModeHandler = () => {
    dispatch(
      changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" })
    );
  };

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        localStorage.removeItem("sn-token");
        dispatch(clearTasks());
        dispatch(clearTodolists());
      }
    });
  };

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && (
            <MenuButton onClick={logoutHandler}>Logout</MenuButton>
          )}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};

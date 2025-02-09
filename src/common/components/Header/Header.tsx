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
  selectThemeMode,
} from "../../../app/appSlice";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getTheme } from "common/theme";

import { logoutTC, selectIsLoggedIn } from "features/auth/model/authSlice";
import { MenuButton } from "../MenuButton/MenuButton";

export const Header = () => {
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

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && (
            <MenuButton onClick={() => dispatch(logoutTC())}>Logout</MenuButton>
          )}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};

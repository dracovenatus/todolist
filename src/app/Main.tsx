import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect } from "react";
import { AddItemForm } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { addTodolistTC } from "../features/todolists/model/todolistsSlice";
import { Todolists } from "../features/todolists/ui/Todolists/Todolists";
import { useNavigate } from "react-router";
import { Path } from "common/routing/routing";
import { selectIsLoggedIn } from "features/auth/model/authSlice";

export const Main = () => {
  const dispatch = useAppDispatch();

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title));
  };

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate(Path.Login)
  //   }
  // }, [isLoggedIn])

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  );
};

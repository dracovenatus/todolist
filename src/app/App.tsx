import React from 'react';
import './App.css';
import { Menu } from "@material-ui/icons";
import { AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from "@material-ui/core";
import TodolistsList from '../features/TodolistsList/TodolistsList';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';





function App() {



    return (
        <div className="App">
              < ErrorSnackbar/>
            <AppBar position="static">
         
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                <LinearProgress />
            </AppBar>
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    )
}



export default App;

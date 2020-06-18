import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Views/Home/Home";
import Login from "./Views/User/Login";
import Register from "./Views/User/Register";
import Profile from "./Views/User/Profile";
import Recover from "./Views/User/Recover";
import MailConfirmed from "./Views/User/MailConfirmed";
import MainDrawer from "./Views/MyGames/MainDrawer";
import GameList from "./Views/FinishedGames/GameList";
import GameItem from "./Views/FinishedGames/GameItem";
import ProtectedRoute from "./Components/ProtectedRoute";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <ProtectedRoute path='/profile' component={Profile} exact />
        <Route path='/recover/:passToken' component={Recover} exact />
        <ProtectedRoute path='/myGames' component={MainDrawer} exact />
        <ProtectedRoute path='/myRecord' component={GameList} exact />
        <ProtectedRoute path='/myRecord/:gameId' component={GameItem} exact />
        <Route path='/confirm/:passToken' component={MailConfirmed} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

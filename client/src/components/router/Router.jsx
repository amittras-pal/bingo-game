import React from "react";
import { Route, Switch } from "react-router-dom";
import Create from "../Create/Create";
import PlayerBoard from "../Game/Board/PlayerBoard";
import Conductor from "../Game/Conductor/Conductor";
import Home from "../Home/Home";

function AppRouter() {
  return (
    <Switch>
      <Route path="/game" component={PlayerBoard} />
      <Route path="/conductor" component={Conductor} />
      <Route path="/new-game" component={Create} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default AppRouter;

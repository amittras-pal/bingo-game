import React from "react";
import { Route, Switch } from "react-router-dom";
import Create from "../Entries/Create/Create";
import Join from "../Entries/Join/Join";
import Player from "../Game/Player/Player";
import Conductor from "../Game/Conductor/Conductor";
import Home from "../Home/Home";
import Rules from "../Rules/Rules";
import GuardRoute from "./GuardRoute";

function AppRouter() {
  return (
    <Switch>
      <GuardRoute path="/game" component={Player} />
      <GuardRoute path="/conductor" component={Conductor} />
      <Route path="/new-game" component={Create} />
      <Route path="/join-game" component={Join} />
      <Route path="/game-rules" component={Rules} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default AppRouter;

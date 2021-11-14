import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function GuardRoute({ component: Component, ...rest }) {
  const dataStore = localStorage.length;
  return (
    <Route
      {...rest}
      render={(props) =>
        dataStore > 0 ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

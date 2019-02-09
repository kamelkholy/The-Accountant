import React, { Component } from "react";

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Clients from "../components/Clients/Table";
import Products from "../components/Products/Table/table";
import Navbar from "../components/Navbar/navbar";
export const history = createHistory();
const AppRoute = () => (
  <Router history={history}>
    <div>
      <Navbar />
      <div style={{ "margin-top": 80 + "px" }}>
        <Switch>
          <Route path="/products" component={Products} exact={true} />
          <Route path="/clients" component={Clients} exact={true} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default AppRoute;

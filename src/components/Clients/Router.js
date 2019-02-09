

import React, { Component } from "react";

import { Button } from "react-bootstrap";

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import ClientList from './Table';
import ClientForm from './Add';


let clientsDemo = [
    { clientName: "ahmed", id: "1" },
    { clientName: "moamed", id: "2" },
    { clientName: "omar", id: "3" }
  ];
  
  const history = createHistory();
  const AppRoute = () => (
    <Router history={history}>
      <div>
        <Switch>
          <Route
            path="/"
            component={props => <ClientList {...props} clients={clientsDemo} />}
            exact={true}
          />
          <Route path="/add" component={ClientForm} exact={true} />
         g */}
        </Switch>
      </div>
    </Router>
  );


  export default AppRoute;
  
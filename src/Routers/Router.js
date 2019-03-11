import React, { Component } from "react";

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Clients from "../components/Clients/Table";
import ClientsForm from "../components/Clients/Add";
import Products from "../components/Products/Table/table";
import ProductsAdd from "../components/Products/Add/add";
import ProductsEdit from "../components/Products/Edit/edit";
import Navbar from "../components/Navbar/navbar";
import Invoices from "../components/Invoice/showinvoices";
import AddInvoice from "../components/Invoice/addInvoice";
import Dashboard from "../components/Dashboard";
import { withRouter } from "react-router-dom";
export const history = createHistory();
const AppRoute = () => (
  <Router history={history}>
    <div className="container">
      <Navbar />
      <div style={{ "margin-top": 80 + "px" }}>
        <Switch>
          <Route path="/" component={Dashboard} exact={true} />
          <Route path="/dashboard" component={Dashboard} exact={true} />
          <Route
            path="/products"
            component={() => <Products history={history} />}
            exact={true}
          />
          <Route
            path="/products/add"
            component={props => <ProductsAdd {...props} history={history} />}
            exact={true}
          />
          <Route
            path="/products/edit"
            component={props => <ProductsEdit {...props} history={history} />}
            exact={true}
          />
          <Route
            path="/clients"
            component={() => <Clients history={history} />}
            exact={true}
          />
          <Route
            path="/clients/add"
            component={() => <ClientsForm history={history} />}
            exact={true}
          />
          <Route path="/invoices" component={Invoices} exact={true} />
          <Route path="/invoices/add" component={AddInvoice} exact={true} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default AppRoute;

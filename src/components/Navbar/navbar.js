import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  state = {};
  routeHandler(page) {
    switch (page) {
      case "clients":
        break;

      default:
        break;
    }
  }
  render() {
    return (
      <nav class="navbar navbar-light navbar-expand-sm bg-light fixed-top">
        <Link class="navbar-brand" to="/">
          My Manager
        </Link>
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link" to="/">
              Dashboard
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/clients">
              Clients
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/products">
              Products
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/invoices">
              Invoices
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

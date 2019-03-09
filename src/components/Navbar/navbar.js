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
      <nav className="navbar navbar-light navbar-expand-sm bg-light fixed-top">
        <Link className="navbar-brand" to="/">
          My Manager
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clients">
              Clients
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/invoices">
              Invoices
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

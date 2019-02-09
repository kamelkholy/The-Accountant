import React, { Component } from "react";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav class="navbar navbar-light navbar-expand-sm bg-light fixed-top">
        <a class="navbar-brand" href="#">
          My Manager
        </a>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">
              Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Clients
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Products
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Invoices
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

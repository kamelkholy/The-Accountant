import React, { Component } from "react";

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

class ClientList extends React.Component {
  state = {
    headers: [
      { name: "#", sort: 0 },
      { name: "Client Name", sort: 0 },
      { name: "Access" }
    ],
    data: [
      { id: "1", clientName: "ahmed" },
      { id: "2", clientName: "moamed" },
      { id: "3", clientName: "omar" }
    ]
  };
  renderSort(sort) {
    switch (sort) {
      case 0:
        return <span>&#9656;</span>;
      case 1:
        return <span>&#9662;</span>;
      case -1:
        return <span>&#9652;</span>;
      default:
        return "";
    }
  }
  toggleSort(index) {
    if (this.state.headers[index].sort !== undefined) {
      let newHeaders = [...this.state.headers];
      newHeaders[index].sort =
        newHeaders[index].sort === 0
          ? 1
          : newHeaders[index].sort === 1 ? -1 : 0;
      console.log(newHeaders[index].sort);
      this.setState({ headers: newHeaders });
    }
  }

  render() {
    const headerElements = this.state.headers.map((header, index) => (
      <td
        style={{ cursor: "pointer" }}
        onClick={this.toggleSort.bind(this, index)}
      >
        {header.name} {this.renderSort(header.sort)}
      </td>
    ));
    const dataElements = this.state.data.map(record => {
      let row = [];
      for (let key in record) {
        row.push(<td>{record[key]}</td>);
      }
      return (
        <tr>
          {row}
          <td>
            <button class="btn btn-outline-dark btn-sm">Edit</button>
            <button
              style={{ marginLeft: 10 }}
              class="btn btn-outline-dark btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
        <button
          style={{ marginBottom: 10 }}
          class="btn btn-primary"
        >
          Add New
        </button>
        <table class="table table-hover">
          <tbody>
            <tr>{headerElements}</tr>
          </tbody>
          <tbody>{dataElements}</tbody>
        </table>
        <ul
          style={{ margin: "20px" }}
          class="pagination justify-content-center"
        >
          <li class="page-item">
            <a class="page-link" href="#">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default ClientList;

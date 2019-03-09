import React, { Component } from "react";

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import database from './firebase/firebase.js'


const history = createHistory();


class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [
        { name: "#", sort: 0 },
        { name: "Client Name", sort: 0 },
        { name: "Access" }
      ],
      data: [],
      temp: false
    };

    database.ref('data').once('value').then((snapshot) => {
      const data = [];
      let i = 0;
      snapshot.forEach((snapshotChild) => {
        data.push({
          id: i,
          ...snapshotChild.val()
        })
        i++;
      })
      this.setState({ data: data })
      console.log(data)
    })
  }




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
          : newHeaders[index].sort === 1
          ? -1
          : 0;
      console.log(newHeaders[index].sort);
      this.setState({ headers: newHeaders });
    }
  }

  AddHandler() {
    this.props.history.push('/clients/add');
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
    const dataElements = this.state.data.map((record) => {
      let row = [];
      for (let key in record) {
        console.log(record[key]);
        row.push(<td>{record[key]}</td>);
      }
      return (
        <tr>
          {row}
          <td>
            <button className="btn btn-outline-dark btn-sm">Edit</button>
            <button
              style={{ marginLeft: 10 }}
              className="btn btn-outline-dark btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
<<<<<<< HEAD
        <button
          style={{ marginBottom: 10 }}
          class="btn btn-primary"
          onClick={this.AddHandler.bind(this)}
        >
=======
        <button style={{ marginBottom: 10 }} className="btn btn-primary">
>>>>>>> 2ac9a1f8934f60a5f37ffc6636e7ec0e1d3cb2be
          Add New
        </button>
        <table className="table table-hover">
          <tbody>
            <tr>{headerElements}</tr>
          </tbody>
          <tbody>{dataElements}</tbody>
        </table>
        <ul
          style={{ margin: "20px" }}
          className="pagination justify-content-center"
        >
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default ClientList;

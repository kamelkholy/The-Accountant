import React, { Component } from "react";
import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { browserHistory } from "react-router";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import _ from 'lodash'
class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [
        { name: "#", sort: 0 },
        { name: "Client Name", sort: 0 },
        { name: "Phone Number", sort: 0 },
        { name: "Address", sort: 0 },
        { name: "Email Address", sort: 0 },
        { name: "Access" }
      ],
      data: [],
      temp: false
    };
    const database = firebase.database();
    database
      .ref("Clients")
      .once("value")
      .then(snapshot => {
        const data = [];
        let i = 0;
        snapshot.forEach(snapshotChild => {
          data.push({
            key : snapshotChild.key,
            id: i,
            clienName:snapshotChild.val()['clientName'],
            phoneNumber : snapshotChild.val()['phoneNumber'],
            address : snapshotChild.val()['address'],
            email : snapshotChild.val()['email']
          });
          i++;
        });
        this.setState({ data: data });
          
      });
      this.DeleteHandler = this.DeleteHandler.bind(this);
      
  }
  
  DeleteHandler(event){
    const ClientToDelete = event.target.id;
    console.log(ClientToDelete);
    const data = this.state.data;
    var index = _.findIndex(data,(o) => {return o.key == ClientToDelete})
    console.log(index);
    if(index != -1) {
      data.splice(index,1)
      this.setState({data :data})
    }
    const database = firebase.database();
    database
    .ref(`Clients/${ClientToDelete}`)
    .remove()
    
  }

  componentDidMount() {
    const database = firebase.database().ref("invoices");
    this.setState({ database });
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
      //console.log(newHeaders[index].sort);
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
    const dataElements = this.state.data.map((record) => {
      let row = [];
      console.log(record);
      for (let key in record) {
        if(key === 'key')continue;
        row.push(<td>{record[key]}</td>);
      }
      return (
        <tr>
          {row}
          <td>
            <Link 
              className="btn btn-outline-dark btn-sm" 
              to= {`/clients/edit/${record['key']}`}
            >
               Edit
            </Link>
            <button
              style={{ marginLeft: 10 }}
              className="btn btn-outline-dark btn-sm"
              id = {record['key']}
              onClick = {this.DeleteHandler}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
        <Link
          style={{ marginBottom: "0.5rem" }}
          className="btn btn-primary"
          to="clients/add"
        >
          Add New
        </Link>
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

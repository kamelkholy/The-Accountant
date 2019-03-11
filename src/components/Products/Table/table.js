import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

class Table extends Component {
  componentDidMount() {
    firebase
      .database()
      .ref("products")
      .on("value", snapshot => {
        let data = snapshot.val();
        data = data === null ? {} : data;
        this.setState({ data });
      });
  }
  state = {
    headers: [
      { name: "Product Name", sort: 0 },
      { name: "Purchase Price", sort: 0 },
      { name: "Selling Price", sort: 0 },
      { name: "Stock", sort: 0 },
      { name: "Access" }
    ],
    data: {}
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
          : newHeaders[index].sort === 1
          ? -1
          : 0;
      console.log(newHeaders[index].sort);
      this.setState({ headers: newHeaders });
    }
  }
  deleteProduct(id) {
    firebase
      .database()
      .ref(`products/${id}`)
      .remove();
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
    console.log(this.state.data);
    const dataElements = Object.keys(this.state.data).map(id => {
      let row = [];
      for (let key in this.state.data[id]) {
        row.push(<td>{this.state.data[id][key]}</td>);
      }
      return (
        <tr>
          {row}
          <td>
            <Link
              to={{
                pathname: "/products/edit",
                state: { id: id }
              }}
              className="btn btn-outline-dark btn-sm"
            >
              Edit
            </Link>
            <button
              style={{ marginLeft: 10 }}
              className="btn btn-outline-dark btn-sm"
              onClick={this.deleteProduct.bind(this, id)}
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
          to="products/add"
        >
          Add New
        </Link>
        <table className="table table-hover">
          <tbody>
            <tr>{headerElements}</tr>
          </tbody>
          <tbody>{dataElements}</tbody>
        </table>
        {/* <ul
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
        </ul> */}
      </div>
    );
  }
}

export default Table;

import React, { Component } from "react";
import ItemTable from "./itemtable";
import { Link } from "react-router-dom";
import firebase from "firebase";

const getClientByKey = (clients, key) => {
  const arr = Object.entries(clients).find(client => client[0] === key);
  return { key: arr[0], client: arr[1] };
};

const getProductByKey = (products, key) => {
  const arr = Object.entries(products).find(product => product[0] === key);
  return { key: arr[0], product: arr[1] };
};

class InvoiceViewer extends Component {
  state = {
    invoiceNumber: 1,
    allInvoices: {},
    currentInvoice: {}
  };
  //TODO: sort by date

  componentWillMount() {
    const database = firebase.database();
    const invoicesRef = database.ref("invoices");
    const clientsRef = database.ref("Clients");
    const productsRef = database.ref("products");
    this.setState({ database });
    clientsRef.on("value", snapshot => {
      const clients = snapshot.val();

      const clientNames = Object.values(clients).map(
        client => client.clientName
      );
      this.setState({ clients, clientNames });
    });
    productsRef.on("value", snapshot => {
      const allProducts = snapshot.val();

      const productNames = Object.values(allProducts).map(
        product => product.name
      );
      this.setState({ allProducts, productNames });
    });
    invoicesRef.on("value", snapshot => {
      const allInvoices = snapshot.val();
      console.log("allInvoices");
      console.log(allInvoices);
      if (allInvoices) {
        const { invoiceNumber } = this.state;
        console.log("allInvoices, before calling structuring");
        console.log(allInvoices);
        this.setState({ allInvoices });
        this.restructureAllInvoices();
        const currentInvoice = Object.values(allInvoices)[0];
        this.setState({ currentInvoice });
      }
    });
  }

  restructureAllInvoices() {
    console.log("Restructuring...");

    const { invoiceNumber, clients, allProducts } = this.state;
    let { allInvoices } = this.state;
    if (Object.keys(allInvoices).length === 0) window.location.reload();
    console.log("allInvoices, before structuring");
    console.log(allInvoices);
    const values = Object.values(allInvoices).map(currentInvoice => {
      currentInvoice.client = getClientByKey(clients, currentInvoice.clientKey);
      currentInvoice.products = currentInvoice.products.map(product => {
        let temp = { ...product };
        console.log("product");
        console.log(product);

        temp.product = getProductByKey(allProducts, product.product);

        return temp;
      });
      return currentInvoice;
    });
    const keys = Object.keys(allInvoices);
    allInvoices = values.reduce(
      (obj, value, index) => ({ ...obj, [keys[index]]: value }),
      {}
    );
    this.setState({ allInvoices });
    console.log("allInvoices, after restructuring");
    console.log(allInvoices);
  }

  handlePreviousClick = () => {
    let { invoiceNumber, allInvoices } = this.state;
    if (invoiceNumber === 1) return;
    invoiceNumber -= 1;
    const currentInvoice = Object.values(allInvoices)[invoiceNumber - 1];
    this.setState({ invoiceNumber, currentInvoice });
    document.getElementById("invoiceNumberInput").value = invoiceNumber;
  };

  handleNextClick = () => {
    let { invoiceNumber, allInvoices } = this.state;
    if (
      invoiceNumber === Object.values(allInvoices).length ||
      Object.values(allInvoices).length === 0
    )
      return;
    invoiceNumber += 1;
    const currentInvoice = Object.values(allInvoices)[invoiceNumber - 1];
    this.setState({ invoiceNumber, currentInvoice });
    document.getElementById("invoiceNumberInput").value = invoiceNumber;
  };

  handleInvoiceNumberChange = () => {
    const invoiceNumber = parseInt(
      document.getElementById("invoiceNumberInput").value
    );
    const { allInvoices } = this.state;
    if (
      !(invoiceNumber > 0 && invoiceNumber <= Object.values(allInvoices).length)
    ) {
      if (invoiceNumber)
        document.getElementById(
          "invoiceNumberInput"
        ).value = this.state.invoiceNumber;
      return;
    }

    const currentInvoice = Object.values(allInvoices)[invoiceNumber - 1];
    this.setState({ currentInvoice, invoiceNumber });
  };

  handleDelete = () => {
    let { allInvoices, invoiceNumber, database } = this.state;
    if (invoiceNumber == 1) this.handleNextClick();
    else this.handlePreviousClick();

    const invoiceKey = Object.keys(allInvoices)[invoiceNumber - 1];
    console.log("invoiceKey");
    console.log(invoiceKey);
    database.ref("invoices/" + invoiceKey).remove();
    window.location.reload();
  };

  render() {
    return (
      <div className="container">
        <Link
          style={{ marginBottom: "0.5rem" }}
          className="btn btn-primary"
          to="invoices/add"
        >
          Add New
        </Link>
        {Object.keys(this.state.allInvoices).length > 0 ? (
          <div className="row" style={{ width: "100%", marginBottom: "10px" }}>
            <div className="col-sm-4">
              <button
                onClick={this.handlePreviousClick}
                className="page-link float-right"
                style={{ width: "100px" }}
              >
                Previous
              </button>
            </div>
            <div className="col-sm-4">
              <input
                className="form-control"
                defaultValue={this.state.invoiceNumber}
                onChange={this.handleInvoiceNumberChange}
                placeholder={
                  "1 - " + Object.values(this.state.allInvoices).length
                }
                id="invoiceNumberInput"
              />
            </div>
            <div className="col-sm-4">
              <button
                onClick={this.handleNextClick}
                className="page-link"
                style={{ width: "100px" }}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div />
        )}

        {Object.keys(this.state.currentInvoice).length > 0 ? (
          <div>
            <div
              className="row"
              style={{ width: "50%", textAlign: "center", margin: "auto" }}
            >
              <div className="col-sm-6">
                <strong>Date:</strong>{" "}
                {new Date(this.state.currentInvoice.date).toDateString()}
              </div>
              <div className="col-sm-6">
                {console.log(this.state.currentInvoice)}
                <strong>Client:</strong>{" "}
                {this.state.currentInvoice.client.client.clientName}
              </div>
            </div>

            <ItemTable products={this.state.currentInvoice.products} />
            <button
              onClick={this.handleDelete}
              style={{ width: "100px", marginBottom: "0.5rem" }}
              className="btn btn-primary btn-danger"
            >
              Delete
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default InvoiceViewer;

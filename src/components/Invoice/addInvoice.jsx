import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ItemTable from "./itemtable";
import { add } from "./common/add";
import { FirebaseContext } from "../Firebase";
import firebase from "firebase";

const getClientByName = (clients, name) => {
  const arr = Object.entries(clients).find(
    client => client[1].clientName === name
  );
  return { key: arr[0], client: arr[1] };
};

const getProductByName = (products, name) => {
  console.log(products);
  console.log(name);
  const arr = Object.entries(products).find(
    product => product[1].name === name
  );
  return { key: arr[0], product: arr[1] };
};

class Invoice extends Component {
  state = {
    allProducts: {},
    productNames: [],
    productsInInvoice: [],
    product: null,
    date: new Date(),
    clients: {},
    clientNames: []
  };

  componentWillMount() {
    const database = firebase.database();
    // const invoicesRef = database.ref("invoices");
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
  }

  render() {
    return this.state.clientNames.length > 0 ? (
      <FirebaseContext.Consumer>
        {firebase => (
          <div className="container">
            <form style={{ width: "100%", margin: "auto" }}>
              <div className="form-row">
                <div className="col">
                  <label htmlFor="clientSelect">Invoice to</label>

                  <select className="form-control" id="clientSelect">
                    {this.state.clientNames.map(client => (
                      <option key={client}>{client}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="date">Date</label>
                  <br />
                  <DatePicker
                    id="date"
                    className="form-control"
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: "0.5rem" }}>
                <label htmlFor="productSelect">Select product</label>
                <select
                  className="form-control"
                  id="productSelect"
                  onMouseUpCapture={() => this.handleProductSelect()}
                >
                  {this.state.productNames.map(product => (
                    <option key={product}>{product}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="col">
                  <label htmlFor="priceInput">Price</label>
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    placeholder="price"
                    id="priceInput"
                  />
                </div>
                <div className="col">
                  <label htmlFor="quantityInput">Quantity</label>
                  <input
                    className="form-control"
                    type="number"
                    name="quantity"
                    placeholder="quantity"
                    id="quantityInput"
                  />
                </div>
              </div>
              <button
                style={{
                  marginTop: "1rem",
                  width: "200px",
                  textAlign: "center"
                }}
                className="btn btn-primary"
                onClick={event => {
                  event.preventDefault();
                  this.handleAddProductButton();
                }}
              >
                Add
              </button>
            </form>
            <React.Fragment>
              <button
                style={{ marginTop: "1.5rem", width: "200px" }}
                onClick={() => this.handleSaveInvoiceClick(firebase)}
                className={
                  this.state.productsInInvoice.length === 0 ||
                  this.state.date === undefined
                    ? "btn btn-secondary"
                    : "btn btn-dark"
                }
              >
                Save Invoice
              </button>
              <div className="m-12" style={{ marginTop: "0.5rem" }}>
                <ItemTable
                  onProductDelete={this.handleProductDelete}
                  products={this.state.productsInInvoice}
                />
              </div>
            </React.Fragment>
          </div>
        )}
      </FirebaseContext.Consumer>
    ) : (
      <FirebaseContext.Consumer>{firebase => <div />}</FirebaseContext.Consumer>
    );
  }

  handleSaveInvoiceClick = firebase => {
    if (
      this.state.productsInInvoice.length === 0 ||
      this.state.date === undefined
    )
      return;

    const { clients, productsInInvoice, allProducts, date } = this.state;

    const clientName = document.getElementById("clientSelect").value;

    const clientKey = getClientByName(clients, clientName).key;

    const productsWithoutProducts = productsInInvoice.map(item => {
      let temp = { ...item };
      console.log("item");
      console.log(item);
      temp.product = getProductByName(
        allProducts,
        item.product.product.name
      ).key;
      return temp;
    });

    const total = productsInInvoice
      .map(product => product.subtotal)
      .reduce(add, 0);

    const invoice = {
      clientKey,
      products: productsWithoutProducts,
      date: date.getTime(),
      total
    };

    this.state.database.ref("invoices").push(invoice);

    this.props.history.push("/invoices");
    window.location.reload();
  };

  handleProductDelete = product => {
    const productsInInvoice = this.state.productsInInvoice.filter(
      i => i !== product
    );
    this.setState({ productsInInvoice });
  };

  handleAddProductButton = () => {
    const quantity = parseFloat(document.getElementById("quantityInput").value);
    const price = parseFloat(document.getElementById("priceInput").value);
    if (!price || !quantity) return;
    const productName = document.getElementById("productSelect").value;
    const product = getProductByName(this.state.allProducts, productName)
      .product;
    const subtotal = quantity * price;

    let productsInInvoice = [...this.state.productsInInvoice];
    productsInInvoice.push({
      product: { product },
      quantity,
      price,
      subtotal
    });

    this.setState({ productsInInvoice });
  };

  handleProductSelect = () => {
    const productName = document.getElementById("productSelect").value;
    const product = getProductByName(this.state.allProducts, productName)
      .product;
    document.getElementById("priceInput").value = product.sellingPrice;
    this.setState({ product });
  };

  handleDateChange = newDate => {
    this.setState({
      date: newDate
    });
  };
}

export default Invoice;

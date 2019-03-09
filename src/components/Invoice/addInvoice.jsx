import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllItems, getItemByName } from "./items";
import { getAllClients, getClientByName } from "./clients";
import ItemTable from "./itemtable";
import { add } from "./common/add";
import { FirebaseContext } from "../Firebase";
import firebase from "firebase";

class Invoice extends Component {
  state = {
    allItems: getAllItems(),
    itemsNames: getAllItems().map(item => item.name),
    items: [],
    item: null,
    clientNames: getAllClients().map(client => client.name)
  };

  componentDidMount() {
    const database = firebase.database().ref("invoices");
    this.setState({ database });
  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <div className="container">
            <form style={{ width: "100%", margin: "auto" }}>
              <div className="form-row">
                <div className="col">
                  <label for="clientSelect">Invoice to</label>

                  <select className="form-control" id="clientSelect">
                    {this.state.clientNames.map(client => (
                      <option key={client}>{client}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label for="date">Date</label>
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
                <label for="itemSelect">Select Item</label>
                <select
                  className="form-control"
                  id="itemSelect"
                  onMouseUpCapture={() => this.handleItemSelect()}
                >
                  {this.state.itemsNames.map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="col">
                  <label for="priceInput">Price</label>
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    placeholder="price"
                    id="priceInput"
                  />
                </div>
                <div className="col">
                  <label for="quantityInput">Quantity</label>
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
                  this.handleAddItemButton();
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
                  this.state.items.length === 0 || this.state.date === undefined
                    ? "btn btn-secondary"
                    : "btn btn-dark"
                }
              >
                Save Invoice
              </button>
              <div className="m-12" style={{ marginTop: "0.5rem" }}>
                <ItemTable
                  onItemDelete={this.handleItemDelete}
                  items={this.state.items}
                />
              </div>
            </React.Fragment>
          </div>
        )}
      </FirebaseContext.Consumer>
    );
  }

  handleSaveInvoiceClick = firebase => {
    const clientName = document.getElementById("clientSelect").value;
    const client = getClientByName(clientName);
    const total = this.state.items.map(item => item.subtotal).reduce(add, 0);
    //TODO: update client profit += total
    const invoice = {
      client,
      items: this.state.items,
      date: this.state.date,
      total
    };
    if (this.state.items.length === 0 || this.state.date === undefined) return;
    //TODO: update invoices with current invoice
    console.log(firebase);
    this.state.database.push(invoice);

    console.log(invoice);
  };

  handleItemDelete = item => {
    const items = this.state.items.filter(i => i !== item);
    this.setState({ items });
  };

  handleAddItemButton = () => {
    const quantity = parseFloat(document.getElementById("quantityInput").value);
    const price = parseFloat(document.getElementById("priceInput").value);
    const itemName = document.getElementById("itemSelect").value;
    const item = getItemByName(itemName);
    const subtotal = quantity * price;
    if (!price || !quantity) return;
    let items = [...this.state.items];
    items.push({ item, quantity, price, subtotal });
    this.setState({ items });
  };

  handleItemSelect = () => {
    const itemName = document.getElementById("itemSelect").value;
    const item = getItemByName(itemName);
    document.getElementById("priceInput").value = item.sellingPrice;
    this.setState({ item });
  };

  handleDateChange = newDate => {
    this.setState({
      date: newDate
    });
  };
}

export default Invoice;

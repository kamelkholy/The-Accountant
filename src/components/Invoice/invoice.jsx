import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllItems, getItemByName } from "./items";
import { getAllClients, getClientByName } from "./clients";
import ItemTable from "./itemtable";
import { add } from "./common/add";

class Invoice extends Component {
  state = {
    allItems: getAllItems(),
    itemsNames: getAllItems().map(item => item.name),
    items: [],
    item: null,
    clientNames: getAllClients().map(client => client.name)
  };

  render() {
    return (
      <React.Fragment>
        <div className="row m-1">
          <div className="col-5">
            Invoice to
            <select className="m-2" id="clientSelect">
              {this.state.clientNames.map(client => (
                <option key={client}>{client}</option>
              ))}
            </select>
            Date
            <DatePicker
              className="m-2"
              selected={this.state.date}
              onChange={this.handleDateChange}
            />
          </div>
          <div className="col">
            Add Item
            <select
              className="m-2"
              id="itemSelect"
              onMouseUpCapture={() => this.handleItemSelect()}
            >
              {this.state.itemsNames.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <input
              type="number"
              name="price"
              placeholder="price"
              id="priceInput"
            />
            <input
              className="m-2"
              type="number"
              name="quantity"
              placeholder="quantity"
              id="quantityInput"
            />
            <button
              className="btn btn-primary"
              onClick={() => this.handleAddItemButton()}
            >
              Add
            </button>
          </div>
        </div>
        <div className="m-2">
          <ItemTable
            onItemDelete={this.handleItemDelete}
            items={this.state.items}
          />
          <button
            onClick={this.handleSaveInvoiceClick}
            className={
              this.state.items.length === 0 || this.state.date === undefined
                ? "btn btn-danger"
                : "btn btn-primary"
            }
          >
            Save Invoice
          </button>
        </div>
      </React.Fragment>
    );
  }

  handleSaveInvoiceClick = () => {
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

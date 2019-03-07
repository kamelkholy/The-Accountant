import React, { Component } from "react";
import ItemTable from "./itemtable";
import { getAllInvoices } from "./invoices";
import DatePicker from "react-datepicker";
class InvoiceViewer extends Component {
  state = {
    invoiceNumber: 0,
    allInvoices: [],
    currentInvoice: {}
  };

  componentDidMount() {
    const { invoiceNumber } = this.state;
    const allInvoices = getAllInvoices();
    const currentInvoice = allInvoices[invoiceNumber];
    this.setState({ allInvoices, currentInvoice });
  }

  handlePreviousClick = () => {
    let { invoiceNumber, allInvoices } = this.state;
    if (invoiceNumber === 0) return;
    invoiceNumber -= 1;
    const currentInvoice = allInvoices[invoiceNumber];
    this.setState({ invoiceNumber, currentInvoice });
    document.getElementById("invoiceNumberInput").value = invoiceNumber;
  };

  handleNextClick = () => {
    let { invoiceNumber, allInvoices } = this.state;
    if (invoiceNumber === this.state.allInvoices.length - 1) return;
    invoiceNumber += 1;
    const currentInvoice = allInvoices[invoiceNumber];
    this.setState({ invoiceNumber, currentInvoice });
    document.getElementById("invoiceNumberInput").value = invoiceNumber;
    console.log(invoiceNumber);
  };

  handleInvoiceNumberChange = () => {
    const invoiceNumber = parseInt(
      document.getElementById("invoiceNumberInput").value
    );
    if (
      !(invoiceNumber >= 0 && invoiceNumber < this.state.allInvoices.length)
    ) {
      if (invoiceNumber)
        document.getElementById(
          "invoiceNumberInput"
        ).value = this.state.invoiceNumber;
      return;
    }

    console.log(invoiceNumber);
    let { allInvoices } = this.state;
    const currentInvoice = allInvoices[invoiceNumber];
    this.setState({ currentInvoice, invoiceNumber });
  };

  render() {
    return (
      <div>
        <div class="row" style={{ width: "100%" }}>
          <div class="col-sm-4">
            <button
              onClick={this.handlePreviousClick}
              className="page-link float-right"
              style={{ width: "100px" }}
            >
              Previous
            </button>
          </div>
          <div class="col-sm-4">
            <input
              className="form-control"
              defaultValue={this.state.invoiceNumber}
              onChange={this.handleInvoiceNumberChange}
              placeholder={"0 - " + (this.state.allInvoices.length - 1)}
              id="invoiceNumberInput"
            />
          </div>
          <div class="col-sm-4">
            <button
              onClick={this.handleNextClick}
              className="page-link"
              style={{ width: "100px" }}
            >
              Next
            </button>
          </div>
        </div>

        {Object.keys(this.state.currentInvoice).length > 0 ? (
          <div>
            <div
              className="row"
              style={{ width: "100%", backgroundColor: "#f8f9fa" }}
            >
              <div className="col-sm-6">
                <strong>Date:</strong>{" "}
                {this.state.currentInvoice.date.toDateString()}
                {/* <DatePicker
                className="form-control"
                selected={this.state.currentInvoice.date}
                readOnly
              /> */}
              </div>
              <div className="col-sm-6">
                <strong>Client:</strong> {this.state.currentInvoice.client.name}
                {/* <input
                value={this.state.currentInvoice.client.name}
                className="form-control float-right"
                readOnly
              /> */}
              </div>
            </div>

            <ItemTable items={this.state.currentInvoice.items} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default InvoiceViewer;

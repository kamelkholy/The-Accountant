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
      <React.Fragment>
        <div className="m-2" style={{ display: "flex" }}>
          <button
            onClick={this.handlePreviousClick}
            className="btn btn-primary"
          >
            Previous
          </button>
          <input
            className="m-2 form-control"
            defaultValue={this.state.invoiceNumber}
            onChange={this.handleInvoiceNumberChange}
            placeholder={"0 - " + (this.state.allInvoices.length - 1)}
            id="invoiceNumberInput"
          />
          <button onClick={this.handleNextClick} className="btn btn-primary">
            Next
          </button>
        </div>

        {Object.keys(this.state.currentInvoice).length > 0 ? (
          <div>
            <div className="row">
              <DatePicker
                className="m-2 form-control"
                selected={this.state.currentInvoice.date}
                readOnly
              />
              <input
                value={this.state.currentInvoice.client.name}
                className="col m-2 form-control"
                readOnly
              />
            </div>
            <ItemTable items={this.state.currentInvoice.items} />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default InvoiceViewer;

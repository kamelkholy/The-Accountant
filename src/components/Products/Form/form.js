import React, { Component } from "react";

class Form extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h2>{this.props.title}</h2>
        <form style={{ maxWidth: 300 + "px" }}>
          <div className="form-group">
            <label for="name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Product Name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label for="purchasePrice">Purchase Price</label>
            <input
              className="form-control"
              id="purchasePrice"
              placeholder="Purchase Price"
              name="purchasePrice"
            />
          </div>
          <div className="form-group">
            <label for="sellingPrice">Selling Price</label>
            <input
              className="form-control"
              id="sellingPrice"
              placeholder="Selling Price"
              name="sellingPrice"
            />
          </div>
          <div className="form-group">
            <label for="quantity">Quantity</label>
            <input
              className="form-control"
              id="quantity"
              placeholder="Quantity"
              name="quantity"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;

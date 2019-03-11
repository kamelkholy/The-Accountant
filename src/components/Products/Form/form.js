import React, { Component } from "react";

class Form extends Component {
  state = {
    data: {}
  };
  componentDidMount() {
    this.setState({ data: this.props.data });
  }
  render() {
    return (
      <div className="container">
        <h2>{this.props.title}</h2>
        <form style={{ maxWidth: 300 + "px" }}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Product Name"
              name="name"
              value={this.state.data.name}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              id="purchasePrice"
              placeholder="Purchase Price"
              name="purchasePrice"
              value={this.state.data.purchasePrice}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              id="sellingPrice"
              placeholder="Selling Price"
              name="sellingPrice"
              value={this.state.data.sellingPrice}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              id="stock"
              placeholder="Stock"
              name="stock"
              value={this.state.data.stock}
              onChange={this.handleChange.bind(this)}
            />
          </div>

          <button
            onClick={e => {
              e.preventDefault();
              return this.handleSubmit();
            }}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
  handleSubmit() {
    this.props.operation(this.state.data);
  }
  handleChange(e) {
    let data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  }
}

export default Form;

import React, { Component } from "react";
import Form from "../Form/form";
import firebase from "firebase";

class Add extends Component {
  state = {};
  render() {
    return (
      <div>
        {(() => {})()}
        <Form
          data={{}}
          title="Add Product"
          operation={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
  handleSubmit(data) {
    firebase
      .database()
      .ref("products")
      .push(data);
    this.props.history.push("/products");
  }
}

export default Add;

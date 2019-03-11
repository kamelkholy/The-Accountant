import React, { Component } from "react";
import Form from "../Form/form";
import firebase from "firebase";

class Edit extends Component {
  componentWillMount() {
    firebase
      .database()
      .ref(`products/${this.props.location.state.id}`)
      .on("value", snapshot => {
        let data = snapshot.val();
        data = data === null ? {} : data;
        console.log(data);
        this.setState({ data });
      });
  }
  state = {
    data: {}
  };
  render() {
    return (
      <div>
        <Form
          data={this.state.data}
          title="Edit Product"
          operation={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
  handleSubmit(data) {
    firebase
      .database()
      .ref(`products/${this.props.location.state.id}`)
      .set(data)
      .then(() => {
        this.props.history.push("/products");
      });
  }
}

export default Edit;

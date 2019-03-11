import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import firebase from "firebase";

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props.match.params.id);


    this.state = {
      formControl: {
        // id: this.props.id ? this.props.id : "",
        clientName: this.props.clientName ? this.props.clientName : "",
        phoneNumber: this.props.phoneNumber?this.props.phoneNumber : "",
        address : this.props.address?this.props.address:"",
        email : this.props.email?this.props.email : "",
        profit : this.props.profit?this.props.profit : ""
      }
    };
    if(props.match.params.id){
      const database = firebase.database();
      database
        .ref(`Clients/${props.match.params.id}`)
        .once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            
            this.setState({
              formControl : data
            });
           
        })
       // console.log(this.state)
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.EditHandler = this.EditHandler.bind(this);
    this.handleProfitChange = this.handleProfitChange.bind(this)
  }

  handleNameChange(event) {
    const formControl = this.state.formControl;
    formControl.clientName = event.target.value;
    this.setState({ formControl: formControl });
  }
  handlePhoneChange(event){
    const formControl = this.state.formControl;
    formControl.phoneNumber = event.target.value;
    this.setState({ formControl: formControl });
  }
  handleAddressChange(event){
    const formControl = this.state.formControl;
    formControl.address = event.target.value;
    this.setState({ formControl: formControl });
  }
  handleEmailChange(event){
    const formControl = this.state.formControl;
    formControl.email = event.target.value;
    this.setState({ formControl: formControl });
  }
  handleProfitChange(event){
    const formControl = this.state.formControl;
    formControl.profit = event.target.value;
    this.setState({ formControl: formControl });
  }
 

  handleSubmit(event) {
    event.preventDefault();
    // clientsDemo.push(this.state.formControl);
    const database = firebase.database();

    database
      .ref("Clients")
      .push({ 
        clientName: this.state.formControl.clientName,
        phoneNumber:this.state.formControl.phoneNumber,
        address : this.state.formControl.address,
        email : this.state.formControl.email,
        profit : this.state.formControl.profit
       });
    this.props.history.push("/clients");
  }


  EditHandler(event){
    event.preventDefault();
    const database = firebase.database();
    database
    .ref(`Clients/${this.props.match.params.id}`)
    .update({
      clientName: this.state.formControl.clientName,
      phoneNumber:this.state.formControl.phoneNumber,
      address : this.state.formControl.address,
      email : this.state.formControl.email,
      profit : this.state.formControl.profit
    })
    this.props.history.push("/clients");
  }
    
 

  render() {
    return (
      <div className="container">
        <form onSubmit = {this.props.match.params.id?this.EditHandler:this.handleSubmit} > 
          <div className="form-group">
            <label>Client Name:</label>
            <input
              className="form-control"
              type="text"
              value={this.state.formControl.clientName}
              onChange={this.handleNameChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              className="form-control"
              type="text"
              value={this.state.formControl.phoneNumber}
              onChange={this.handlePhoneChange}
            />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              className="form-control"
              type="text"
              value={this.state.formControl.address}
              onChange={this.handleAddressChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address:</label>
            <input
              className="form-control"
              type="email"
              value={this.state.formControl.email}
              onChange={this.handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label>Profit:</label>
            <input
              className="form-control"
              type="text"
              value={this.state.formControl.profit}
              onChange={this.handleProfitChange}
            />
          </div>
          {/* <div className="form-group">
              <label>Client id:</label>
              <input
                className="form-control form-control-lg"
                type="text"
                value={this.state.formControl.id}
                onChange={this.handleIdChange}
              />
            </div> */}
          <Button
            variant="primary"
            type="submit"
            >
            {this.props.match.params.id?"Edit Client":"Add Client"}
          </Button>
        </form>
      </div>
    );
  }
}

export default ClientForm;

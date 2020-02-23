import React from "react";
import { connect } from 'react-redux';

import { new_worker, worker_model } from "../models/add_worker_model.js";
import Loading_Button from '../small_components/Loading_button.js'
import styled from "styled-components";
class Add_Worker_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...worker_model,
    };
    this.handle_input = this.handle_input.bind(this);
  }

  handle_input(input, type) {
    this.setState({ [type]: input });
    // console.log({ input, type });
    this.props.handle_input(input, type);
  }

  handle_add_worker(e) {
    console.log("handle_add_worker!!");
    e.preventDefault();
    this.props.handle_add_worker(this.state);
  }

  render() {
    const {is_loading} = this.props.meta
    return (
      <div className="container">
        <form onSubmit={event => this.handle_add_worker(event)}>
          <div className="form-group row">
            <Label>First Name</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="text"
                name="firstname"
                value={this.state.firstname}
                required={true}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Last Name</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="text"
                name="lastname"
                required={true}
                value={this.state.lastname}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Street Address</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="text"
                name="street_address"
                value={this.state.street_address}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>City</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="text"
                name="city"
                value={this.state.city}
              />
            </div>
          </div>
          <div className="form-group row">
            <Label>State</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="text"
                name="state"
                value={this.state.state}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Zip</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="text"
                name="zip"
                value={this.state.zip}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Email address</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="email"
                name="email"
                value={this.state.email}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Phone Number</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="phone"
                name="phone"
                value={this.state.phone}
              />
            </div>
          </div>
          <div className="form-group row">
            <Label>Services</Label>
            <div className="col-6">
              <TextArea
                handle_input={this.handle_input}
                name="services"
                value={this.state.services}
                hint="Comma, seperated, list, of, services"
              />
            </div>
          </div>
          <br />
          <br />
          <div className="form-group">
            <div className="offset-sm-2 col-sm-4">
              <Loading_Button
                is_loading={is_loading}
                className="btn btn-lg btn-primary btn-block load_btn"
                name="submit"
                type="submit"
                text="Add Worker"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {...state}
}
export default connect(mapStateToProps)(Add_Worker_Form)


const Label = ({ children }) => (
  <label
    htmlFor="example-text-input"
    className="col-3 col-form-label justify_end"
  >
    {children}
  </label>
);

const Input = ({ name, type, value, handle_input, required }) => (
  <input
    onChange={event => handle_input(event.target.value, name)}
    type={type}
    value={value}
    className="form-control"
    required={required}

  />
);

const TextArea = ({ name, value, handle_input, required, hint }) => (
  <>
  <textarea
    onChange={event => handle_input(event.target.value, name)}
    value={value}
    className="form-control"
    required={required}
  />
  {hint&&
  <HintSpan>{hint}</HintSpan>
  }
  </>
);


const HintSpan = styled.span`
font-size:12px;
`
import React from "react";
import { connect } from "react-redux";

import API from "../API.js";

class New_Worker_Form extends React.Component {
  constructor(props) {
    super(props);
    // console.log('THS IS LOGIN FORM')
    // console.log(props)
    this.state = {
      company_name: "",
      services: "",
      primary_email: "",
      firstname: "",
      lastname: "",
      primary_phone: ""
    };
  }

  componentDidMount() {
    console.log("Mounted");
    console.log(this.props);
  }

  handle_input(input, type) {
    this.setState({ [type]: input });
    // console.log({ input, type });
    // this.props.handle_input(input, type)
  }

  async handle_submit(e) {
    const {
      company_name,
      services,
      primary_email,
      firstname,
      lastname,
      primary_phone
    } = this.state;
    const _csrf = this.props.meta.csrf;
    e.preventDefault();
    let newWorker = await API.add_worker({
      company_name,
      services,
      primary_email,
      firstname,
      lastname,
      primary_phone
    }, _csrf);
    console.log({ company_name, services, primary_email, firstname, lastname, primary_phone });
    console.log({ newWorker });

  }

  render() {
    return (
      <div className="container">
        <form onSubmit={event => this.handle_submit(event)}>
          <div className="form-group row">
            <label
              htmlFor="example-text-input"
              className="col-4 col-form-label"
            >
              Company Name
            </label>
            <div className="col-8">
              <input
                onChange={event =>
                  this.handle_input(event.target.value, "company_name")
                }
                className="form-control"
                type="text"
                name="company_name"
                value={this.state.company_name}
                placeholder="The Hive Co."
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="example-text-input"
              className="col-4 col-form-label"
            >
              Owner First Name
            </label>
            <div className="col-8">
              <input
                onChange={event =>
                  this.handle_input(event.target.value, "firstname")
                }
                className="form-control"
                type="text"
                name="firstname"
                value={this.state.firstname}
                placeholder="First Name"
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="example-text-input"
              className="col-4 col-form-label"
            >
              Owner Last Name
            </label>
            <div className="col-8">
              <input
                onChange={event =>
                  this.handle_input(event.target.value, "lastname")
                }
                className="form-control"
                type="text"
                name="lastname"
                value={this.state.lastname}
                placeholder="Lirst Name"
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="example-text-input"
              className="col-4 col-form-label"
            >
              Company Email
            </label>
            <div className="col-8">
              <input
                onChange={event =>
                  this.handle_input(event.target.value, "primary_email")
                }
                className="form-control"
                type="primary_email"
                name="primary_email"
                value={this.state.primary_email}
                placeholder="info@company.com"
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="example-text-input"
              className="col-4 col-form-label"
            >
              Company Phone
            </label>
            <div className="col-8">
              <input
                onChange={event =>
                  this.handle_input(event.target.value, "primary_phone")
                }
                className="form-control"
                type="number"
                name="primary_phone"
                value={this.state.primary_phone}
                placeholder="(808)-123-4567"
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="example-text-input"
              className="col-4 col-form-label"
            >
              List of Services Provided by {this.state.company_name}
            </label>
            <div className="col-8">
              <textarea
                onChange={event =>
                  this.handle_input(event.target.value, "services")
                }
                className="form-control"
                name="services"
                value={this.state.services}
                placeholder="commma, seperated, list, of, services"
              />
            </div>
          </div>

          <input type="hidden" name="_csrf" value={this.state._csrf} />

          <br />
          <br />
          <div className="form-group">
            <div className="offset-sm-2 col-sm-8">
              <input
                className="btn btn-lg btn-primary btn-block"
                name="submit"
                type="submit"
                value="Create New Worker Drone"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { user, csrf, locals, crowdsales, two_factor_auth } = state;
  return state;
}

export default connect(mapStateToProps)(New_Worker_Form);

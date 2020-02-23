import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";

import API from "../components/API.js";

import { ensure_loggedin } from "../components/utils/auth.js";

import Alt_Layout from "../layouts/Alt_Layout.js";
import Add_Project_Form from "../components/forms/Add_Project_Form.js";
class Account_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_project: {}
    };
    this.handle_input = this.handle_input.bind(this);
    this.handle_add_project = this.handle_add_project.bind(this);
  }
  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    return {};
  }

  /* Get form input */
  handle_input(input, type) {
    this.setState({ [type]: input });
  }
  async handle_add_project(data) {
    let new_project = await API.add_worker(data, this.props);
    console.log({ new_project });
    this.setState({ new_project });
  }
  render() {
    return (
      <Alt_Layout title="Add Project">
        <Add_Project_Form
          handle_input={this.handle_input}
          handle_add_project={this.handle_add_project}
        />
        {this.state.new_project.firstname && (
          <Go_To_New_project_Link worker={this.state.new_project} />
        )}
      </Alt_Layout>
    );
  }
}

function mapStateToProps(state) {
  const { user, meta } = state;
  return { user, meta };
}

export default connect(mapStateToProps)(withRouter(Account_Profile));

const Go_To_New_project_Link = ({ worker }) => {
  console.log({ worker });
  return (
    <div onClick={()=>Router.push(`/account-worker/${worker._id}`)} className="Go_To_New_project_Link">
      {worker.firstname} {worker.lastname}

      <Forward_Symbol />
    </div>
  );
};

const Forward_Symbol = () => {
  return (
    <svg viewBox="0 0 10 10">
      <line
        strokeLinecap="round"
        x1="9"
        y1="5"
        x2="0"
        y2="-5"
        stroke="black"
      />
      <line
        strokeLinecap="round"
        x1="9"
        y1="5"
        x2="0"
        y2="15"
        stroke="black"
      />
    </svg>
  );
};

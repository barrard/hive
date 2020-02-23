import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import fetch from "isomorphic-fetch";

import API from "../components/API.js";
import { ensure_loggedin } from "../components/utils/auth.js";

import Main_Layout from "../layouts/Main_Layout.js";
class Account_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    const { query } = ctx;

    return { proposal_id: query.proposal_id };
  }

  render() {
    // console.log(this.props)
    return (
      <Main_Layout>
        <h1>{this.props.proposal_id}</h1>
      </Main_Layout>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(withRouter(Account_Profile));

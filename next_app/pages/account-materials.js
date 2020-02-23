import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import Materials_Nav from "../components/Material_Components/Materials_Nav.js";

import { ensure_loggedin } from "../components/utils/auth.js";

import Main_Layout from "../layouts/Main_Layout.js";
class Account_Materials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    return {};
  }
  render() {
    // console.log(this.props)
    return (
      <Main_Layout>
        <Materials_Nav />
      </Main_Layout>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(withRouter(Account_Materials));

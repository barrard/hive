import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";

import { ensure_loggedin } from "../components/utils/auth.js";

import Main_Layout from "../layouts/Main_Layout.js";
class Account_Profile extends React.Component {
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
        <h1>Account Overview</h1>

        {/* Action buttons */}
        <AddWorkerButton />
        <AddProposalButton />
        <AddProjectButton />
      </Main_Layout>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps)(withRouter(Account_Profile));

/* Add user action button */

const AddWorkerButton = ( ) => {
  return (
    <button onClick={()=>Router.push("/add-worker")}>
      Add Worker
    </button>
  );
};


const AddProposalButton = () => {
  return (
    <button onClick={()=>Router.push("/add-proposal")}>
      Add Proposal
    </button>
  );
};


const AddProjectButton = () => {
  return (
    <button onClick={()=>Router.push("/add-project")}>
      Add Project
    </button>
  );
};

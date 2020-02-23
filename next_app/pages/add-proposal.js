import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { is_loading } from "../redux/actions/meta_actions.js";
import { add_new_proposal } from "../redux/actions/proposals_actions.js";

import API from "../components/API.js";

import { ensure_loggedin } from "../components/utils/auth.js";

import Alt_Layout from "../layouts/Alt_Layout.js";
import Add_Proposal_Form from "../components/forms/Add_Proposal_Form.js";
class Account_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_proposal_resp: false
    };
    this.handle_input = this.handle_input.bind(this);
    this.handle_add_proposal = this.handle_add_proposal.bind(this);
  }
  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    return {};
  }

  /* Get form input */
  handle_input(input, type) {
    this.setState({ [type]: input });
  }
  async handle_add_proposal(new_proposal) {
    console.log(new_proposal);
    if (!new_proposal) return;
    this.props.dispatch(is_loading(true));
    let new_proposal_resp = await API.add_proposal(new_proposal, this.props);
    console.log({ new_proposal_resp });
    if(!new_proposal_resp.err){
      this.props.dispatch(add_new_proposal(new_proposal_resp))
      this.setState({new_proposal_resp})
    }
  }
  render() {
    return (
      <Alt_Layout title="Add Proposal">
        <Add_Proposal_Form
          handle_input={this.handle_input}
          handle_add_proposal={new_proposal =>
            this.handle_add_proposal(new_proposal)
          }
        />
        {this.state.new_proposal_resp && (
          <Go_To_New_proposal_Link worker={this.props.workers.selected_worker}
            proposal={this.state.new_proposal_resp} />
        )}
      </Alt_Layout>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(withRouter(Account_Profile));

const Go_To_New_proposal_Link = ({ worker, proposal }) => {
  console.log({ worker, proposal });
  return (
    <div onClick={()=>Router.push(`/account-proposal/${proposal._id}`)} className="Go_To_New_Proposal_Link">
      New Proposal for {worker.firstname} {worker.lastname}

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

import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";

import { ensure_loggedin } from "../components/utils/auth.js";

import Main_Layout from "../layouts/Main_Layout.js";
import Filter_Select from "../components/small_components/Filter_Select.js";
import Proposal_Details_View from "../components/small_components/Proposal_Details_View.js";
import Proposal_List from "../components/small_components/Proposal_List.js";
import {
  set_proposals,
  set_selected_proposal,
  set_updated_proposal
} from "../redux/actions/proposals_actions.js";
class Account_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals_filter: ["Proposal", "Project"]
    };
    this.onFilterProposals = this.onFilterProposals.bind(this);
    this.onProposalSelect = this.onProposalSelect.bind(this);
    this.onUpdatedProposal = this.onUpdatedProposal.bind(this);
    this.get_worker = this.get_worker.bind(this);
  }
  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    return {};
  }

  onFilterProposals(e) {
    console.log(e);
    console.log("onFilterProposals");
  }

  onProposalSelect(proposal) {
    console.log("onProposalSelect");
    console.log(proposal);
    this.props.dispatch(set_selected_proposal(proposal));
  }
  onUpdatedProposal(proposal) {
    console.log({ proposal });
    this.props.dispatch(set_updated_proposal(proposal));
    this.props.dispatch(set_selected_proposal(proposal));
  }

  get_worker() {
    let worker_index = this.props.workers.workers.findIndex(
      worker => worker._id == this.props.proposals.selected_proposal.worker
    );
    let worker = this.props.workers.workers[worker_index];
    console.log({ worker_index, worker });
    return worker;
  }

  render() {
    // console.log(this.props)
    return (
      <Main_Layout>
        <div className="row ">
          <div className="col-sm-4 flex_center">
            <Filter_Select
              onSelect={this.onFilterProposals}
              data={this.state.proposals_filter}
              id={"proposalFilterSelect"}
              label={"Filter By"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4 ">
            <Proposal_List
              onProposalSelect={this.onProposalSelect}
              proposals={this.props.proposals.proposals}
            />
          </div>
          <div className="col-sm-8">
            <Proposal_Details_View
              materials={this.props.materials}
              workers={this.props.workers.workers}
              worker={this.get_worker()}
              updatedProposal={this.onUpdatedProposal}
              csrf={this.props.meta.csrf}
              proposal={this.props.proposals.selected_proposal}
            />
          </div>
        </div>
      </Main_Layout>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(withRouter(Account_Profile));

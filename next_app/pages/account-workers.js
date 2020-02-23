import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import fetch from "isomorphic-fetch";
import Filter_Select from "../components/small_components/Filter_Select.js";
import Worker_List from "../components/small_components/Worker_List.js";
import Worker_Details_View from "../components/small_components/Worker_Details_View.js";
import { ensure_loggedin } from "../components/utils/auth.js";

import Main_Layout from "../layouts/Main_Layout.js";
import {
  set_workers,
  set_selected_worker, set_updated_worker
} from "../redux/actions/workers_actions.js";
import API from "../components/API.js";

/* import workers detalis context */
const User_Context = React.createContext("light");

class Account_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers_filter: ["Name", "Project"]
    };
    this.onFilterWorkers = this.onFilterWorkers.bind(this);
    this.onWorkerSelect = this.onWorkerSelect.bind(this);
    this.onUpdatedWorker = this.onUpdatedWorker.bind(this)
  }

  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    const { query, store } = ctx;
    // const state = store.getState();

    return {};
  }

  onFilterWorkers(e) {
    console.log(e);
    console.log("onFilterWorkers");
  }

  onWorkerSelect(worker) {
    console.log("onWorkerSelect");
    console.log(worker);
    this.props.dispatch(set_selected_worker(worker));
  }
  onUpdatedWorker(worker){
    console.log({worker})
    this.props.dispatch(set_updated_worker(worker));
    this.props.dispatch(set_selected_worker(worker));

  }
  render() {
    // console.log("```````````````");
    // console.log(this.props.state.workers.workers);
    // console.log("```````````````");
    return (
      <Main_Layout>
        {/* sort by row, with selector */}
        <div className="row ">
          <div className="col-sm-4 flex_center">
            <Filter_Select
              onSelect={this.onFilterWorkers}
              data={this.state.workers_filter}
              id={"workerFilterSelect"}
              label={"Filter By"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 ">
            <Worker_List
              onWorkerSelect={this.onWorkerSelect}
              workers={this.props.workers.workers}
            />
          </div>
          <div className="col-sm-8">
            <User_Context.Provider value>
              <Worker_Details_View
                updatedWorker={this.onUpdatedWorker}
                csrf={this.props.meta.csrf}
                worker={this.props.workers.selected_worker}
              />
            </User_Context.Provider>
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

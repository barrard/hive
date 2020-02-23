import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import fetch from "isomorphic-fetch";
import {
  set_workers,
  set_selected_worker, set_updated_worker
} from "../redux/actions/workers_actions.js";

import { ensure_loggedin } from "../components/utils/auth.js";
import WorkerView from '../components/workerComponents/WorkerView'
import Main_Layout from "../layouts/Main_Layout.js";
import API from '../components/API.js'
class Account_Worker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onUpdatedWorker = this.onUpdatedWorker.bind(this)

  }

  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    const { query, store } = ctx;
    const state = store.getState();
    let worker = await API.get_worker(ctx, query.worker_id)
    console.log({worker})
    store.dispatch(set_selected_worker(worker));

    return { worker };
  }

  onUpdatedWorker(worker){
    console.log({worker})
    this.props.dispatch(set_updated_worker(worker));
    this.props.dispatch(set_selected_worker(worker));

  }

  render() {
    console.log(this.props)
    console.log('this.props')
    let worker = this.props.workers.selected_worker

    console.log({worker})
    // let worker={}
    return (
      <Main_Layout>
        <h1>{worker._id}</h1>
        <WorkerView 
                        updatedWorker={this.onUpdatedWorker}
                        csrf={this.props.meta.csrf}
                        worker={worker}
        />
      </Main_Layout>
    );
  }
}

function mapStateToProps(state) {
  const {} = state;
  return state;
}

export default connect(mapStateToProps)(withRouter(Account_Worker));

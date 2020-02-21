import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'next/router';
import fetch from "isomorphic-fetch";
import API from '../components/API.js'
import {ensure_loggedin} from '../components/utils/auth.js'

import New_Worker_Form from "../components/forms/New_Worker_Form.js";
import WorkerList from '../components/workerComponents/workerList.js'
import Main_Layout from '../layouts/Main_Layout.js';
class Landing_Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  static async getInitialProps(ctx) {
    let state = ctx.store.getState()
    ensure_loggedin(ctx)
    
    let workers = await API.get_workers(ctx)
    console.log(workers)
        return {workers}
  }

  render(){
      console.log(this.props)
    return(
      <Main_Layout>
      Welcome to Hive

<New_Worker_Form/>

<WorkerList workers={this.props.workers}/>

      </Main_Layout>
    )
  }
}


function mapStateToProps(state) {
  // const { user, csrf, locals, crowdsales, two_factor_auth } = state;
  return {  };
}


export default connect(mapStateToProps)(withRouter(Landing_Page));
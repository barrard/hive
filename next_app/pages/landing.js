import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'next/router';


import Main_Layout from '../layouts/Main_Layout.js';
class Landing_Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={}
  }
  render(){
    let is_loggedin = this.props.user.is_loggedin;
    console.log('this.props')

console.log(this.props)
    return(
      <Main_Layout>
        {is_loggedin &&
  <p>Hello {this.props.user.user.primary_email} </p>
        }
        {!is_loggedin &&
      <p>Please login</p>

        }
      </Main_Layout>
    )
  }
}


function mapStateToProps(state) {
  const { user } = state;
  return { user };
}


export default connect(mapStateToProps)(withRouter(Landing_Page));
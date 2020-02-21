import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Main_Head from "../components/Main_Head.js";
import Main_Nav from "../components/Main_Nav.js";
import Main_Footer from "../components/Main_Footer.js";

import { Fragment } from "react";
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {


  }
  render() {
    return (
      <div>
        <Main_Head />

        <Main_Nav />
        <Fragment>
          <main>{this.props.children}</main>
        </Fragment>
        <Main_Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const {   } = state;
  return {   };
}

export default connect(mapStateToProps)(withRouter(Layout));

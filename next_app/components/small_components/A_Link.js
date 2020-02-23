import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Router from "next/router";

import Link from "next/link";
class A_Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <Go_To_New_Worker_Button />
    );
  }
}

function mapStateToProps(state) {
  return {...state}
}

export default connect(mapStateToProps)(withRouter(A_Link));

const Forward_Button = () => (
  <>
    <Forward_Symbol />
    Forward
  </>
);

const Forward_Symbol = () => {
  return (
    <svg viewBox="0 0 10 10">
      <line x1="0" y1="5" x2="10" y2="-5" stroke="black" />
      <line x1="0" y1="5" x2="10" y2="15" stroke="black" />
    </svg>
  );
};

const Go_To_New_Worker_Button = ({worker}) => (
  <>
    <Forward_Symbol />
    {worker.firstname}
  </>
);

const Back_Symbol = () => {
  return (
    <svg viewBox="0 0 10 10">
      <line x1="0" y1="5" x2="10" y2="-5" stroke="black" />
      <line x1="0" y1="5" x2="10" y2="15" stroke="black" />
    </svg>
  );
};





export default A_Link
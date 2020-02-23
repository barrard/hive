import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Router from "next/router";

import Link from "next/link";
class Main_Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    };
  }

  render() {

    return (
      <nav className="altNav">
        <ul className="nav justify-content-center">
          <li onClick={() => Router.back()} className="back_button">
            <Back_Button />
          </li>
          <li className="nav-item">{this.state.title}</li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps)(withRouter(Main_Nav));

const Back_Button = () => (
  <>
    <Back_Symbol />
    BACK
  </>
);
const Back_Symbol = ({ path }) => {
  return (
    <svg viewBox="0 0 10 10">
      <line x1="1" y1="5" x2="10" y2="-5" stroke="black" />
      <line x1="1" y1="5" x2="10" y2="15" stroke="black" />
    </svg>
  );
};

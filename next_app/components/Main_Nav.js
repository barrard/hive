import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Router from "next/router";

import Link from "next/link";
class Main_Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let is_loggedin = this.props.user.is_loggedin;
    // console.log({ is_loggedin });
    // console.log(this.props)
    let { pathname } = this.props.router;

    return (
      <nav className="mainNav">
        <ul className="nav justify-content-center nav-pills">
          {!is_loggedin && <Home_Link pathname={pathname} />}
          {!is_loggedin && <Register_Login_Links pathname={pathname} />}
          {is_loggedin && <Logout_Link pathname={pathname} />}
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

const Home_Link = ({ pathname }) => (
  <li>
    <Link prefetch href="/landing" as="/">
      <a
        className={`${
          pathname == "/landing" ? "active " : " "
        }" nav-link dropdown-item"`}
      >
        Home
      </a>
    </Link>
  </li>
);

const Logout_Link = ({ pathname }) => (
  <>
    <li onClick={() => Router.back()} className="back_button">
      <Back_Button />
    </li>
    <li>
      <Link href="/account-overview">
        <a
          className={`${
            pathname == "/account-overview" ? "active " : " "
          }" nav-link dropdown-item"`}
        >
          Overview
        </a>
      </Link>
    </li>
    <li>
      <Link href="/account-projects">
        <a
          className={`${
            pathname == "/account-projects" ? "active " : " "
          }" nav-link dropdown-item"`}
        >
          Projects
        </a>
      </Link>
    </li>
    <li>
      <Link href="/account-proposals">
        <a
          className={`${
            pathname == "/account-proposals" ? "active " : " "
          }" nav-link dropdown-item"`}
        >
          Proposals
        </a>
      </Link>
    </li>
    <li>
      <Link href="/account-workers">
        <a
          className={`${
            pathname == "/account-workers" ? "active " : " "
          }" nav-link dropdown-item"`}
        >
          Workers
        </a>
      </Link>
    </li>
    <li>
      <Link href="/account-materials">
        <a
          className={`${
            pathname == "/account-materials" ? "active " : " "
          }" nav-link dropdown-item"`}
        >
          Materials
        </a>
      </Link>
    </li>
    <li>
      <Link href="/auth/logout">
        <a
          className={`${
            pathname == "/auth/logout" ? "active " : " "
          }" nav-link dropdown-item"`}
        >
          Logout
        </a>
      </Link>
    </li>
  </>
);

const Register_Login_Links = ({ pathname }) => (
  <>
    <li>
      <Link prefetch href="/login">
        <a
          className={`${
            pathname == "/login" ? "active " : " "
          }" nav-link dropdown-item"`}
        >
          Login
        </a>
      </Link>
    </li>
    <li>
      <Link prefetch href="/sign-up">
        <a
          className={`${
            pathname == "/sign-up" ? "active " : " "
          }" nav-link dropdown-item"`}
        >
          Sign Up
        </a>
      </Link>
    </li>
  </>
);

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

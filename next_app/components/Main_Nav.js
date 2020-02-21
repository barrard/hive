import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import Link from "next/link";
class Main_Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let is_loggedin = this.props.user.is_loggedin;
    console.log({ is_loggedin });
    let { pathname } = this.props.router;

    return (
      <nav>
        <ul>
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
          {!is_loggedin && <Register_Login_Links pathname={pathname}/>}
          {is_loggedin && <Logout_Link pathname={pathname}/>}
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

const Logout_Link = ({pathname}) => (
<>
<li>
    <Link  href="/account-profile">
      <a
        className={`${
          pathname == "/account-profile" ? "active " : " "
        }" nav-link dropdown-item"`}
      >
        Profile
      </a>
    </Link>
  </li>
  <li>
    <Link  href="/hive">
      <a
        className={`${
          pathname == "/hive" ? "active " : " "
        }" nav-link dropdown-item"`}
      >
        HIVE
      </a>
    </Link>
  </li>
  <li>
    <Link  href="/auth/logout">
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

const Register_Login_Links = ({pathname}) => (
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

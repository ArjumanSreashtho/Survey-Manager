import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Payment from "../payment/Payment";

class Header extends React.Component {
  renderContent() {
    console.log("Header 1 ", this.props.auth);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/api/auth/google">Login With Google</a>;
      default:
        return <a href="/api/user/signout">Logout</a>;
    }
  }

  render() {
    console.log("User", this.props.auth);

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link
              to="/"
              className="left brand-logo"
              style={{ marginLeft: "1rem" }}
            >
              Survey Manager
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>{this.props.auth ? <Payment /> : ""}</li>
              <li>
                {this.props.auth ? (
                  <div style={{ margin: "0 1rem" }}>
                    Credits: {this.props.auth.credits}
                  </div>
                ) : (
                  ""
                )}
              </li>
              <li>
                {this.props.auth ? <Link to="/surveys">Surveys</Link> : ""}
              </li>
              <li>{this.renderContent()}</li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Header);

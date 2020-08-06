import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./actions/actions";
import "./App.css";

import Header from "./component/header/Header";
import Dashboard from "./component/dashboard/Dashboard";
import SurveyNew from "./component/survey/SurveyNew";
import Home from "./component/home/Home";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);

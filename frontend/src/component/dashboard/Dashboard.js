import React from "react";
import { Link } from "react-router-dom";

import SurverList from "../survey/SurveyList";

const Dashboard = () => {
  return (
    <div>
      <h2>Survey List</h2>
      <SurverList />
      <div className="fixed-action-btn">
        <Link
          to="/surveys/new"
          className="btn-floating  waves-effect waves-light red btn-large"
          style={{ right: "auto", marginRight: "2rem" }}
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};
export default Dashboard;

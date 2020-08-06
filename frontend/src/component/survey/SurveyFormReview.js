import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import * as actions from "../../actions/actions";
import FIELD from "./formField";

const SurveyFormReview = (props) => {
  return (
    <div>
      <h5>Please Confirm your entries.</h5>
      <div>
        {FIELD.map((field) => {
          return (
            <div key={field.name}>
              <label>{field.label}</label>
              <div>{props.formValues[field.name]}</div>
            </div>
          );
        })}
      </div>
      <button
        className="red btn-flat white-text"
        style={{ marginTop: "1rem" }}
        onClick={props.onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        style={{ marginTop: "1rem" }}
        onClick={() => props.submitSurvey(props.formValues, props.history)}
      >
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

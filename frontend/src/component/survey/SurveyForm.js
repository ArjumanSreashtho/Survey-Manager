import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import emailCheck from "../../util/emailCheck";
import FIELD from "./formField";

class SurveyForm extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {FIELD.map((field) => {
            return (
              <Field
                key={field.name}
                name={field.name}
                label={field.label}
                type="text"
                component={SurveyField}
              />
            );
          })}
          <Link className="red btn-flat left white-text" to="/surveys">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  errors.recipients = emailCheck(values.recipients || "");

  FIELD.map((field) => {
    if (!values[field.name]) {
      errors[field.name] = `You must provide a value`;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);

import React from "react";

const SurveyFiled = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input {...props.input} />
      <div className="red-text" style={{ marginBottom: "1rem" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default SurveyFiled;

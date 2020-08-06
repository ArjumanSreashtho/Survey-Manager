import axios from "axios";

import { FETCH_USER, FETCH_SURVEYS } from "./action_types";

export const fetchUser = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/user/current_user");
    dispatch({ type: FETCH_USER, payload: response.data });
  };
};

export const handleToken = (token) => {
  return async (dispatch) => {
    const response = await axios.post("/api/payment/stripe", token);
    dispatch({ type: FETCH_USER, payload: response.data });
  };
};

export const submitSurvey = (values, history) => {
  return async (dispatch) => {
    const response = await axios.post("/api/survey/new", values);
    history.push("/surveys");
    dispatch({ type: FETCH_USER, payload: response.data });
  };
};

export const fetchSurveys = () => {
  return async (dispatch) => {
    const response = await axios.get("api/survey");
    dispatch({ type: FETCH_SURVEYS, payload: response.data });
  };
};

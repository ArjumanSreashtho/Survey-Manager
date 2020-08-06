import { FETCH_SURVEYS } from "../actions/action_types";

const surveysReducer = (state = [], action) => {
  if (action.type === FETCH_SURVEYS) {
    return action.payload || false;
  }
  return state;
};

export default surveysReducer;

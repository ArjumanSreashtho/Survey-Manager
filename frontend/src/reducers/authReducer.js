import { FETCH_USER } from "../actions/action_types";

const authReducer = (state = null, action) => {
  if (action.type === FETCH_USER) {
    console.log("Auth ", action.payload);
    return action.payload || false;
  }
  return state;
};

export default authReducer;

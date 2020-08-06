import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import "materialize-css/dist/css/materialize.min.css";
import App from "./App";
import redducers from "./reducers/reducers";

const initializeState = {};

const store = createStore(
  redducers,
  initializeState,
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

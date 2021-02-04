import { SET_DOMAINS } from "../actionTypes";

const initialState = "no Data";

const domains = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOMAINS: {
      return action.payload.response;
    }
    default: {
      return state;
    }
  }
};

export default domains;

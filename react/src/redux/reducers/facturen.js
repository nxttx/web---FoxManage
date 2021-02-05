import { SET_FACTUREN } from "../actionTypes";

const initialState = "no Data";

const facturen = (state = initialState, action) => {
  switch (action.type) {
    case SET_FACTUREN: {
      return action.payload.response;
    }
    default: {
      return state;
    }
  }
};

export default facturen;

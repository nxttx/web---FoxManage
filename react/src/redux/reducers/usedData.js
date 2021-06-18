import { SET_USEDDATA } from "../actionTypes";

const initialState = -1;

const usedData = (state = initialState, action) => {
  switch (action.type) {
    case SET_USEDDATA: {
      return action.payload.response;
    }
    default: {
      return state;
    }
  }
};

export default usedData;

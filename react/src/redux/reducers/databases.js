import { SET_DATABASES } from "../actionTypes";

const initialState = -1;

const databases = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATABASES: {
      return action.payload.response;
    }
    default: {
      return state;
    }
  }
};

export default databases;

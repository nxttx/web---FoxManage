import { SET_MAILBOXES } from "../actionTypes";

const initialState = -1;

const mailboxes = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAILBOXES: {
      return action.payload.response;
    }
    default: {
      return state;
    }
  }
};

export default mailboxes;

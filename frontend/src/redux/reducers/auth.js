import { GET_USER } from "../types";

const initialState = { user: {} };

export default function auth(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

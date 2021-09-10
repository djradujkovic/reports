import { GET_PAGES } from "../types";

const initialState = { pages: [] };

export default function pages(state = initialState, action) {
  switch (action.type) {
    case GET_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    default:
      return state;
  }
}

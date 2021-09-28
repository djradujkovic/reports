import { ADD, DELETE, GET, UPDATE } from "../types";

const initialState = {
  users: [],
  cities: [],
  projects: [],
  positions: [],
  reports: [],
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case GET:
      return {
        ...state,
        [action.page]: action.payload,
      };
    case ADD:
      return {
        ...state,
        [action.page]: [...state[action.page], action.payload],
      };
    case UPDATE:
      state[action.page] = state[action.page].map((user) => {
        if (user.id === action.payload.id) {
          user = action.payload;
        }
        return user;
      });
      return {
        ...state,
        [action.page]: state[action.page],
      };
    case DELETE:
      return {
        ...state,
        [action.page]: state[action.page].filter(
          (user) => user.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

import { GET_USER } from "../types";

export const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER,
    payload: {
      name: "djole",
      group: {
        name: "Admin",
        pages: ["users", "projects", "cities", "positions"],
      },
      loggedIn: true,
    },
  });
};

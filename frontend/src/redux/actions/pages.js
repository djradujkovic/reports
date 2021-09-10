import axios from "axios";
import { GET_PAGES } from "../types";

export const url = "http://localhost:8000";

export const getPages = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/pages/`);
    dispatch({
      type: GET_PAGES,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch(getPages());
  }
};

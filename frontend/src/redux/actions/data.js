import axios from "axios";

import { ADD, DELETE, GET, UPDATE } from "../types";
import { url } from "./pages";

export const getData = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/api/pages/${page}/`);
    dispatch({
      type: GET,
      payload: res.data,
      page: page,
    });
  } catch (err) {
    console.error(err);
    dispatch(getData(page));
  }
};

export const addData = (page, data) => async (dispatch) => {
  const res = await axios.post(`${url}/api/pages/${page}/post/`, data);
  dispatch({
    type: ADD,
    payload: res.data,
    page: page,
  });
};

export const updateData = (page, data) => async (dispatch) => {
  const res = await axios.post(
    `${url}/api/pages/${page}/${data.id}/update/`,
    data
  );
  dispatch({
    type: UPDATE,
    payload: res.data,
    page: page,
  });
};

export const deleteData = (page, id) => async (dispatch) => {
  await axios.delete(`${url}/api/pages/${page}/${id}/delete/`);
  dispatch({
    type: DELETE,
    payload: id,
    page: page,
  });
};

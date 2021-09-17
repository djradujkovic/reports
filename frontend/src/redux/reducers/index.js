import { combineReducers } from "redux";

import data from "./data";
import pages from "./pages";
import auth from "./auth";

export default combineReducers({ data, pages, auth });

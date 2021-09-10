import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getData } from "../redux/actions/data";

export const GetPages = () => useSelector((state) => state.pages.pages);
const GetPageByKey = (page) => {
  const pages = GetPages();
  return pages.find((p) => p.key === page);
};

export const GetData = (page) => useSelector((state) => state.data[page]);

export const GetDataById = (page, id) => GetData(page).find((p) => p.id === id);

export const GetForeigns = (page) => {
  const dispatch = useDispatch();
  const fields = GetPageByKey(page).fields;
  useEffect(() => {
    dispatch(getData(page));
  }, [dispatch, page]);
  fields.forEach((field) => {
    if (field.options) {
      GetForeigns(field.options);
    }
  });
};

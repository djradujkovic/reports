import { useSelector } from "react-redux";

const FindParent = (field) =>
  useSelector((state) => {
    const pages = state.pages.pages;
    if (field.options) {
      const parent = pages.find((page) => page.key === field.options);
      return parent;
    }
  });

export default FindParent;

import { GetDataById } from "../../helpers/GetStates";
import FindParent from "../../helpers/FindParent";
import Form from "../Form/Form";
import { useEffect, useState } from "react";

export const SubTableLogic = ({ page, id }) => {
  const [pages, setPages] = useState([{ page: page, id: id }]);
  // console.log("rendering logic");
  return <SubTable pages={pages} setPages={setPages} />;
};

export const SubTable = ({ pages, setPages }) => {
  return pages.map((page) => {
    return (
      <SubPage
        key={page.page.key}
        page={page.page}
        id={page.id}
        pages={pages}
        setPages={setPages}
      />
    );
  });
};

export const GetAllPages = (page, data, pages, setPages) => {
  page.fields.forEach((field) => {
    if (field.options) {
      const parent = FindParent(field);
      GetPageFromField(field, data, parent, pages, setPages);
    }
  });
};

const GetPageFromField = (field, data, parent, pages, setPages) => {
  useEffect(() => {
    if (!pages.find((page) => page.page.key === field.options)) {
      const parentMore = { page: parent, id: data ? data[field.key] : 0 };
      setPages((oldPages) => [...oldPages, parentMore]);
    } else {
      pages.forEach((page) => {
        if (page.page.key === field.options) {
          console.log(field.options);
          page.id = data ? data[field.key] : 0;
        }
      });
      setPages((oldPages) => oldPages);
    }
  }, [data, field, parent]);
};

const SubPage = ({ page, id, pages, setPages }) => {
  const data = GetDataById(page.key, id);

  GetAllPages(page, data, pages, setPages);

  return <Form active={id} page={page} />;
};

// export default SubTable;

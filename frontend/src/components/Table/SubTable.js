import { GetDataById } from "../../helpers/GetStates";
import FindParent from "../../helpers/FindParent";
import Form from "../Form/Form";
import { GetDefaultData } from "../../helpers/GetDefaultData";
import { useState } from "react";

export const SubTableLogic = ({ page, id }) => {
  const [pages2, setPages] = useState([{ page: page, id: id }]);
  const pages = [{ page: page, id: id }];
  SubPageLogic(page, id, pages, { setPages });
  return <SubTable pages={pages} />;
};

const SubPageLogic = (page, id, pages, setPages) => {
  const data = GetDataById(page.key, id);
  return SubFieldsLogic(data, page, pages, { setPages });
};

const SubFieldsLogic = (data, page, pages, setPages) => {
  console.log(pages);
  page.fields.forEach((field) => {
    if (field.options) {
      const parent = FindParent(field);
      const parentMore = { page: parent, id: data[field.key] };
      pages.push(parentMore);
      // setPages((oldPages) => [...oldPages, parentMore]);
      if (data[field.key] !== 0) {
        SubPageLogic(parent, data[field.key], pages);
      }
    }
  });
};

const SubTable = ({ pages }) => {
  return pages.map((page) => {
    return <SubPage key={page.page.key} id={page.id} page={page.page} />;
  });
};

const SubPage = ({ page, id }) => {
  const data = GetDataById(page.key, id);
  const defaultData = GetDefaultData(page);
  console.log(data);
  console.log(defaultData);
  // const [data, setData] =
  return (
    // {/* <div className="head">{page.name}</div> */}
    <Form active={id} defaultData={data ? data : defaultData} page={page} />
    // {/* <SubFields data={data} page={page} /> */}
  );
};

// const SubFields = ({ data, page }) => {
//   return page.fields.map((field) => {
//     return <SubField key={field.key} field={field} data={data} />;
//   });
// };

// const SubField = ({ field, data }) => {
//   const parent = FindParent(field);
//   if (parent) {
//     const page = GetDataById(parent.key, data[field.key]);
//     if (page) {
//       return (
//         <p>
//           {field.name}: {page.name}
//         </p>
//       );
//     }
//   }
//   if (field.name) {
//     return (
//       <p>
//         {field.name}: {data[field.key]}
//         {field.key === "price" && "KM"}
//       </p>
//     );
//   }
//   return null;
// };

export default SubTable;

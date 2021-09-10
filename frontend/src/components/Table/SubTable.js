import { GetDataById } from "../../helpers/GetStates";
import FindParent from "../../helpers/FindParent";
import Form from "../Form/Form";

export const SubTableLogic = ({ page, id }) => {
  const pages = [{ page: page, id: id }];
  SubPageLogic(page, id, pages);
  return <SubTable pages={pages} />;
};

const SubPageLogic = (page, id, pages) => {
  const data = GetDataById(page.key, id);
  return SubFieldsLogic(data, page, pages);
};

const SubFieldsLogic = (data, page, pages) => {
  page.fields.forEach((field) => {
    if (field.options) {
      const parent = FindParent(field);
      const parentMore = { page: parent, id: data[field.key] };
      pages.push(parentMore);
      SubPageLogic(parent, data[field.key], pages);
    }
  });
};

const SubTable = ({ pages }) => {
  return pages.map((p, i) => {
    return <SubPage key={i} id={p.id} page={p.page} />;
  });
};

const SubPage = ({ page, id }) => {
  const data = GetDataById(page.key, id);
  return (
    // {/* <div className="head">{page.name}</div> */}
    <Form active={id} defaultData={data} page={page} />
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

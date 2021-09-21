import React from "react";
import { useState } from "react";
import FindParent from "../../helpers/FindParent";
import { GetDataById } from "../../helpers/GetStates";
import { SubTableLogic } from "./SubTable";

const TableFields = ({ page, id }) => {
  const data = GetDataById(page.key, id);
  return page.fields.map((field) => {
    return <TableField key={field.key} field={field} data={data} />;
  });
};

const TableField = ({ field, data }) => {
  if (!field.table && !field.options) return null;
  const parent = FindParent(field);
  if (parent) {
    const page = GetDataById(parent.key, data && data[field.key]);
    if (page) {
      return (
        <>
          <h5>{page.name}</h5>
          <TableFields page={parent} id={page.id} />
        </>
      );
    }
  }
  if (!data) {
    return <h5></h5>;
  }
  return (
    <h5>
      {data && data[field.key]}
      {field.key === "price" && "KM"}
    </h5>
  );
};

const TableRow = ({ data, length, page }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="table-row"
      onClick={() => setIsOpen((oldOpen) => !oldOpen)}
      style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}
    >
      <TableFields page={page} id={data && data.id} />
      {isOpen && (
        <div>
          <SubTableLogic page={page} id={data && data.id} />
        </div>
      )}
    </div>
  );
};

export default TableRow;

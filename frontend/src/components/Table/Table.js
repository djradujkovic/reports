import React, { useState } from "react";
import Filter from "./Filter";
import FindParent from "../../helpers/FindParent";
import "./Table.style.css";
import TableRow from "./TableRow";

const superData = [];

const Fields = ({ page, length }) => {
  return page.fields.map((field) => {
    return <IfTable key={field.key} length={length} field={field} />;
  });
};

const IfTable = ({ field, length }) => {
  if (!field.table) return null;
  const parent = FindParent(field);
  if (!superData.find((d) => d.key === field.key)) {
    superData.push(field);
  }
  if (parent) {
    return (
      <>
        <h3>{field.name}</h3>
        <Fields length={length} page={parent} />
      </>
    );
  }
  return <h3>{field.name}</h3>;
};

const Table = ({ data, page, defaultData }) => {
  // console.log(data);
  const [displayData, setDisplayData] = useState(data);
  const length = superData.length;

  return (
    <div className="table-grid">
      <Filter
        setDisplayData={setDisplayData}
        defaultFilter={defaultData}
        data={data}
        page={page}
        filters={superData}
      />
      <div className="table">
        <div
          className="head"
          style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}
        >
          <Fields page={page} length={length} />
        </div>
        <div>
          {displayData !== [] &&
            displayData.map((d) => (
              <TableRow key={d.id} page={page} data={d} length={length} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Table;

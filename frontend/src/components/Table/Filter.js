import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { HiFilter } from "react-icons/hi";
import FindParent from "../../helpers/FindParent";
import FilterField from "./FilterField";

const Fields = ({ page, filter, setFilter }) => {
  return page.fields.map((field) => {
    return (
      <IfTable
        key={field.key}
        field={field}
        filter={filter}
        setFilter={setFilter}
      />
    );
  });
};

const IfTable = ({ field, filter, setFilter }) => {
  if (!field.table) return null;
  const parent = FindParent(field);
  if (parent) {
    return (
      <>
        <FilterField filter={filter} setFilter={setFilter} field={field} />
        <Fields filter={filter} setFilter={setFilter} page={parent} />
      </>
    );
  }
  return <FilterField filter={filter} setFilter={setFilter} field={field} />;
};

const Filter = ({ page, data, defaultFilter, setDisplayData, filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(defaultFilter);

  const handleFilter = useCallback(() => {
    let newData = data;
    filters.forEach((field) => {
      switch (field.type) {
        case "text":
          newData = newData.filter((fieldData) => {
            if (fieldData[field.key]) {
              return (
                fieldData[field.key]
                  .toLocaleLowerCase()
                  .search(filter[field.key].toLocaleLowerCase()) !== -1
              );
            }
            return null;
          });
          break;
        case "number":
          newData = newData.filter((fieldData) => {
            if (
              fieldData[field.key] >= filter[field.key].min &&
              fieldData[field.key] <= filter[field.key].max
            )
              return fieldData;
            return false;
          });
          break;
        case "select":
          newData = newData.filter((fieldData) => {
            if (
              filter[field.key] === 0 ||
              (fieldData[field.key] &&
                fieldData[field.key].id === filter[field.key]) ||
              fieldData[field.key] === filter[field.key]
            )
              return fieldData;
            return false;
          });
          break;
        default:
          return null;
      }
    });
    return newData;
  }, [filter, filters, data]);

  // const SubFilters = (page) => {
  //   page.fields.map((field) => {
  //     return handleSubFilter(field);
  //   });
  // };

  // const handleSubFilter = (field) => {
  //   if (!field.table) return null;
  //   const parent = FindParent(field);
  //   if (parent) {
  //     // console.log(field);
  //     return SubFilters(parent);
  //   }
  //   // console.log(field);
  //   return field;
  // };

  // SubFilters(page);

  useEffect(() => {
    let newData = handleFilter();
    setDisplayData(newData);
  }, [setDisplayData, handleFilter]);

  const handleMouseLeave = (e) => {
    if (
      e.target.tagName.toLowerCase() !== "select" &&
      e.target.tagName.toLowerCase() !== "input"
    ) {
      setIsOpen(false);
    }
  };

  const handleReport = () => {
    axios.post("http://localhost:8000/reports/pages/projects/create/", filter);
  };

  return (
    <>
      <div
        className="filter"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={(e) => handleMouseLeave(e)}
        style={{
          padding: isOpen && "2rem",
          margin: isOpen && "2rem",
          marginInlineEnd: isOpen && "0rem",
          // placeSelf: isOpen && "center",
          border: !isOpen && "none",
        }}
      >
        {isOpen && (
          <>
            <Fields page={page} filter={filter} setFilter={setFilter} />
            <button onClick={() => handleReport()}>Napravi izvještaj</button>
          </>
        )}
        <div
          className="icon"
          // onMouseEnter={() => setIsOpen(true)}
          // onMouseLeave={(e) => handleMouseLeave(e)}
          // style={{ width: isOpen && "44rem" }}
        >
          <HiFilter className="filter-icon" size={40} />
        </div>
        <div className="invisible"></div>
      </div>
    </>
  );
};

export default Filter;

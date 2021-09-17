import { useEffect, useState } from "react";
import { GetData } from "../../helpers/GetStates";

import "./Select.style.css";

const SelectInput = ({
  setDisplayOptions,
  options,
  value,
  setIsOpen,
  field,
  search,
  setSearch,
  setData,
  editable,
}) => {
  //   const selected = GetDataById(field.options, value);
  //   const [search, setSearch] = useState(value ? selected.name : "");
  useEffect(() => {
    setDisplayOptions(
      options.filter((option) => {
        if (option.name) {
          return (
            option.name
              .toLocaleLowerCase()
              .search(search.toLocaleLowerCase()) !== -1
          );
        }
        return options;
      })
    );
    if (search === "") {
      //       setData((oldData) => ({ ...oldData, [field.key]: 0 }));
    }
  }, [search, options, field, setDisplayOptions]);

  const handleOpen = () => {
    if (!editable) return null;
    setIsOpen((oldOpen) => !oldOpen);
    setData((oldData) => ({ ...oldData, [field.key]: 0 }));
    //     setSearch("");
  };

  // const handleClose = () => {
  //   setIsOpen(false);
  //   //     setData((oldData) => ({ ...oldData, [field.key]: oldOpened }));
  // };
  const style = {
    border: !editable && "none",
    cursor: "default",
  };
  return (
    <input
      onClick={() => handleOpen()}
      placeholder={`${field.label}..`}
      //       onFocus={() => setIsOpen(true)}
      //       onBlur={() => handleClose()}
      onChange={(e) => setSearch(e.target.value)}
      value={search}
      style={style}
      disabled={!editable}
    ></input>
  );
};

const Select = ({ id, field, value, setData, editable }) => {
  const options = GetData(field.options);
  const [isOpen, setIsOpen] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(options);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (value) {
      setSearch(options.find((option) => option.id === value).name);
    } else {
      setSearch("");
    }
  }, [value, options]);

  const handleSelect = (e, option) => {
    e.preventDefault();
    //     setSearch(option.name);
    setData((oldData) => ({ ...oldData, [field.key]: option.id }));
    setIsOpen(false);
  };

  return (
    <div className="select filter-select" id={id}>
      <SelectInput
        setDisplayOptions={setDisplayOptions}
        value={value}
        options={options}
        setIsOpen={setIsOpen}
        field={field}
        search={search}
        setSearch={setSearch}
        setData={setData}
        editable={editable}
      />
      {isOpen ? (
        <div>
          {displayOptions.map((option) => {
            return (
              <div key={option.id} onClick={(e) => handleSelect(e, option)}>
                {option.name}
              </div>
            );
          })}
        </div>
      ) : (
        ""
        // !value && <div className="label">{field.label}</div>
      )}
    </div>
  );
};

export default Select;

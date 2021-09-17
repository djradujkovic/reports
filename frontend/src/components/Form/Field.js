// import { GetData } from "../../helpers/GetStates";
import Select from "../Select/Select";

const JustField = ({ field, data, setData, editable }) => {
  // const user = GetUser();
  // const editable = user.group.pages.includes(page.key);
  const style = {
    border: !editable && "none",
    cursor: "default",
  };
  const handleChange = (e) => {
    let value = 0;
    switch (typeof data[e.target.name]) {
      case "string":
        value = e.target.value;
        break;
      case "number":
        if (e.target.value) value = parseInt(e.target.value);
        break;
      case "boolean":
        value = !data[e.target.name];
        break;
      default:
        value = e.target.value;
    }
    setData((oldData) => ({ ...oldData, [e.target.name]: value }));
  };
  switch (field.type) {
    case "select":
      return (
        <Select
          id={field.key}
          field={field}
          value={data[field.key]}
          setData={setData}
          editable={editable}
        />
        // <select
        //   id={field.key}
        //   name={field.key}
        //   value={data[field.key]}
        //   onChange={(e) => handleChange(e)}
        //   disabled={!editable}
        //   style={{ ...style, WebkitAppearance: !editable && "none" }}
        // >
        //   <option value={0}>{field.label}..</option>
        //   {options.map((option) => {
        //     return (
        //       <option key={option.id} value={option.id}>
        //         {option.name}
        //       </option>
        //     );
        //   })}
        // </select>
      );
    default:
      return (
        <input
          value={
            typeof data[field.key] == "object"
              ? data[field.key].value
              : data[field.key]
          }
          name={field.key}
          id={field.key}
          type={field.type}
          onChange={(e) => handleChange(e)}
          required={field.required}
          style={{ ...style, MozAppearance: !editable && "textfield" }}
          disabled={!editable}
        />
      );
  }
};

const Field = ({ field, data, setData, editable }) => {
  if (field.name === "") return null;
  return (
    <>
      <label htmlFor={field.key}>{field.name}:</label>
      <JustField
        field={field}
        data={data}
        setData={setData}
        editable={editable}
      />
    </>
  );
};

export default Field;

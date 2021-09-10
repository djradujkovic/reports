import { GetData } from "../../helpers/GetStates";

const JustField = ({ field, data, setData }) => {
  const editable = true;
  const options = GetData(field.options);
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
  // if (!editable) {
  // return <span>{data[field.key]}</span>;
  // }
  switch (field.type) {
    case "select":
      return (
        <select
          id={field.key}
          name={field.key}
          value={data[field.key]}
          onChange={(e) => handleChange(e)}
          // onMouseOver={(e) => e.stopPropagation()}
          disabled={!editable}
          style={{ ...style, WebkitAppearance: !editable && "none" }}
        >
          <option value={0}>{field.label}..</option>
          {options.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
      );
    default:
      return (
        <input
          value={data[field.key]}
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
  //   return newField;
};

const Field = ({ field, data, setData }) => {
  if (field.name === "") return null;
  return (
    <>
      <label htmlFor={field.key}>{field.name}:</label>
      <JustField field={field} data={data} setData={setData} />
    </>
  );
};

export default Field;

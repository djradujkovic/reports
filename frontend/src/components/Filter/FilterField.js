import { useSelector } from "react-redux";

const FilterField = ({ filter, setFilter, field }) => {
  const options = useSelector((state) => state.data[field.options]);
  const handleChange = (e) => {
    let value = 0;
    switch (typeof filter[e.target.name]) {
      case "string":
        value = e.target.value;
        break;
      case "number":
        if (e.target.value) value = parseInt(e.target.value);
        break;
      case "boolean":
        value = !filter[e.target.name];
        break;
      case "object":
        value = { ...filter[e.target.name], [e.target.id]: e.target.value };
        break;
      default:
        value = e.target.value;
        break;
    }
    setFilter((oldFilter) => ({ ...oldFilter, [e.target.name]: value }));
  };
  switch (field.type) {
    case "text":
      return (
        <>
          <span>
            <input type="checkbox" defaultChecked className="checkbox" />
          </span>
          <input
            type={field.type}
            placeholder={field.label}
            name={field.key}
            value={filter[field.key]}
            onChange={(e) => handleChange(e)}
          />
        </>
      );
    case "number":
      return (
        <>
          <span>
            <input type="checkbox" defaultChecked className="checkbox" />
          </span>
          <div className="range">
            <input
              type="range"
              value={filter[field.key].min}
              id="min"
              min={field.range[0]}
              max={field.range[1]}
              step={10}
              name={field.key}
              onChange={(e) => handleChange(e)}
            />

            <input
              type="number"
              value={filter[field.key].min}
              id="min"
              min={field.range[0]}
              max={field.range[1]}
              step={10}
              name={field.key}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="range"
              value={filter[field.key].max}
              id="max"
              min={field.range[0]}
              max={field.range[1]}
              step={10}
              name={field.key}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="number"
              value={filter[field.key].max}
              id="max"
              min={field.range[0]}
              max={field.range[1]}
              step={10}
              name={field.key}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </>
      );
    case "checkbox":
      return (
        <>
          <span>
            <input
              type="checkbox"
              id={field.key}
              name={field.key}
              value={filter[field.key]}
              className="checkbox"
              onChange={(e) => handleChange(e)}
            />
          </span>
          <label htmlFor={field.key}>{field.label}</label>
        </>
      );
    case "select":
      return (
        <>
          <span>
            <input type="checkbox" defaultChecked className="checkbox" />
          </span>

          <select
            name={field.key}
            value={filter[field.key]}
            onChange={(e) => handleChange(e)}
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
        </>
      );
    case "date":
      return (
        <>
          <span>
            <input type="checkbox" defaultChecked className="checkbox" />
          </span>

          <div>
            <input
              type={field.type}
              name={field.key}
              id="min"
              value={filter[field.key].min}
              onChange={(e) => handleChange(e)}
            />
            -
            <input
              type={field.type}
              name={field.key}
              id="max"
              value={filter[field.key].max}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </>
      );
    default:
      return null;
  }
};

export default FilterField;

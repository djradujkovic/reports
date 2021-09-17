import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { GetDataById, GetUser } from "../../helpers/GetStates";
import { addData, deleteData, updateData } from "../../redux/actions/data";
import Field from "./Field";
import "./Form.style.css";

const Form = ({ active, defaultData, page }) => {
  const dispatch = useDispatch();
  const user = GetUser();
  const editable = user.group.pages.includes(page.key);
  // const [editable, setEditable] = useState(user.group.pages.includes(page.key));
  // const editable = true;
  console.log(active);
  console.log(defaultData);

  const [formData, setFormData] = useState(defaultData);
  const data = GetDataById(page.key, active);

  useEffect(() => {
    if (active === 0) {
      setFormData(defaultData);
    } else {
      setFormData(data);
    }
    // setEditable(user.group.pages.includes(page.key));
  }, [active, data, defaultData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Break = page.fields.map((field) => {
      if (formData[field.key] === 0) return false;
      return true;
    });
    // if (Break.find((s) => !s) === false) return 0;
    if (formData.id === "") {
      dispatch(addData(page.key, formData));
    } else {
      dispatch(updateData(page.key, formData));
    }
  };

  const handleDelete = () => {
    dispatch(deleteData(page.key, formData.id));
    //     setActive(0);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      onClick={(e) => e.stopPropagation()}
    >
      {page.fields.map((field) => {
        return (
          <Field
            key={field.key}
            field={field}
            data={formData}
            setData={setFormData}
            editable={editable}
          />
        );
      })}
      {editable && (
        <>
          {formData.id === "" ? (
            <br />
          ) : (
            <button
              className="delete"
              onClick={() => handleDelete()}
              type="button"
            >
              Delete
            </button>
          )}
          <button className="save" type="submit">
            Save
          </button>
        </>
      )}
    </form>
  );
};

export default Form;

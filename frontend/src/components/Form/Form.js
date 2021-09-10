import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { GetDataById } from "../../helpers/GetStates";
import { addData, deleteData, updateData } from "../../redux/actions/data";
import Field from "./Field";
import "./Form.style.css";

const Form = ({ active, defaultData, page }) => {
  const dispatch = useDispatch();

  const editable = true;

  const [formData, setFormData] = useState(defaultData);
  const data = GetDataById(page.key, active);

  useEffect(() => {
    if (active === 0) {
      setFormData(defaultData);
    } else {
      setFormData(data);
    }
  }, [active, data, defaultData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id === "") {
      dispatch(addData(page.key, formData));
      // setFormData((oldData) => emptyDict(oldData));
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

import { getMaxValue } from "./GetStates";

export const GetDefaultData = (page) => {
  const setCurrent = (field) => {
    if (field.key === "price") {
      return { max: getMaxValue(page.key, field.key), min: 0, value: 0 };
    }
    return field.value;
  };

  return page.fields.reduce((prev, field) => {
    return { ...prev, [field.key]: setCurrent(field) };
  }, {});
};

export const GetDefaultData = (page) =>
  page.fields.reduce((prev, field) => {
    return { ...prev, [field.key]: field.value };
  }, {});

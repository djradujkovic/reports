import "./Page.style.css";
import { GetData, GetForeigns } from "../../helpers/GetStates";
import { useEffect, useState } from "react";
import Form from "../Form/Form";
import Table from "../Table/Table";

const PageLogic = ({ page, table }) => {
  GetForeigns(page.key);

  const data = GetData(page.key);

  const defaultData = page.fields.reduce((prev, field) => {
    return { ...prev, [field.key]: field.value };
  }, {});

  document.title = page.name;

  if (table) return <Table page={page} data={data} defaultData={defaultData} />;
  return <Page page={page} data={data} defaultData={defaultData} />;
};

const Page = ({ page, data, defaultData }) => {
  const [active, setActive] = useState(0);

  const [search, setSearch] = useState("");
  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    setDisplayData(
      data.filter((sh) => {
        if (sh.name) {
          return (
            sh.name.toLocaleLowerCase().search(search.toLocaleLowerCase()) !==
            -1
          );
        } else {
          return data;
        }
      })
    );
  }, [search, data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="grid">
      <input onChange={(e) => handleSearch(e)} placeholder="Search.." />
      <div className="list">
        {displayData.map((d) => (
          <span key={d.id} onClick={() => setActive(d.id)}>
            {d.name ? d.name : d.id}
          </span>
        ))}
      </div>
      <button onClick={() => setActive(0)} className="add">
        Add
      </button>
      <div className="page">
        <Form active={active} defaultData={defaultData} page={page} />
      </div>
    </div>
  );
};

export default PageLogic;

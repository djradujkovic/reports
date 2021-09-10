import "./Themes.style.css";

const Themes = () => {
  const themes = [
    {
      id: 1,
      main: "#62929e",
      second: "#4a6d7c",
      text: "white",
    },
    {
      id: 2,
      main: "#899878",
      second: "#e4e6c3",
      text: "#95190c",
    },
    {
      id: 3,
      main: "#efcb68",
      second: "#160c28",
      text: "#916953",
    },
  ];
  const style = {
    height: "20px",
    width: "20px",
  };

  const handleThemeChange = (theme) => {
    document.documentElement.style.setProperty("--main", theme.main);
    document.documentElement.style.setProperty("--second", theme.second);
    document.documentElement.style.setProperty("--text", theme.text);
  };
  return (
    <div className="themes">
      {themes.map((theme) => {
        return (
          <div key={theme.id} onClick={() => handleThemeChange(theme)}>
            <div style={{ ...style, backgroundColor: theme.main }}></div>
            {/* <span style={{ ...style, backgroundColor: theme.second }}></span> */}
          </div>
        );
      })}
    </div>
  );
};

export default Themes;

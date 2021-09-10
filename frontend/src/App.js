import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import Layout from "./components/Layout/Layout";
import Pages from "./components/Pages/Pages";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Pages />
      </Layout>
    </Provider>
  );
}

export default App;

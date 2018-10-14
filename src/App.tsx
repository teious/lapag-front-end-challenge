import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import Header from "./components/header/Header";
import SchedulePage from "./features/schedule/SchedulePage";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimesCircle,
  faTrashAlt,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faTimesCircle, faTrashAlt, faPencilAlt);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <div className="MainContainer">
              <Route exact={true} path="/" component={SchedulePage} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
//

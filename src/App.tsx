import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";

import Header from "./components/header/Header";
import Schedule from "./features/schedule/Schedule";
import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header/>
            <div className="MainContainer">
             <Route exact={true} path="/" component={Schedule} />
            </div>
          </div>
        </Router>
    
      </Provider>
    );
  }
}

export default App;
// 
import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from './pages/search/SearchPage'
import ThreadPage from './pages/thread/ThreadPage'
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <SearchPage />
          </Route>
          <Route path="/thread">
            <ThreadPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

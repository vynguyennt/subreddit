import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SearchPage from "./pages/search/SearchPage";
import ArticlePage from "./pages/article/ArticlePage";
import HomePage from "./pages/home/HomePage";
import Header from "./common/header/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/subreddit">
            <HomePage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/r/:subreddit/comments/:articleId">
            <Header />
            <ArticlePage />
          </Route>
          <Route path="/r/:subreddit">
            <Header />
            <SearchPage />
          </Route>
          <Redirect from="/:subreddit" to="/r/:subreddit" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

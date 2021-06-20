import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [subredditName, updateSubredditName] = useState("");
  const [redirect, updateRedirect] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    updateRedirect(true);
  }
  if (redirect) return <Redirect to={`/r/${subredditName}`} />;
  return (
    <section className="home-page">
      <div className="home-page--content">
        <h1>Welcome to Subreddit App</h1>
        <p className="home-page--msg">Please select a subreddit</p>
        <form onSubmit={handleSubmit} className="home-page--form">
          <input
            type="text"
            placeholder="e.g. dota2"
            name="subreddit-name"
            value={subredditName}
            onChange={(e) => updateSubredditName(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="material-icons">search</i>
          </button>
        </form>
      </div>
    </section>
  );
}

export default HomePage;

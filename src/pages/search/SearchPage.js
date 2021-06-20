import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchSubreddit,
  selectListing,
  selectListAfter,
  selectListSortBy,
  selectListSortTime,
  selectListLoadingStatus,
  selectErrorMsg,
} from "../../store/subredditSlice";
import { updateSelectedArticle } from "../../store/articleSlice";
import { useScrollPosition } from "../../common/utils/positionUtils";
import Sort from "../../common/sort/Sort";
import Article from "../../common/article/Article";
import ScrollTopButton from "../../common/scrollTop/ScrollTopButton";
import "./SearchPage.css";

function SearchPage() {
  const { subreddit } = useParams();
  const listing = useSelector(selectListing);
  const after = useSelector(selectListAfter);
  const sortBy = useSelector(selectListSortBy);
  const sortTime = useSelector(selectListSortTime);
  const loadStatus = useSelector(selectListLoadingStatus);
  const errorMsg = useSelector(selectErrorMsg);
  const dispatch = useDispatch();

  const listingRef = useRef(null);

  useEffect(() => {
    let fetchOptions = { name: subreddit, sortBy, after: "" };
    if (sortBy === "top") fetchOptions.time = sortTime;
    dispatch(fetchSubreddit(fetchOptions));
  }, [sortBy, sortTime]);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (
        currPos.y < prevPos.y &&
        currPos.y * -1 + window.innerHeight * 2 >
          listingRef.current.clientHeight
      ) {
        if (loadStatus !== "loading" && after !== null) {
          let fetchOptions = { name: subreddit, sortBy, after };
          if (sortBy === "top") fetchOptions.time = sortTime;
          dispatch(fetchSubreddit(fetchOptions));
        }
      }
    },
    [loadStatus, after, sortBy, sortTime]
  );

  function setSelectedArticle(e) {
    let id = e.currentTarget.id;
    let article = listing.find((article) => article.id === id);
    dispatch(updateSelectedArticle({ ...article }));
  }

  if (listing.length) {
    return (
      <section className="search-page" ref={listingRef}>
        <Sort />
        <div className="articles-list">
          {listing.map((article) => (
            <Link
              to={`/r/${subreddit}/comments/${article.id}`}
              key={article.id}
              id={article.id}
              className="article-link"
              onClick={setSelectedArticle}
            >
              <Article
                articleId={article.id}
                title={article.title}
                author={article.author}
                num_comments={article.num_comments}
                created={article.created_utc}
                ups={article.ups}
                likes={article.likes}
              />
            </Link>
          ))}
        </div>
        <ScrollTopButton />
      </section>
    );
  } else {
    return (
      <section className="search-page search-page__error" ref={listingRef}>
        <p className="error-msg">{errorMsg}</p>
      </section>
    );
  }
}

export default SearchPage;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Article from "../../common/article/Article";
import {
  fetchArticle,
  selectArticle,
  selectErrorMsg,
} from "../../store/articleSlice";
import ScrollTopButton from "../../common/scrollTop/ScrollTopButton";
import "./ArticlePage.css";

function ArticlePage() {
  const { subreddit, articleId } = useParams();
  const article = useSelector(selectArticle);
  const errorMsg = useSelector(selectErrorMsg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!article.id) {
      dispatch(fetchArticle({ articleId, subreddit }));
    }
  }, [articleId]);

  return (
    <section
      className={"article-page" + (article.id ? "" : " article-page__error")}
    >
      {article.id ? (
        <Article
          {...article}
          articleId={article.id}
          videoSrc={
            article.media && article.media.reddit_video
              ? article.media.reddit_video.fallback_url
              : ""
          }
        />
      ) : (
        <p className="error-msg">{errorMsg}</p>
      )}
      <ScrollTopButton />
    </section>
  );
}

export default ArticlePage;

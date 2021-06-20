import React from "react";
import Vote from "../vote/Vote";
import calcRelativeTime from "../utils/timeUtils";
import PropTypes from "prop-types";
import "./Article.css";

function Article({
  articleId,
  title,
  author,
  num_comments,
  created,
  selftext_html,
  url,
  ups,
  likes,
  is_reddit_media_domain,
  is_video,
  videoSrc,
  thumbnail,
  thumbnail_width,
  thumbnail_height,
}) {
  function htmlDecode(content) {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  return (
    <article className="article">
      <Vote
        voteCount={ups}
        voteStatus={likes === true ? 1 : likes === false ? -1 : 0}
        articleId={articleId}
      />
      <div className="article-details">
        <div className="posted-info">
          Posted by u/
          <span className="posted-by">{author}</span>
          <span className="posted-time">
            {" "}
            {calcRelativeTime(new Date(), new Date(created * 1000))}
          </span>
        </div>
        <h1 className="article-title">{title}</h1>
        {selftext_html ? (
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: htmlDecode(selftext_html) }}
          ></div>
        ) : is_video ? (
          <div className="article-video-content">
            <video className="article-video" autoplay controls>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
        ) : is_reddit_media_domain ? (
          <div className="article-img-content">
            <img src={url} alt={title} className="article-img" />
          </div>
        ) : (
          <div className="article-link-content">
            {url && (
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            )}

            {thumbnail && (
              <img
                src={thumbnail}
                alt=""
                className="thumbnail-img"
                style={{ width: thumbnail_width, height: thumbnail_height }}
              />
            )}
          </div>
        )}
        <div className="actions-panel">
          <div className="comments-summary">
            <i className="material-icons action-icon">chat_bubble_outline</i>
            {num_comments} Comment{num_comments > 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </article>
  );
}

Article.propTypes = {
  articleId: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  num_comments: PropTypes.number,
  created: PropTypes.number,
  selftext_html: PropTypes.string,
  ups: PropTypes.number,
  likes: PropTypes.bool,
  is_reddit_media_domain: PropTypes.bool,
  is_self: PropTypes.bool,
  is_video: PropTypes.bool,
  videoSrc: PropTypes.string,
  thumbnail: PropTypes.string,
  thumbnail_width: PropTypes.number,
  thumbnail_height: PropTypes.number,
};

export default Article;

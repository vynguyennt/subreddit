import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import UpArrow from "./UpArrow";
import DownArrow from "./DownArrow";
import { updateArticleVote } from "../../store/subredditSlice";
import { updateSelectedArticleVote } from "../../store/articleSlice";
import { nFormatter } from "../utils/numberUtils";
import "./Vote.css";

function Vote({ voteCount, voteStatus, articleId }) {
  const [status, updateStatus] = useState(voteStatus);
  const [count, updateCount] = useState(voteCount);
  const dispatch = useDispatch();

  useEffect(() => {
    updateCount(voteCount);
  }, [voteCount]);

  function handleVote(e) {
    e.preventDefault();
    let newCount = count;
    if (e.currentTarget.name === "upvote") {
      switch (status) {
        case -1:
          newCount += 2;
          updateStatus(1);
          updateCount(newCount);
          dispatch(
            updateArticleVote({
              id: articleId,
              voteType: true,
              voteCount: newCount,
            })
          );
          dispatch(
            updateSelectedArticleVote({
              id: articleId,
              voteType: true,
              voteCount: newCount,
            })
          );
          break;
        case 0:
          newCount += 1;
          updateStatus(1);
          updateCount(newCount);
          dispatch(
            updateArticleVote({
              id: articleId,
              voteType: true,
              voteCount: newCount,
            })
          );
          dispatch(
            updateSelectedArticleVote({
              id: articleId,
              voteType: true,
              voteCount: newCount,
            })
          );
          break;
        case 1:
          newCount -= 1;
          updateStatus(0);
          updateCount(newCount);
          dispatch(
            updateArticleVote({
              id: articleId,
              voteType: null,
              voteCount: newCount,
            })
          );
          dispatch(
            updateSelectedArticleVote({
              id: articleId,
              voteType: null,
              voteCount: newCount,
            })
          );
          break;
        default:
      }
    } else if (e.currentTarget.name === "downvote") {
      switch (status) {
        case -1:
          newCount += 1;
          updateStatus(0);
          updateCount(newCount);
          dispatch(
            updateArticleVote({
              id: articleId,
              voteType: null,
              voteCount: newCount,
            })
          );
          dispatch(
            updateSelectedArticleVote({
              id: articleId,
              voteType: null,
              voteCount: newCount,
            })
          );
          break;
        case 0:
          newCount -= 1;
          updateStatus(-1);
          updateCount(newCount);
          dispatch(
            updateArticleVote({
              id: articleId,
              voteType: false,
              voteCount: newCount,
            })
          );
          dispatch(
            updateSelectedArticleVote({
              id: articleId,
              voteType: false,
              voteCount: newCount,
            })
          );
          break;
        case 1:
          newCount -= 2;
          updateStatus(-1);
          updateCount(newCount);
          dispatch(
            updateArticleVote({
              id: articleId,
              voteType: false,
              voteCount: newCount,
            })
          );
          dispatch(
            updateSelectedArticleVote({
              id: articleId,
              voteType: false,
              voteCount: newCount,
            })
          );
          break;
        default:
      }
    }
  }

  return (
    <div
      className={
        "vote " +
        (status === -1
          ? "vote__downvoted"
          : status === 1
          ? "vote__upvoted"
          : "")
      }
    >
      <button className="vote-btn" name="upvote" onClick={handleVote}>
        <UpArrow className="upvote__img" />
      </button>
      <div className="vote-count">{nFormatter(count, 1)}</div>
      <button className="vote-btn" name="downvote" onClick={handleVote}>
        <DownArrow className="downvote__img" />
      </button>
    </div>
  );
}

Vote.defaultProps = {
  voteCount: 0,
  voteStatus: 0,
  articleId: "",
};

Vote.propTypes = {
  voteCount: PropTypes.number,
  voteStatus: PropTypes.oneOf([-1, 0, 1]),
  articleId: PropTypes.string,
};

export default Vote;

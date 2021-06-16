import React, { useState } from "react";
import PropTypes from "prop-types";
import UpArrow from "./UpArrow";
import DownArrow from "./DownArrow";
import './Vote.css'

function Vote({ voteCount, voteStatus, updateVote }) {
  let [status, updateStatus] = useState(voteStatus)
  let [count, updateCount] = useState(voteCount)
  function handleVote(e) {
    if (e.currentTarget.name === 'upvote') {
      switch(status) {
        case -1: 
          updateStatus(1)
          updateCount(count + 2)
          updateVote(1)
          break
        case 0:
          updateStatus(1)
          updateCount(count + 1)
          updateVote(1)
          break
        case 1:
          updateStatus(0)
          updateCount(count -1)
          updateVote(0)
          break
        default:
      }
    } else if (e.currentTarget.name === 'downvote') {
      switch(status) {
        case -1: 
          updateStatus(0)
          updateCount(count + 1)
          updateVote(0)
          break
        case 0:
          updateStatus(-1)
          updateCount(count - 1)
          updateVote(-1)
          break
        case 1:
          updateStatus(-1)
          updateCount(count - 2)
          updateVote(-1)
          break
        default:
      }
    }
  }

  return (
    <div className={'vote ' + (status === -1 ? 'downvoted' : (status === 1) ? 'upvoted' : '')}>
      <button className="vote-btn" name="upvote" onClick={handleVote}>
        <UpArrow className="upvote__img" />
      </button>
      <div className="vote-count">{count}</div>
      <button className="vote-btn" name="downvote" onClick={handleVote}>
        <DownArrow className="downvote__img" />
      </button>
    </div>
  );
}

Vote.defaultProps = {
  voteCount: 0,
  voteStatus: 0,
  updateVote: () => {}
}

Vote.propTypes = {
  voteCount: PropTypes.number,
  voteStatus: PropTypes.oneOf([-1, 0, 1]),
  updateVote: PropTypes.func
};

export default Vote;

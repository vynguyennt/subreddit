import React from 'react'
import Vote from "../vote/Vote";

function Post({title}) {
  function updateVote(type) {}
  return (
    <div className="Post">
      <Vote voteCount={5} voteStatus={1} updateVote={updateVote} />
      <h1>{title}</h1>
    </div>
  );
}

export default Post
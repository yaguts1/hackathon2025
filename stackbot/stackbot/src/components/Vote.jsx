import React from 'react';
import styles from './Vote.module.css';

const Vote = ({ answerId, onVote, upvotes = 0, downvotes = 0 }) => {
  return (
    <div className={styles.vote}>
      <button onClick={() => onVote(answerId, 'upvotes')} className={styles.voteButton}>
        👍 {upvotes}
      </button>
      <span className={styles.score}>{upvotes - downvotes}</span>
      <button onClick={() => onVote(answerId, 'downvotes')} className={styles.voteButton}>
        👎 {downvotes}
      </button>
    </div>
  );
};

export default Vote;

import React, { useState, useEffect } from 'react';

const VoteSection = ({ questionId }) => {
  const [votes, setVotes] = useState(() => {
    // Tenta pegar os votos do localStorage para essa pergunta específica
    const savedVotes = localStorage.getItem(`votes_${questionId}`);
    return savedVotes ? JSON.parse(savedVotes) : { upvotes: 0, downvotes: 0 };
  });

  useEffect(() => {
    // Sempre que os votos mudarem, salva no localStorage associados ao ID da pergunta
    localStorage.setItem(`votes_${questionId}`, JSON.stringify(votes));
  }, [votes, questionId]);

  const handleUpvote = () => {
    setVotes((prevVotes) => ({ ...prevVotes, upvotes: prevVotes.upvotes + 1 }));
  };

  const handleDownvote = () => {
    setVotes((prevVotes) => ({ ...prevVotes, downvotes: prevVotes.downvotes + 1 }));
  };

  return (
    <div style={styles.voteSection}>
      <button onClick={handleUpvote} style={styles.voteButton}>👍 {votes.upvotes}</button>
      <button onClick={handleDownvote} style={styles.voteButton}>👎 {votes.downvotes}</button>
    </div>
  );
};

const styles = {
  voteSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  voteButton: {
    padding: '5px 10px',
    backgroundColor: '#f1f1f1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default VoteSection;

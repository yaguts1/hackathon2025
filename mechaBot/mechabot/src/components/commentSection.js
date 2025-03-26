import React, { useState } from 'react';

const CommentSection = ({ comments, addComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      addComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div style={styles.comments}>
      <h5 style={styles.header}>Comments:</h5>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment, index) => <p key={index}>{comment}</p>)
      )}
      <textarea
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Add a comment"
        style={styles.textarea}
      />
      <button onClick={handleAddComment} style={styles.button}>
        Add Comment
      </button>
    </div>
  );
};

const styles = {
  comments: {
    marginTop: '10px',
    backgroundColor: '#f2f2f2',
    padding: '10px',
    borderRadius: '5px',
  },
  header: {
    marginBottom: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  textarea: {
    width: '100%',
    padding: '5px',
    marginTop: '5px',
    borderRadius: '3px',
    border: '1px solid #ddd',
    resize: 'vertical',
  },
  button: {
    marginTop: '5px',
    padding: '5px 10px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default CommentSection;

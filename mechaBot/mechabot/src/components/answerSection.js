import React, { useState, useEffect } from 'react';

const AnswerSection = ({ questionId, initialAnswers = [] }) => {
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState(() => {
    // Tenta pegar as respostas do localStorage para essa pergunta específica
    const savedAnswers = localStorage.getItem(`answers_${questionId}`);
    return savedAnswers ? JSON.parse(savedAnswers) : initialAnswers;
  });

  useEffect(() => {
    // Sempre que as respostas mudarem, salva no localStorage associadas ao ID da pergunta
    if (answers.length > 0) {
      localStorage.setItem(`answers_${questionId}`, JSON.stringify(answers));
    }
  }, [answers, questionId]);

  const handleAddAnswer = () => {
    if (answerText.trim() !== '') {
      const newAnswer = { id: Date.now(), text: answerText, replies: [] };
      setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
      setAnswerText('');
    }
  };

  const addReply = (parentId, replyText, currentAnswers) => {
    return currentAnswers.map((answer) => {
      const repliesArray = answer.replies || [];
      if (answer.id === parentId) {
        const newReply = { id: Date.now(), text: replyText, replies: [] };
        return { ...answer, replies: [...repliesArray, newReply] };
      } else if (repliesArray.length > 0) {
        return { ...answer, replies: addReply(parentId, replyText, repliesArray) };
      }
      return answer;
    });
  };

  const handleAddReply = (parentId, replyText) => {
    setAnswers((prevAnswers) => addReply(parentId, replyText, prevAnswers));
  };

  const AnswerItem = ({ answer, level = 0 }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [showReplyInput, setShowReplyInput] = useState(false);

    const toggleReplies = () => {
      setShowReplies((prev) => !prev);
    };

    const handleReplySubmit = () => {
      if (replyText.trim() !== '') {
        handleAddReply(answer.id, replyText);
        setReplyText('');
        setShowReplies(true);
        setShowReplyInput(false);
      }
    };

    return (
      <div style={{ ...styles.answerItem, marginLeft: level * 20 }}>
        <div style={styles.answerHeader}>
          <button onClick={toggleReplies} style={styles.toggleButton}>
            {showReplies ? '.' : '>'}
          </button>
          <p style={styles.answerText}>{answer.text}</p>
        </div>
        <button
          onClick={() => setShowReplyInput((prev) => !prev)}
          style={styles.replyButton}
        >
          Reply
        </button>
        {showReplyInput && (
          <div style={styles.replyInputContainer}>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              style={styles.replyTextarea}
            />
            <button onClick={handleReplySubmit} style={styles.submitReplyButton}>
              Submit Reply
            </button>
          </div>
        )}
        {showReplies && (answer.replies || []).length > 0 && (
          <div style={styles.nested}>
            {answer.replies.map((reply) => (
              <AnswerItem key={reply.id} answer={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.answerSection}>
      <h4 style={styles.answerSectionTitle}>Answers</h4>
      <div style={styles.answerInputContainer}>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Write your answer..."
          style={styles.textarea}
        />
        <button onClick={handleAddAnswer} style={styles.submitButton}>
          Submit Answer
        </button>
      </div>
      <div>
        {answers.length === 0 ? (
          <p>No answers yet.</p>
        ) : (
          answers.map((answer) => (
            <AnswerItem key={answer.id} answer={answer} />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  answerSection: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  answerSectionTitle: {
    fontSize: '1.25rem',
    marginBottom: '10px',
  },
  answerInputContainer: {
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    minHeight: '80px',
    marginBottom: '10px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  answerItem: {
    marginBottom: '15px',
    paddingLeft: '10px',
    borderLeft: '2px solid #ddd',
  },
  answerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  toggleButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.25rem',
    color: '#aaa',
    fontWeight: 'normal',
  },
  answerText: {
    margin: 0,
    fontSize: '1rem',
    color: '#333',
  },
  nested: {
    marginTop: '10px',
  },
  replyButton: {
    marginTop: '5px',
    padding: '5px 10px',
    backgroundColor: '#e67e22',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  replyInputContainer: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  replyTextarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    minHeight: '60px',
    marginBottom: '5px',
  },
  submitReplyButton: {
    padding: '5px 10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default AnswerSection;

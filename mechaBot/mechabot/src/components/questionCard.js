import React, { useState } from 'react';
import Vote from './Vote';
import AnswerSection from './answerSection';

const QuestionCard = ({ question }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  const toggleAnswers = () => {
    setShowAnswers((prev) => !prev);
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{question.title}</h3>
      <p style={styles.body}>{question.body}</p>
      
      {/* Seção de votos */}
      <Vote upvotes={question.upvotes} downvotes={question.downvotes} />
      
      {/* Botão para mostrar/ocultar respostas */}
      <button style={styles.answerButton} onClick={toggleAnswers}>
        {showAnswers ? 'Hide Answers' : 'Show Answers'}
      </button>
      
      {/* Seção de respostas */}
      {showAnswers && <AnswerSection questionId={question.id} initialAnswers={question.answers} />}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '20px 10px',
    border: '1px solid #ddd',
  },
  title: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  body: {
    fontSize: '1rem',
    color: '#555',
  },
  answerButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '10px',
  },
};

export default QuestionCard;

import React, { useState } from 'react';
import styles from './QuestionCard.module.css';
import AnswerSection from './AnswerSection';

const QuestionCard = ({ question, onUpdateAnswers }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{question.title}</h3>
      <p className={styles.body}>{question.body}</p>

      <button
        onClick={() => setShowAnswers(prev => !prev)}
        className={styles.toggleButton}
      >
        {showAnswers ? 'Ocultar Respostas' : 'Mostrar Respostas'}
      </button>

      {showAnswers && (
        <AnswerSection
          questionId={question.id}
          initialAnswers={question.answers}
          onUpdateAnswers={onUpdateAnswers}
        />
      )}
    </div>
  );
};

export default QuestionCard;

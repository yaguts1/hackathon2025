import React, { useState } from 'react';
import AnswerItem from './AnswerItem';
import styles from './AnswerSection.module.css';
import { updateQuestion } from '../api';

const AnswerSection = ({ questionId, initialAnswers, onUpdateAnswers }) => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [text, setText] = useState('');

  const syncAnswers = async (newAnswers) => {
    setAnswers(newAnswers);
    onUpdateAnswers(questionId, newAnswers);
    await updateQuestion(questionId, { answers: newAnswers });
  };

  const handleVote = (id, type) => {
    const update = (answer) => {
      if (answer.id === id) {
        return { ...answer, [type]: answer[type] + 1 };
      }
      return {
        ...answer,
        replies: answer.replies.map(update)
      };
    };
    syncAnswers(answers.map(update));
  };

  const addReply = (parentId, replyText) => {
    const insert = (answer) => {
      if (answer.id === parentId) {
        return {
          ...answer,
          replies: [...answer.replies, {
            id: Date.now(),
            text: replyText,
            replies: [],
            upvotes: 0,
            downvotes: 0
          }]
        };
      }
      return {
        ...answer,
        replies: answer.replies.map(insert)
      };
    };
    syncAnswers(answers.map(insert));
  };

  const addAnswer = () => {
    if (!text.trim()) return;
    const newAnswer = {
      id: Date.now(),
      text,
      upvotes: 0,
      downvotes: 0,
      replies: []
    };
    syncAnswers([...answers, newAnswer]);
    setText('');
  };

  return (
    <div className={styles.section}>
      <h4 className={styles.title}>Respostas ({answers.length})</h4>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Compartilhe seu conhecimento..."
        className={styles.textarea}
      />
      <button onClick={addAnswer} className={styles.button}>Publicar Resposta</button>

      {answers.map(answer => (
        <AnswerItem
          key={answer.id}
          answer={answer}
          onVote={handleVote}
          addReply={addReply}
        />
      ))}
    </div>
  );
};

export default AnswerSection;

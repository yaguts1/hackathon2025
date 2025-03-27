import React, { useState } from 'react';
import styles from './QuestionForm.module.css';

const QuestionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const isFormValid = title.trim() && body.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSubmit({ title, body, upvotes: 0, downvotes: 0, answers: [] });
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.heading}>Nova Pergunta</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Dê um título claro e direto para sua pergunta..."
        className={styles.input}
        required
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Explique o problema ou contexto com detalhes..."
        className={styles.textarea}
        required
      />

      <button
        type="submit"
        className={styles.button}
        disabled={!isFormValid}
      >
        Publicar
      </button>
    </form>
  );
};

export default QuestionForm;

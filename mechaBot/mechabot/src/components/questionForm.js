import React, { useState } from 'react';

const QuestionForm = ({ addQuestion }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      const newQuestion = {
        id: Date.now(),
        title,
        body,
        upvotes: 0,
        downvotes: 0,
        answers: []  // Respostas vazias quando a pergunta é criada
      };
      addQuestion(newQuestion);
      setTitle('');
      setBody('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Ask a Question</h2>
      <div style={styles.inputGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Question title"
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="body">Description</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Question body"
          required
          style={styles.textarea}
        />
      </div>
      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: '#e8f4f8',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    minHeight: '150px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default QuestionForm;

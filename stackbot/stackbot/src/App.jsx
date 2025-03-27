import React, { useEffect, useState } from 'react';
import { getQuestions, createQuestion } from './api';
import QuestionCard from './components/QuestionCard';
import QuestionForm from './components/QuestionForm';
import ChatBot from './components/ChatBot'; // NOVO

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getQuestions();
      setQuestions(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleAddQuestion = async (question) => {
    const created = await createQuestion(question);
    setQuestions(prev => [...prev, created]);
  };

  const updateQuestionAnswers = (questionId, newAnswers) => {
    setQuestions(prev =>
      prev.map(q => q.id === questionId ? { ...q, answers: newAnswers } : q)
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>MechaBot 💬</h1>
        <button onClick={() => setDarkMode(prev => !prev)} style={styles.themeToggle}>
          {darkMode ? '🌞 Tema Claro' : '🌙 Tema Escuro'}
        </button>
      </header>

      <QuestionForm onSubmit={handleAddQuestion} />

      {loading ? (
        <p>Carregando perguntas...</p>
      ) : (
        questions.length === 0 ? (
          <p>Seja o primeiro a perguntar!</p>
        ) : (
          questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onUpdateAnswers={updateQuestionAnswers}
            />
          ))
        )
      )}

      {/* 🧠 Chatbot flutuante */}
      <ChatBot webhookUrl="https://hook.us2.make.com/clnho73h8b8yjavg9xioess9253k4sik" />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  themeToggle: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'var(--primary)',
    color: 'white',
    cursor: 'pointer'
  }
};

export default App;

import React, { useState } from 'react';
import Header from './components/header';  // Importando o cabeçalho
import QuestionForm from './components/questionForm';
import QuestionCard from './components/questionCard';

const App = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  return (
    <div>
      <Header /> {/* Cabeçalho com barra de pesquisa */}
      <div style={styles.appContainer}>
        <div style={styles.leftSection}>
          {questions.length === 0 ? (
            <p style={styles.emptyMessage}>
              Nenhuma pergunta ainda. Seja o primeiro a perguntar!
            </p>
          ) : (
            questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          )}
        </div>
        <div style={styles.rightSection}>
          <QuestionForm addQuestion={addQuestion} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  leftSection: {
    flex: 1,
    marginRight: '20px',
  },
  rightSection: {
    width: '350px',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#555',
    marginTop: '20px',
  },
};

export default App;

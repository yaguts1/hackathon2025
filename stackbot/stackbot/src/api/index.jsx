import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000
});

export const getQuestions = async () => {
  const res = await api.get('/questions');
  return res.data;
};

export const createQuestion = async (question) => {
  const res = await api.post('/questions', question);
  return res.data;
};

export const updateQuestion = async (id, data) => {
  const res = await api.patch(`/questions/${id}`, data);
  return res.data;
};

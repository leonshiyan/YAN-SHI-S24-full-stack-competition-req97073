import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

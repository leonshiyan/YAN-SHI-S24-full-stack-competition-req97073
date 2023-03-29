import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

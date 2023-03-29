import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await api.post('/products', product);
  return response.data;
  };
  
  export const updateProduct = async (productId, product) => {
    const response = await api.put(`/products/${productId}`, product);
    return response.data;
  };
  
  export const deleteProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
  };
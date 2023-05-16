import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

export const getAllUsers = async () => {
  const response = await axios.get(`${endpoint}/users`);
  return response.data;
};
export const getUser = async (id) => {
  const response = await axios.get(`${endpoint}/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${endpoint}/users`, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${endpoint}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${endpoint}/users/${id}`);
  return response.data;
};

export const getUserDetails = async (id) => {
  const response = await axios.get(`${endpoint}/users/${id}`);
  return response.data;
};
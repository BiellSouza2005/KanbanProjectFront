export const BASE_URL = 'http://localhost:5210/api';

export const USER_ENDPOINTS = {
  addUser: `${BASE_URL}/User/AdicionarUsuario`,
  signInUser: `${BASE_URL}/User/LoginUsuario`
};

export const TASK_ENDPOINTS = {
  addTask: `${BASE_URL}/Tasks`
}
export const BASE_URL = 'http://localhost:5210/api';

export const USER_ENDPOINTS = {
  addUser: `${BASE_URL}/User/AdicionarUsuario`,
  signInUser: `${BASE_URL}/User/LoginUsuario`,
  getAllUsers: `${BASE_URL}/User/VerTodosUsuarios`
};

export const TASK_ENDPOINTS = {
  addTask: `${BASE_URL}/Tasks`,
  getTasks: `${BASE_URL}/Tasks/user`
}
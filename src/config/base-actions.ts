// src/api/base-actions.ts
import axios from 'axios';
import { TASK_ENDPOINTS, USER_ENDPOINTS } from './endpoints';
import { CreateTask, Task, User, UserSignIn } from '../../src/interfaces/kanban-board-types';


export async function UserRegister(user: User, username: string = 'system') {
  try {
    const response = await axios.post(USER_ENDPOINTS.addUser, user, {
      headers: {
        'Content-Type': 'application/json',
        'User-Inclusion': username,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function UserLogin(user: UserSignIn) {
    try {
      const response = await axios.post(USER_ENDPOINTS.signInUser, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response;
    } catch (error) {
      throw error;
    }
  }

export async function getAllUsers() {
  try {
    const response = await axios.get(USER_ENDPOINTS.getAllUsers);
    return response.data;
  } catch (error) {
    throw error;
  }
}

function getUserName() {
  let username = sessionStorage.getItem('username');
  return username ?? 'system';
}

export async function TaskRegister(task: CreateTask) {
  const username = getUserName();

  try {
    const response = await axios.post(TASK_ENDPOINTS.addTask, task, {
      headers: {
        'Content-Type': 'application/json',
        'User-Inclusion': username,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

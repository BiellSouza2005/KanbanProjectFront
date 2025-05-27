// src/api/base-actions.ts
import axios from 'axios';
import { USER_ENDPOINTS } from './endpoints';
import { User, UserSignIn } from '../../src/interfaces/kanban-board-types';


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

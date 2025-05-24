import axios from 'axios';
import { Difficulty } from '../models/Difficulty';

const API_URL = `${import.meta.env.VITE_API_URL}/api/difficultys`;

export const fetchDifficultys = async (): Promise<Difficulty[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching difficultys:', error);
    throw error;
  }
};
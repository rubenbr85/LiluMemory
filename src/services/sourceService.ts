import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CharacterSource } from '../models/CharacterSource';

const API_URL = `${import.meta.env.VITE_API_URL}/api/sources`;

export const fetchSources = async (): Promise<CharacterSource[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw error;
  }
};

export const useSources = () => {
  return useQuery<CharacterSource[], Error>({
    queryKey: ['sources'],
    queryFn: fetchSources,
    staleTime: 5 * 60 * 1000, // Los datos se consideran frescos por 5 minutos
    gcTime: 30 * 60 * 1000, // Los datos se mantienen en caché por 30 minutos
  });
};
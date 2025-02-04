import axios from 'axios';
import { GET_ABILITY } from '../constants/api';

export const fetchAllAbilities = async () => {
  try {
    const response = await axios.get(`${GET_ABILITY}?offset=0&limit=20`);

    return response.data.results;
  } catch {
    throw new Error('Failed to fetch abilities list');
  }
};

import axios from 'axios';
import { GET_ABILITY } from '../constants/api';

export const fetchAbility = async (abilityIdOrName: string) => {
  try {
    const response = await axios.get(`${GET_ABILITY}/${abilityIdOrName}`);

    return response.data;
  } catch {
    throw new Error('Failed to fetch ability data');
  }
};

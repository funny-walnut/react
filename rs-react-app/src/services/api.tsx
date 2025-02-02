import axios from 'axios';

export const fetchAbility = async (abilityIdOrName: string) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/ability/${abilityIdOrName}/`
    );
    return response.data;
  } catch {
    throw new Error('Failed to fetch ability data');
  }
};

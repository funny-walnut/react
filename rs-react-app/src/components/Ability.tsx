import { useState, useEffect } from 'react';
import { fetchAbility } from '../services/ability';

interface AbilityProps {
  abilityIdOrName: string;
}

const Ability = ({ abilityIdOrName }: AbilityProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbilityData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAbility(abilityIdOrName);
        setName(data.names[0]?.name || 'Unknown Ability');
        setDescription(
          data.effect_entries[0]?.effect || 'No description available'
        );
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAbilityData();
  }, [abilityIdOrName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Ability: {name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Ability;

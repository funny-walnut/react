import { useState, useEffect } from 'react';
import Search from '../components/Search';
import ErrorButton from '../components/ErrorButton';
import Ability from '../components/Ability';
import { fetchAllAbilities } from '../services/allAbilities';
import useLocalStorage from '../utils/hooks/useLocalStorage';

const Home = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [abilities, setAbilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllAbilities = async () => {
      try {
        const result = await fetchAllAbilities();
        setAbilities(result);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadAllAbilities();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <h1>Ability Search</h1>
      <Search onSearch={handleSearch} />

      {searchTerm ? (
        <Ability abilityIdOrName={searchTerm} />
      ) : isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <ul>
          {abilities.map((ability: { name: string }) => (
            <li key={ability.name}>{ability.name}</li>
          ))}
        </ul>
      )}

      <ErrorButton />
      <footer>
        <p>
          For more information, check the{' '}
          <a
            href="https://pokeapi.co/docs/v2#abilities:~:text=Pok%C3%A9mon-,Abilities,-Characteristics"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokeAPI documentation
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default Home;

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Ability,
  AbilityListResponse,
  fetchAllAbilities,
} from '../services/allAbilities';
import { AbilityDetails, fetchAbilityDetails } from '../services/detailes';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedAbility, setSelectedAbility] = useState<AbilityDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAbilities = async () => {
      try {
        setIsLoading(true);
        const response: AbilityListResponse =
          await fetchAllAbilities(currentPage);
        setAbilities(response.results);
        setTotalCount(response.count);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    loadAbilities();
  }, [currentPage]);

  const handleItemClick = async (ability: Ability) => {
    setIsLoading(true);
    try {
      const details = await fetchAbilityDetails(ability.url);
      setSelectedAbility(details);

      const abilityId = ability.url.split('/').filter(Boolean).pop();

      navigate(`/?page=${currentPage}&details=${abilityId}`);
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedAbility(null);
    navigate(`/?page=${currentPage}`);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalCount / 10);
    return (
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => navigate(`/?page=${index + 1}`)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h2>Abilities</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {abilities.map((ability) => (
              <li key={ability.name}>
                <button onClick={() => handleItemClick(ability)}>
                  {ability.name}
                </button>
              </li>
            ))}
          </ul>
        )}
        {renderPagination()}
      </div>

      {selectedAbility && (
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <h2>Ability Details</h2>
          <button onClick={handleCloseDetails}>Close</button>
          <div>
            <h3>{selectedAbility.name}</h3>
            <p>{selectedAbility.effect_entries[0]?.effect}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

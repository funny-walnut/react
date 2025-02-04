import { Component } from 'react';
import Search from '../components/Search';
import ErrorButton from '../components/ErrorButton';
import Ability from '../components/Ability';
import { fetchAllAbilities } from '../services/allAbilities';

interface State {
  searchTerm: string;
  abilities: AbilityType[];
  isLoading: boolean;
  error: string | null;
}

interface AbilityType {
  name: string;
}

class Home extends Component {
  state: State = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    abilities: [],
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    this.loadAllAbilities();
  }

  loadAllAbilities = () => {
    this.setState({ isLoading: true, error: null });

    fetchAllAbilities()
      .then((abilities) => {
        this.setState({ abilities, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    const { searchTerm, abilities, isLoading, error } = this.state;

    return (
      <div>
        <h1>Ability Search</h1>
        <Search onSearch={this.handleSearch} />

        {searchTerm ? (
          <Ability abilityIdOrName={searchTerm} />
        ) : isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
          <ul>
            {abilities.map((ability) => (
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
  }
}

export default Home;

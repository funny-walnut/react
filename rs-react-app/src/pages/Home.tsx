import { Component } from 'react';
import Search from '../components/Search';
import Ability from '../components/Ability';

class Home extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <h1>Ability Search</h1>
        <Search onSearch={this.handleSearch} />
        {searchTerm && <Ability abilityIdOrName={searchTerm} />}

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

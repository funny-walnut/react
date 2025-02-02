import { Component } from 'react';
import { fetchAbility } from '../services/api';

interface AbilityProps {
  abilityIdOrName: string;
}

interface AbilityState {
  name: string;
  description: string;
  isLoading: boolean;
  error: string | null;
}

class Ability extends Component<AbilityProps, AbilityState> {
  state = {
    name: '',
    description: '',
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchAbilityData();
  }

  componentDidUpdate(prevProps: AbilityProps) {
    if (this.props.abilityIdOrName !== prevProps.abilityIdOrName) {
      this.fetchAbilityData();
    }
  }

  fetchAbilityData = () => {
    this.setState({ isLoading: true, error: null });
    fetchAbility(this.props.abilityIdOrName)
      .then((data) => {
        const abilityName = data.names[0]?.name || 'Unknown Ability';
        const abilityDescription =
          data.effect_entries[0]?.effect || 'No description available';
        this.setState({
          name: abilityName,
          description: abilityDescription,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          isLoading: false,
        });
      });
  };

  render() {
    const { name, description, isLoading, error } = this.state;

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
  }
}

export default Ability;

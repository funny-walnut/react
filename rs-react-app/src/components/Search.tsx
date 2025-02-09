import { useState } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const Search = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter ability name or id"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;

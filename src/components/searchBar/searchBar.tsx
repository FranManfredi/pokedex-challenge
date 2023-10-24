import './searchBar.css';
import searchBarIcon from '../../assets/input-search-bg.png';
import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchValue(event.target.value);
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    navigate(`/${searchValue}`);
    setSearchValue('');
  }

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          className="search-container"
          type="text"
          id="search-input"
          placeholder="Name or Number"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button className="search-icon" id="search-button" type="submit">
          <img src={searchBarIcon} alt='magnifying-glass' />
        </button>
      </form>
      <div className="text-box">
        Search for a Pokémon by <strong>name</strong> or using its <strong>National Pokédex number</strong>.
      </div>
    </div>
  );
}

export { SearchBar };
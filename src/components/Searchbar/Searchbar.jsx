import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchbar,
  StyledForm,
  StyledInput,
  StyledSearchButton,
  StyledErrorMessage,
} from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');
  const [showError, setShowError] = useState(false);

  const handleChange = (event) => {
    setQuery(event.target.value);
    setShowError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim() === '') {
      setShowError(true);
      return;
    }

    onSubmit(query);
  };

  return (
    <StyledSearchbar>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <StyledSearchButton type="submit">
          <span className="button-label">Search</span>
        </StyledSearchButton>
      </StyledForm>
      {showError && (
        <StyledErrorMessage>
          Please enter a search query
        </StyledErrorMessage>
      )}
    </StyledSearchbar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  //console.log(q);
  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Find a hero"
              name="searchText"
              value={searchText}
              autoCapitalize="off"
              onChange={handleInputChange}
              className="form-control"
            />
            <button type="submit" className="btn m-1 btn-block btn-outline-primary">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          {q === "" && <div className="alert alert-info">Search a hero</div>}
          {q !== "" && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">There are no heroes with {q}</div>
          )}
          <hr />
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};

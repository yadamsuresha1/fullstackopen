import { useState } from "react";
import countriesService from "../src/services/countries";
import { useEffect } from "react";
import CountryDetails from "./components/CountryDetails";
const App = () => {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchString, setSearchString] = useState("");
  const handleSearch = (event) => {
    const value = event.target.value;
    console.log(value);
    setSearchString(value);
  };
  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  useEffect(() => {
    if (searchString.length > 0) {
      const filters = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchString)
      );
      console.log("filters", filters);
      setFilteredCountries(filters);
    } else {
      setFilteredCountries([]);
    }
  }, [searchString]);

  if (countries === null) {
    return null;
  }
  return (
    <div>
      find countries{" "}
      <input
        value={searchString}
        placeholder="search for a country"
        onChange={handleSearch}
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button
              onClick={() => setSearchString(country.name.common.toLowerCase())}
            >
              show
            </button>
          </div>
        ))
      )}
      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
    </div>
  );
};
export default App;

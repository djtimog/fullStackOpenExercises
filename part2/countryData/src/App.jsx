import { useEffect, useState } from "react";
import axios from "axios";
import { CountryBox } from "./component";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [countriesToShow, setCountriesToShow] = useState(null);
  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    const searchedCoutries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    );
    if (searchCountry.length === 0) {
      setCountriesToShow(null);
    } else {
      setCountriesToShow(searchedCoutries);
    }
  }, [searchCountry]);

  return (
    <div>
      <form>
        find countries
        <input value={searchCountry} onChange={handleSearchChange} />
      </form>
      <CountryBox countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;

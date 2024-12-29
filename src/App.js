import React, { useState, useEffect } from 'react';
import './App.css';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch countries
  useEffect(() => {
    setIsLoading(true);
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setIsLoading(false);
      });
  }, []);

  // Fetch states when country is selected
  useEffect(() => {
    if (selectedCountry) {
      setIsLoading(true);
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((response) => response.json())
        .then((data) => {
          setStates(data);
          setCities([]); // Clear cities when new country is selected
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching states:', error);
          setIsLoading(false);
        });
    }
  }, [selectedCountry]);

  // Fetch cities when state is selected
  useEffect(() => {
    if (selectedState) {
      setIsLoading(true);
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((response) => response.json())
        .then((data) => {
          setCities(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cities:', error);
          setIsLoading(false);
        });
    }
  }, [selectedCountry, selectedState]);

  return (
    <div>
      <h2>Select Location</h2>

      <div>
        <label htmlFor="country">Select Country</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="state">Select State</label>
        <select
          id="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="city">Select City</label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && selectedState && selectedCountry && (
        <p>You Selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
};

export default LocationSelector;
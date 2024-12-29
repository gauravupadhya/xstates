import React, { useState, useEffect } from 'react';
import './App.css';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch countries
  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.error('Error fetching states:', error));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error('Error fetching cities:', error));
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState]);

  // Handle country change
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);
  };

  // Handle state change
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    setCities([]);
  };

  // Handle city change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <h2>Select Location</h2>

      <div>
        <label htmlFor="country">Select Country</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
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
          onChange={handleStateChange}
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
          onChange={handleCityChange}
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
        <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
};

export default LocationSelector;
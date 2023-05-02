import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestBaby() {
  const [typeArray, changeTypeArray] = useState([]);
  const [selectedOption, changeSelectedOption] = useState('');
  const [userData, setUserData] = useState(null);

  //Sends a call to PokeAPI and receives a list of pokemon types with their associated urls
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type')
      .then(response => {
        const arrayOfTypes = response.data.results.map(types => {
          return {
            name: types.name,
            url: types.url
          }
        });
        changeTypeArray(arrayOfTypes);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Uses user's selected option to access an array of all pokemon of a type
  useEffect(() => {
    if (selectedOption) {
      let object = typeArray.find(o => o.name === selectedOption);
      axios.get(object.url)
        .then(response => {
          function findRandomPokemon() {
            let receivedArrayOfAType = response.data.pokemon;
            let randomNumber = [Math.floor(Math.random() * receivedArrayOfAType.length)];
            let randomPokemon = receivedArrayOfAType[randomNumber].pokemon.name;
            return randomPokemon
          };
          let returnArray = [];
          for (let i = 0; i < 3; i++) {
            returnArray.push(findRandomPokemon())
          }

            setUserData(returnArray);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setUserData(null);
    }
  }, [selectedOption]);

  function handleOptionChange(event) {
    changeSelectedOption(event.target.value);
  }

  return (
    <div>
      <h2>Select a type:</h2>

      <form>
        <select 
          value={selectedOption} 
          onChange={handleOptionChange}
        >
          <option value="">--Select your team type--</option>
          {typeArray.map(option => (
            <option 
              key={option.name} 
              value={option.name}>{option.name}
            </option>
          ))}
        </select>
        <input
          type="submit"
          value="Submit"
          // EVENTUALLY, ADD AN ONCLICK SO THAT OPTIONS CAN REFRESH
          // onClick={handleOptionChange}
        />
      </form>

{/* && operator only displays the following if variable is truthy */}
      {userData && (
        <div>
          <h3>Your New Team:</h3>
          <p>Name: {userData[0]}</p>
          <p>Name: {userData[1]}</p>
          <p>Name: {userData[2]}</p>
        </div>
      )}
    </div>
  );
}

export default TestBaby;
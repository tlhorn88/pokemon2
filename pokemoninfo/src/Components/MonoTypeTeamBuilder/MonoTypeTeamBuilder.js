import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';

function MonoTypeTeamBuilder() {
  const [typeArray, changeTypeArray] = useState([]);
  const [selectedOption, changeSelectedOption] = useState('');
  const [randomPokemonArray, changeRandomPokemonArray] = useState(null);

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

  function handleOptionChange(event) {
    changeSelectedOption(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedOption) {
      let object = typeArray.find(o => o.name === selectedOption);
      axios.get(object.url)
        .then(response => {
          let receivedArrayOfAType = response.data.pokemon;
          const promises = receivedArrayOfAType.map(async (item) => {
            const itemResponse = await axios.get(`${item.pokemon.url}`);
            return itemResponse;
          })
          // will not be able to access data if using "return promises"
          return Promise.all(promises);
        })
          .then(response => {
            function findRandomPokemon() {
              let randomNumber = [Math.floor(Math.random() * response.length)];
              let randomPokemon = response[randomNumber]
              return randomPokemon.data;
            };

            let arrayOfRandoms = [];
            
            while (arrayOfRandoms.length < 3) {
              let tempRandom = findRandomPokemon();
              if (tempRandom.types.length === 2) {
                if (!arrayOfRandoms.some(pokemon => pokemon.types[1]?.type.name === tempRandom.types[1]?.type.name)) {
                  arrayOfRandoms.push(tempRandom);
                }
              } else 
                if (!arrayOfRandoms.some(pokemon => pokemon.types.length === 1 )) {
                  arrayOfRandoms.push(tempRandom);
              }
            }

            arrayOfRandoms.forEach(element => console.log(
              "Array of Randoms: " + 
              element.name + 
              " Type1: " + 
              element.types[0].type.name + 
              " Type 2: " + 
              (element.types[1] ? element.types[1]?.type.name : "N/A")
              ));
              console.log(arrayOfRandoms[0]);
              console.log(arrayOfRandoms[0].types[0].type.name)
              changeRandomPokemonArray(arrayOfRandoms.map(element => ({
                name: element.name,
                type1: element.types[0].type.name,
                type2: element.types[1] ? element.types[1]?.type.name : "N/A",
                spriteUrl: element.sprites.front_default
              })));
          })

        .catch(error => {
          console.error(error);
        });
    } else {
      changeRandomPokemonArray(null);
    }
  }

console.log(randomPokemonArray);

  return (
    <div>
      <h2>Select a type:</h2>

      <form
        onSubmit={handleSubmit}  
      >
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
{/* Later, add a .map function */}
      {randomPokemonArray && (
        <div>
          <h3>Your New Team:</h3>
          <p>Name: {randomPokemonArray[0].name}</p>
          <p>Name: {randomPokemonArray[1].name}</p>
          <p>Name: {randomPokemonArray[2].name}</p>
          
          <div className='cardContainer'>

          <ul className="randomTeam">
                    {randomPokemonArray.map((pokemon) => (
                        <Card 
                        name={pokemon.name}
                        type1={pokemon.type1}
                        type2={pokemon.type2}
                        img={pokemon.spriteUrl}
                        />
                        ))}
          </ul>


        </div>
        </div>
      )}

    </div>
  );
}

export default MonoTypeTeamBuilder;
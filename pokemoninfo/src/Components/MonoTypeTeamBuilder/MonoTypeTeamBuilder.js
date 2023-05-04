import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import './MonoTypeTeamBuilder.css';

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
    // default is to refresh page!!
    event.preventDefault();
    if (selectedOption) {
      let object = typeArray.find(o => o.name === selectedOption);
      axios.get(object.url)
        .then(response => {
          let receivedArrayOfAType = response.data.pokemon;

          let cleanedReceivedArrayOfAType = [];

          for (let i = 0; i < receivedArrayOfAType.length; i++) {
            if (receivedArrayOfAType[i].pokemon.name.includes('-') == false ) {
              cleanedReceivedArrayOfAType.push(receivedArrayOfAType[i])
            }
          }

          const promises = cleanedReceivedArrayOfAType.map(async (item) => {
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
              console.log("tempBoy ", tempRandom);
              if (tempRandom.types.length === 2) {
                if (!arrayOfRandoms.some(pokemon => pokemon.types[1]?.type.name === tempRandom.types[1]?.type.name)) {
                  arrayOfRandoms.push(tempRandom);
                }
              } else 
                if (!arrayOfRandoms.some(pokemon => pokemon.types.length === 1 )) {
                  arrayOfRandoms.push(tempRandom);
              }
            }

            const promises = arrayOfRandoms.map(async (element) => {
              const speciesResponse = await axios.get(`${element.species.url}`);
              const flavorTextEntries = speciesResponse.data.flavor_text_entries;
              const flavorTextEntry = flavorTextEntries.find(entry => entry.language.name == "en");
              return {
                name: element.name,
                type1: element.types[0].type.name,
                // checks to see if type2 exists.  if not, type2 = "N/A"
                type2: element.types[1] ? element.types[1]?.type.name : "N/A",
                imgUrl: element.sprites.other['official-artwork'].front_default,
                flavorText: flavorTextEntry?.flavor_text
              };
            })

            return Promise.all(promises);
          })
          .then(newRandomPokemonArray => {
            changeRandomPokemonArray(newRandomPokemonArray);
          })
          .catch(error => {
            console.error(error);
          });
        } else {
          changeRandomPokemonArray(null);
        }
      }

  return (
    <div className='cardContainer'>
      <div>
      <h2>Select a type:</h2>
        <form
          onSubmit={handleSubmit}  
        >
          <select 
            value={selectedOption} 
            onChange={handleOptionChange}
            className="optionSelect"
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
          />
        </form>
      </div>

{/* && operator only displays the following if variable is truthy */}
      {randomPokemonArray && (
        <div>          
          <ul className="randomTeam">
                    {randomPokemonArray.map((pokemon) => (
                        <Card 
                        name={pokemon.name}
                        type1={pokemon.type1}
                        type2={pokemon.type2}
                        img={pokemon.imgUrl}
                        flavorText={pokemon.flavorText}
                        />
                        ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default MonoTypeTeamBuilder;
import './NameInput.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';

function NameInput() {
  const [pokeHabitat, changeHabitat] = useState('');
  const [pokeName, changeName] = useState('');
  const [displayName, changeDisplayName] = useState();
  const [pokeInfo, changePokeInfo] = useState();
  const [error, changeError] = useState(false);
  const [isLoading, changeIsLoading] = useState(false);

  useEffect(() => {
    const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${displayName}`;
    axios
      .get(pokeApiUrl)
      .then((response) => {
        let pokeInfo = {
          name: response.data.name,
          type1: response.data.types[0].type.name,
          pokePhoto:
            response.data.sprites.other['official-artwork'].front_default,
          // THIS ? CHECKS IF DATA TYPE EXISTS
          type2: response.data.types[1]?.type.name,
          speciesUrl: response.data.species.url,
        };
        changePokeInfo(pokeInfo);
        changeError(false);
        axios.get(pokeInfo.speciesUrl).then((response) => {
          let habitat = response.data.habitat.name;

          function startsWithVowel(habitat) {
            return /[aeiou]/i.test(habitat[0]);
          }
          if (startsWithVowel(habitat) == true) {
            changeHabitat(
              `Your Pokémon likes to live in an ${habitat} setting!`
            );
          } else {
            changeHabitat(
              `Your Pokémon likes to live in a ${habitat} setting!`
            );
          }
        });
        changeIsLoading(false);
      })
      .catch((error) => {
        changeError(true);
        changeIsLoading(false);
      });
  }, [displayName]);

  const handleNameChange = (e) => {
    changeName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lowercaseInput = pokeName.toLowerCase();

    if (lowercaseInput === displayName) {
      // changeError(true);
      return;
    }

    changeIsLoading(true);

    changeDisplayName(lowercaseInput);
    changeError(false);
  };

  return (
    <div>
      <div className="cardContainer">
        <form>
          <label>
            Pokémon Name:
            <input
              type="text"
              name="name"
              value={pokeName}
              onChange={handleNameChange}
            />
          </label>
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>

        {pokeInfo && !isLoading && !error && (
          <Card
            name={pokeInfo.name}
            img={pokeInfo.pokePhoto}
            flavorText={pokeHabitat}
            type1={pokeInfo.type1}
            type2={pokeInfo.type2}
          />
        )}

        {isLoading && <h2>Loading...</h2>}

        {error && displayName && (
          <h2>
            We're sorry. There isn't a Pokémon named {displayName} yet. Maybe
            try searching for Grimer?
          </h2>
        )}
      </div>
    </div>
  );
}

export default NameInput;

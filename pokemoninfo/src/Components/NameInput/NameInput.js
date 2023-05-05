import './NameInput.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';

function NameInput() {
  const [pokeHabitat, changeHabitat] = useState('');
  const [pokeName, changeName] = useState('');
  const [displayName, changeDisplayName] = useState();
  const [pokeInfo, changePokeInfo] = useState();

  useEffect(() => {
    const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${displayName}`;
    axios.get(pokeApiUrl)
      .then(response => {
        let pokeInfo = {
          name: response.data.name,
          type1: response.data.types[0].type.name,
          pokePhoto: response.data.sprites.other['official-artwork'].front_default,
          // THIS ? CHECKS IF DATA TYPE EXISTS
          type2: response.data.types[1]?.type.name,
          speciesUrl: response.data.species.url
        }
        changePokeInfo(pokeInfo);
        axios.get(pokeInfo.speciesUrl)
        .then (response => {
          let habitat = response.data.habitat.name;
          changeHabitat(`Your pokémon likes to live in a ${habitat} setting!`)
        })
      })
  }, [displayName]);

  const handleNameChange = (e) => {
    changeName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeDisplayName(pokeName);
  }

  return (
    <div>

      <div className='cardContainer'>

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

        {pokeInfo && (
          <Card 
            name={pokeInfo.name}
            img={pokeInfo.pokePhoto}
            flavorText={pokeHabitat}
            type1={pokeInfo.type1}
            type2={pokeInfo.type2}
            />
        )}
      </div>
    </div>
  );
}

export default NameInput;

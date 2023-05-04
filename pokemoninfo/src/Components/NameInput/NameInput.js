import './NameInput.css';
import axios from 'axios';
import { useState } from 'react';
import Card from '../Card/Card';

function NameInput() {
  const [pokeHabitat, changeHabitat] = useState('');
  const [pokeName, changeName] = useState('');
  const [displayName, changeDisplayName] = useState('Your Pokemon');
  const [pokeType, changePokeType] = useState('');
  const [pokeType2, changePokeType2] = useState('');
  const [pokePhoto, changePokePhoto] = useState('');

  const pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

  const sendGetRequestPokemon = async () => {
    try {
      const response = await axios.get(pokeapiUrl);
      // look at object on API to discover format
      const pokeInfo = response.data.species.url;
      return pokeInfo;
    } catch (err) {
      console.error(err);
    }
  };

  const sendGetRequestHabitat = async () => {
    try {
      const url = await sendGetRequestPokemon();
      const response = await axios.get(url);

      const habitat = response.data.habitat.name;
      return habitat;
    } catch (err) {
      console.error(err);
    }
  };

  const sendGetRequestSprite = async () => {
    try {
      const response = await axios.get(pokeapiUrl);

      const pokePhoto = response.data.sprites.other['official-artwork'].front_default;
      return pokePhoto;
    } catch (err) {
      console.error(err);
    }
  };

  const sendGetRequestType = async () => {
    try {
      const response = await axios.get(pokeapiUrl);

      const pokeType = response.data.types[0].type.name;
      return pokeType;
    } catch (err) {
      console.error(err);
    }
  };

  const sendGetRequestType2 = async () => {
    try {
      const response = await axios.get(pokeapiUrl);
      if (response.data.types[1]) {
        return response.data.types[1].type.name;
      }
      return '';
    } catch (err) {
      console.error(err);
    }
  };

  const habitatInfo = `Your Pokemon mostly lives in the ${pokeHabitat}!`

  const handleNameChange = (e) => {
    changeName(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // updates pokeHabitat and types to reflect request response
      const pokeHabitat = await sendGetRequestHabitat();
      const pokeType = await sendGetRequestType();
      const pokeType2 = await sendGetRequestType2();
      const pokePhoto = await sendGetRequestSprite();

      changeHabitat(pokeHabitat);
      changeDisplayName(pokeName);
      changePokeType(pokeType);
      changePokeType2(pokeType2);
      changePokePhoto(pokePhoto);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>


      <div className='cardContainer'>

        <form>
          <label>
            Pokemon Name:
            <input
              type="text"
              name="name"
              value={pokeName}
              onChange={handleNameChange}
            />
          </label>
          <input type="submit" value="Submit" onClick={handleClick} />
        </form>
        <Card 
          name={pokeName}
          type1={pokeType}
          type2={pokeType2}
          img={pokePhoto}
          flavorText={habitatInfo}
          />
      </div>
    </div>
  );
}

export default NameInput;

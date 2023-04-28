import './NameInput.css';
import axios from 'axios';
import { useState } from "react";

function NameInput() {
  const [pokeHabitat, changeHabitat] = useState("...");
  const [pokeName, changeName] = useState("");
  const [displayName, changeDisplayName] = useState("Your Pokemon")
  const [pokeType, changePokeType] = useState("");
  const [pokeType2, changePokeType2] = useState("");
  const [typeCountContent, changeTypeCountContent] = useState("");

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
      console.log(habitat);
      return habitat;
      
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
  }

  const sendGetRequestType2 = async () => {
    try {
      const response = await axios.get(pokeapiUrl);
      if (response.data.types[1]) {
        return response.data.types[1].type.name;
      }
      return "";
    } catch (err) {
      console.error(err);
    }
  }
  
  const handleNameChange = (e) => {
    changeName(e.target.value);
  }
  
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // updates pokeHabitat and types to reflect request response
      const pokeHabitat = await sendGetRequestHabitat();
      const pokeType = await sendGetRequestType();
      const pokeType2 = await sendGetRequestType2();

      const soloType = `${pokeType}`;
      const dualType = `${pokeType} / ${pokeType2}`;

      if (pokeType2) {
        changeTypeCountContent(dualType);
      } else {
        changeTypeCountContent(soloType);
      } 

      changeHabitat(pokeHabitat);
      changeDisplayName(pokeName);
      changePokeType(pokeType);
      changePokeType2(pokeType2);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
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
        <input 
          type="submit" 
          value="Submit" 
          onClick={handleClick} 
        />
      </form>

      <h2>Type(s): {typeCountContent}</h2>
      <h2>{displayName} mostly lives in the:</h2>
      <h2>{pokeHabitat}</h2>
    </div>
  )
}

export default NameInput;

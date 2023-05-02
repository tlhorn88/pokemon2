import { useState } from "react";
import axios from "axios";

function OldMonoTypeTeamBuilder() {
  const [pokeTypeArray, changePokeTypeArray] = useState([1, 3]);
  const [pokeName, changeName] = useState("bug");
  const [displayName, changeDisplayName] = useState("__}@@{__")
  const [randomPokemon, changeRandomPokemon] = useState("pikachu");
  const [pokeTypeUrl, changePokeTypeUrl] = useState("");

// NEED TO ADD CONDITIONAL STATEMENT TO CHANGE "So, you want"
  const sendGetRequestArrayOfTypes = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const typeArray = response.data.results;
      let object = typeArray.find(o => o.name === displayName);
      let typeUrl = object.url;
      return typeUrl;

    } catch (err) {
      console.error(err);
    }
  };

  const sendGetRequestPokemonOfAType = async () => {
    try {
      const url = pokeTypeUrl;
      const response = await axios.get(url);

      const typeArray = response.data.pokemon;
      const randomNumber = [Math.floor(Math.random() * typeArray.length)];
      const randomPokemon = typeArray[randomNumber].pokemon.name;
      const randomNumber2 = [Math.floor(Math.random() * typeArray.length)];
      const randomPokemon2 = typeArray[randomNumber2].pokemon.name;
      const randomNumber3 = [Math.floor(Math.random() * typeArray.length)];
      const randomPokemon3 = typeArray[randomNumber3].pokemon.name;
      return [randomPokemon, randomPokemon2, randomPokemon3];

    } catch (err) {
      console.error(err);
    }
  };

  const handleTypeChange = (e) => {
    changeName(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const pokeTypeUrlReceived = await sendGetRequestArrayOfTypes();
      changePokeTypeUrl(pokeTypeUrlReceived);

      const randomPokemon = await sendGetRequestPokemonOfAType();
      changeDisplayName(pokeName);
      changeRandomPokemon(randomPokemon);
      console.log(randomPokemon);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>MonoTypeTeamBuilder</h1>

      <form>
        <label>Choose a type:

        </label>

        <select
          onChange={handleTypeChange}
          defaultValue={'DEFAULT'}
        >
          <option value="DEFAULT" disabled>Select a type!</option>
          <option value="bug">Bug</option>
          <option value="dark">Dark</option>
          <option value="dragon">Dragon</option>
          <option value="electric">Electric</option>
          <option value="fairy">Fairy</option>
          <option value="fighting">Fighting</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="ghost">Ghost</option>
          <option value="grass">Grass</option>
          <option value="ground">Ground</option>
          <option value="ice">Ice</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="steel">Steel</option>
          <option value="water">Water</option>
        </select>
        <input
          type="submit"
          value="Submit"
          onClick={handleClick}
        />
      </form>
      <h2>So, you want a(n) {displayName} team?</h2>
      <p>Here's your team:</p>
      {/* <p> {randomPokemon[0]}</p>
      <p> {randomPokemon[1]}</p>
      <p> {randomPokemon[2]}</p> */}
    </div>
  )
}

export default OldMonoTypeTeamBuilder;

// SOMETHING THAT'S BROKEN:
// It takes three times after clicking "Submit" for the names to populate!!?
// NOW!  The first click produces: "undefined" for the array...it's happening because "url" is undefined...

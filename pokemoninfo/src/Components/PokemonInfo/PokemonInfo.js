import './PokemonInfo.css';

function PokemonInfo() {
  const habitat = "ROCKS!"
  return (
    <div>
      <h3>Your Pokemon mostly lives in the:</h3>
      <h3>{habitat}</h3>
    </div>
  )
}

export default PokemonInfo;
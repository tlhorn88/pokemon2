import './App.css';
import Title from './Components/Title/Title';
import NameInput from './Components/NameInput/NameInput';
import PokemonInfo from './Components/PokemonInfo/PokemonInfo';

function App() {
  return (
    <div className="App">
      <Title />
      <NameInput />
      {/* <PokemonInfo /> */}
    </div>
  );
}

export default App;

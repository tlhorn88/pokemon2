import './App.css';
import Title from './Components/Title/Title';
import NameInput from './Components/NameInput/NameInput';
import MonoTypeTeamBuilder from './Components/MonoTypeTeamBuilder/MonoTypeTeamBuilder';
import NoMatch from './Components/NoMatch/NoMatch';
import Layout from './Components/Layout/Layout';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Title />} />
          <Route path='nameInput' element={<NameInput />} />
          <Route path="monoTypeTeamBuilder" element={<MonoTypeTeamBuilder />} />
          <Route path ="*" element={<NoMatch />} />
        </Route>
      </Routes>





    </div>
  );
  
}

export default App;

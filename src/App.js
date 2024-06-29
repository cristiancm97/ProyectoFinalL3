import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Registro from './componentes/pages/Registro';
import Login from './componentes/pages/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
        </Routes>
      </BrowserRouter>     
    </div>
  );
}

export default App;

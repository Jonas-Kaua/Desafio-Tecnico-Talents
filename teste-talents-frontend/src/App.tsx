import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react'

//Componentes
import Header from './components/Header'

//Pages
import Home from './pages/Home';
import Cadastrar from './pages/Cadastrar';

function App() {

  return (

    <div>

      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}> </Route>
          <Route path='/cadastrar' element={<Cadastrar />}> </Route>
          <Route path='/editar/:idRoute' element={<Cadastrar />}> </Route>
        </Routes>
      </Router>
     
    </div>

  )
  
}

export default App

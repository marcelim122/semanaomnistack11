//import React, {useState} from 'react';
//intalar cliente http npm install axios
import React from 'react';

import './global.css';
//import Header from './Header';
//import Logon from './pages/Logon';
import Routes from './routes';

function App() {
  /*//retorna um array [valor, função de atualização]
  const [counter, setCounter] = useState(0); //alterar o estado em tempo real

  function increment(){
    setCounter(counter + 1); //sobrepoem o valor da variavel, não altera diretamente

    console.log(counter);
  }*/

  return (
    <Routes />
  );
}

export default App;

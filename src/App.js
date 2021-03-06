import socket from './componentes/Socket';
import './App.css';
import React, { useState }from 'react';
import Chat from './componentes/Chat';

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);
  const registrar = (e) => {
    e.preventDefault();
    if(nombre !== ""){
      setRegistrado(true);
    }
  
  }
  return (
    <div className="App">
  
      {
        !registrado && 
      <form onSubmit={registrar}>
      <label htmlFor = "">Introduzca su nombre </label>
      <input value= {nombre} onChange = {e => setNombre(e.target.value)}/>
      <button >Ir a la aplicación </button>
      </form>
      }
      {
        registrado &&
        <Chat nombre ={nombre}/>
      }
    </div>
  );
}

export default App;

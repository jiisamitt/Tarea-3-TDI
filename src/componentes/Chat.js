import React, {useState, useEffect , useRef} from 'react';
import socketchat from './Socketchat';
import socket from './Socket';
import socketflight from './SocketFlight';
import '../App.css';
import Flights from './Flights';
import MapView from './MapView';
import Positions from './Positions';


const Chat = ({ nombre }) => {

    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);

    const [posiciones, setPosiciones] = useState([]);
    const [vuelos, setVuelos] = useState([]);

    useEffect(() => {
        socketchat.emit('conectado', nombre)

    }, [nombre]);

    useEffect(() => {
        socketchat.on('CHAT', mensaje=> {
            setMensajes([...mensajes, mensaje]);

            
        })
        socket.on('POSITION', posicion => {
            setPosiciones([...posiciones, posicion]);  
         
        })
        socketflight.on('FLIGHTS', vuelos => {
            setVuelos(vuelos);
        })
        return () => {socketchat.off()}
    }, [mensajes]);

    const submit = (e) => {
        e.preventDefault();
        
        var name = nombre;
        var message = mensaje;

        socketchat.emit('CHAT', {name, message});
        setMensaje(""); 
    };

    return (
        <div>
            <div id = "derecha">
            <div id="chat-general">
                {mensajes.map((e,i)=> 
                <div key={i} id="chat-particular" >
                <div><h4>{e.name} ({(new Date(e.date)).toLocaleTimeString()}): </h4>
                <div>{e.message}</div> 
                </div></div>)}
                
            </div>
            <form onSubmit={submit}>

                <input id="mensaje" name= "" value= {mensaje} onChange = {(e) => setMensaje(e.target.value)}>
                </input>
                <button >Enviar mensaje</button>
            </form>
            </div>
            
            <div id = "mapa">
            <h3>Mapa</h3>
                <MapView posiciones ={posiciones} vuelos={vuelos}/>

            </div>
            <div id = "información-vuelos">
            <h3>Información de los vuelos</h3>
                <div id = "izq">
                <Flights />
            </div>
            </div>
            
        </div>


    );
};

export default Chat
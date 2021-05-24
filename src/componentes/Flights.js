import React, {useState, useEffect , useRef} from 'react';
import socketflight from './SocketFlight';
import '../App.css';



const Flights = () => {

    const [vuelos, setVuelos] = useState([]);


    useEffect(() => {
        socketflight.emit('FLIGHTS')

    });

    useEffect(() => {
        socketflight.on('FLIGHTS', vuelos => {
            setVuelos(vuelos);
        })
    
        return () => {socketflight.off()}
    }, [vuelos]);



    return (
        <div>
            
            <div id = "vuelos">
            <div id = "izquierda">
            {vuelos.map((e,i)=> 
                    <div key={i} id="vuelo-particular">
                        <div><p><b>Codigo: </b>{e.code}</p></div>
                        <div><p><b>Aerolinea: </b>{e.airline}</p></div>
                        <div><p><b>Origen: </b>{e.origin}</p></div> 
                        <div><p><b>Destino: </b>{e.destination}</p></div> 
                        <div><p><b>Avión: </b>{e.plane}</p></div>
                        <div><p><b>Asientos: </b>{e.seats}</p></div>
                    </div>
                    
                    )}
            </div>
            <div id = "derecha">
            {vuelos.map((e,i)=> 
                    <div key={i} id="vuelo-particular">
                        <div id="pasajeros"><p><b>Pasajeros:</b></p>
                            {e.passengers.map((e,i)=>
                            <div key={i} >
                                <div><p>{e.name}   ({e.age})</p></div>
                            </div>
                            )}
                        </div>
                    </div>
                    
                    )}

            
            </div>

            </div>

        </div>


    );
};

export default Flights
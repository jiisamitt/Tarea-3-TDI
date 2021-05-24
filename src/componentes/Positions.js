import React, {useState, useEffect , useRef} from 'react';
import socket from './Socket';
import '../App.css';

const Positions = () => {

    const [posiciones, setPosiciones] = useState([]);


    useEffect(() => {
        socket.on('POSITION', posicion => {
            setPosiciones([...posiciones, posicion]);   
        })
        return () => {socket.off()}
    }, [posiciones]);

    return (
            <div> 
            {posiciones.map((e,i)=> 
            
                    <div key={i} id="">
                        <div><p>Codigo: {e.code}</p></div>
                        <div><p>Posiciones: {e.position}</p></div>
                    </div>
                    
                    )}
            </div>


    );
};

export default Positions
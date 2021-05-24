import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet';

const position = [-33, -70]

const MapView = ({posiciones, vuelos}) => {
  const fillBlueOptions = { fillColor: 'blue' }
  const airplaneicon = new L.icon({
    iconUrl: "https://image.flaticon.com/icons/png/512/984/984233.png",
    iconSize: [45,45],
  });
    return <MapContainer className= "map-container" center={position} zoom={7} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posiciones.map((p)=>
        <Marker position={p.position} icon={airplaneicon} >
            <Popup>
                Code: {p.code}.
            </Popup>
        </Marker>
    )};
        {vuelos.map((f) =>
        <>
        <Polyline pathOptions={fillBlueOptions} positions={[f.origin,f.destination]} />
            <Marker position={f.origin} >
                <Popup>
                    Origen: {f.origin}
                </Popup>
            </Marker>
            <Marker position={f.destination}>
                <Popup>
                    Destino: {f.destination}
                </Popup>
            </Marker>


            
        </>
    )
    };
      </MapContainer>

}

export default MapView
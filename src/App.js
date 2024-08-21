"use client";

import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

function SchoolInfo() {
  return (
    <div className="InfoSections">
      <h1>Hostos Community College</h1>
      <h2>Hostos One Stop Center</h2>
      <h2> Savoy Building (1st floor intake) D-101</h2>
      <h2>mcruz@hostos.cuny.edu</h2>
      <h2>718-518-4141</h2>
      <h2>Appointment only. Contact Above</h2>
    </div>
  );
}

function App() {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <h1>Hello, world!</h1>
        <Map
      defaultZoom={13}
      defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>
</Map>
      </APIProvider>
      <SchoolInfo />
      <SchoolInfo />
      </header>
    </div>
  );
}

export default App;
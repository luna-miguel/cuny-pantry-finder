"use client";

import React, { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

//location of API Key
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function SchoolInfo() {
  return (
    <div className="InfoSections">
      <h1>Hostos Community College</h1>
      <h2>Hostos One Stop Center</h2>
      <h2>Savoy Building (1st floor intake) D-101</h2>
      <h2>mcruz@hostos.cuny.edu</h2>
      <h2>718-518-4141</h2>
      <h2>Appointment only. Contact Above</h2>
    </div>
  );
}

function MapComponent() {
  const [position, setPosition] = useState(null);
  const [open, setOpen] = useState(false);

  //function in charge of obtaining user's location 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude, //coordinates 
          lng: position.coords.longitude, 
        });
      },
      (error) => {
        console.error("Error retrieving location", error);
      }
    );
  }, []);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        {position && (
          <Map zoom={14} center={position}>
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
              <Pin
                background={"grey"}
                borderColor={"green"}
                glyphColor={"purple"}
              />
            </AdvancedMarker>

            {open && (
              <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                <p>You are here!</p>
              </InfoWindow>
            )}
          </Map>
        )}
      </div>
    </APIProvider>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MapComponent />
        <SchoolInfo />
      </header>
    </div>
  );
}

export default App;

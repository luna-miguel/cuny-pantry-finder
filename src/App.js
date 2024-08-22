"use client";

import React, { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { renderSchoolInfo } from "./components/SchoolInfo";
import { render } from "@testing-library/react";

//location of API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyBRVx-TdsWWS5bnRaKBL2awiuYTWL1Alao";

function SchoolInfo({ schoolName, centerName, centerInfo, email, phone, appointmentInfo, link }) {
  return (
    <div className="InfoSections">
      <h1>{schoolName}</h1>
      <h2>{centerName}</h2>
      <h2>{centerInfo}</h2>
      <h2><a href={`mailto:${link}`}>{email}</a></h2>
      <h2>{phone}</h2>
      <h2>{appointmentInfo}. Contact Above</h2>
    </div>
  );
}

const schoolData = [
  {
    schoolName: "Hostos Community College",
    centerName: "HCC Food Pantry",
    centerInfo: "One Stop Center, Savoy Building, Fl 1 D-101, Bronx, NY 10451",
    email: "mcruz@hostos.cuny.edu",
    phone: "718-518-4141",
    appointmentInfo: "Appointment only",
    link: "mcruz@hostos.cuny.edu"
  }
];



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
          <Map zoom={14} center={position} mapId={"d84e98c48a8a04c"}>
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
        <div className="School-info-section">
          {renderSchoolInfo()}
        </div>
      </header>
    </div>
  );
}

export default App;

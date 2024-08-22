"use client";


import "./App.css";
import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { renderSchoolInfo } from "./components/SchoolInfo";






//location of API Key
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


//List of CUNY Schools
const CUNY_SCHOOLS = [
 {name: "Bronx Community College", lat: 40.8171, lng: -73.9274},
 {name: "Lehamn College", lat: 40.8573859, lng: -73.8680699},
 {name: "Kingsborough Community College", lat: 40.5786707,lng: -73.9351016},
 {name: "Medgar Evers College", lat: 40.6664145, lng: -73.9570514},
 {name: "New York City College of Technology", lat: 40.6954272,lng: -73.9875062},
 {name: "Baruch College", lat: 40.7404355, lng: -73.9858055},
 {name: "Borough of Manhattan Community College", lat: 40.7188851,lng: -74.0117547},
 {name: "City College", lat:40.8203, lng: -73.9491},
 {name: "CUNY School of Professional Studies", lat: 40.7484294,lng: -73.9899992},
 {name: "Guttman Community College", lat: 40.7529144,lng: -73.9840619},
 {name: "John Jay College", lat: 40.7707277, lng: -73.9918145},
 {name: "CUNY School of Law", lat: 40.747929,lng: -73.9439827},
 {name: "LaGuardia Community College", lat: 40.7438086, lng: -73.9376439},
 {name: "Queens College", lat: 40.73675, lng: -73.8228998},
 {name: "Queensborough Community College", lat: 40.755421, lng: -73.7635452},
 {name: "York College", lat: 40.7010415, lng: -73.7961103},
 {name: "College of Staten Island", lat: 40.6021807, lng: -74.1503811},
 {name: "Brooklyn College", lat: 40.6308, lng: -73.9641},
 {name: "Hunter College", lat: 40.7687, lng: -73.9641}
];


//calculate distance between coordinates
function calculateDistance(lat1, lng1, lat2, lng2) {
 const toRad = (x) => (x * Math.PI) / 180;
 const R = 6371; // Radius of the Earth in kilometers
 const dLat = toRad(lat2 - lat1);
 const dLng = toRad(lng2 - lng1);
 const a =
   Math.sin(dLat / 2) * Math.sin(dLat / 2) +
   Math.cos(toRad(lat1)) *
     Math.cos(toRad(lat2)) *
     Math.sin(dLng / 2) *
     Math.sin(dLng / 2);
 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 const d = R * c; // Distance in kilometers


 return d;
}


function SchoolInfo() {
 return (
   //display school information
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


//Navbar Component
function NavBar(){
 return(
   <nav className="navbar">
     <div className="navbar-links">
       <a href="#Log In">Login In</a>
       <a href="#Sign Up">Sign Up</a>
     </div>
   </nav>
 );
}


function MapComponent() {
 const [position, setPosition] = useState(null); //store user's current location
 const [open, setOpen] = useState(false);
 const [nearestSchools, setNearestSchools] = useState([]);
  //function to get user's location
 useEffect(() => {
   navigator.geolocation.getCurrentPosition(
     (position) => {
       const userPosition = {
         lat: position.coords.latitude, //coordinates
         lng: position.coords.longitude,
       };
     setPosition(userPosition);
    
     const sortedSchools = CUNY_SCHOOLS.map((school) => ({
       ...school,
       distance: calculateDistance(
         userPosition.lat,
         userPosition.lng,
         school.lat,
         school.lng
       ),
     })).sort((a, b) => a.distance - b.distance);
     setNearestSchools(sortedSchools.slice(0, 3)); //limit of 3 schools
   },
     (error) => {
       //error handling
       console.error("Error retrieving location", error);
     }
   );
 }, []);


 //show the map once the user's position has been retrieved
 return (
   <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
     <div style={{ height: "100vh", width: "100%" }}>
       {position && (
         <Map defaultZoom={14} defaultCenter={position}>
           <Marker position={position} onClick={() => setOpen(true)} />


           {open && (
             <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
               <div>
                 <p>You are here!</p>
               </div>
             </InfoWindow>
           )}


           {/* Display nearest CUNY schools */}
           {nearestSchools.map((school, index) => (
             <Marker key={index} position={{ lat: school.lat, lng: school.lng }}>
               <InfoWindow position={{ lat: school.lat, lng: school.lng }}>
                 <div>
                   <h3>{school.name}</h3>
                   <p>Distance: {school.distance.toFixed(2)} km</p>
                 </div>
               </InfoWindow>
             </Marker>
           ))}
         </Map>
       )}
     </div>
   </APIProvider>
 );
}


//Web App Components
function App() {
 return (
   <div className="App">
     <NavBar />
     <div>
       <h1>CUNY Pantry Finder</h1>
     </div>
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
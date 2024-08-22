"use client";

import "./App.css";
import React, {useEffect, useState} from "react";
import {APIProvider, Map, Marker, InfoWindow} from "@vis.gl/react-google-maps";
import {renderSchoolInfo} from "./components/SchoolInfo";
import {schoolData} from "./data/schoolData.js";
//location of API Key
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

//List of CUNY Schools
const CUNY_SCHOOLS = schoolData;

//calculate distance between coordinates
function calculateDistance(lat1, lng1, lat2, lng2) {
    console.log(lat2, lng2)
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers

    return d;
}

//Navbar Component
function NavBar() {
    return (
        <nav className="navBar">
            <div className="navBar-link">
                <a href="#Filter">Filter</a>
                <a href="#About">About</a>
            </div>
        </nav>
    );
}

function MapComponent({onNearestSchoolsChange}) {
    const [position,
        setPosition] = useState(null); //store user's current location
    const [open,
        setOpen] = useState(false);
    const [nearestSchools,
        setNearestSchools] = useState([]);
    const [hoveredMarkerIndex, setHoveredMarkerIndex] = useState(null);
    //function to get user's location
    useEffect(() => {
        navigator
            .geolocation
            .getCurrentPosition((position) => {
                const userPosition = {
                    lat: 40.78767428152784, //coordinates
                    lng: -73.96777823030689
                };
                setPosition(userPosition);

                const sortedSchools = CUNY_SCHOOLS.map((school) => ({
                    ...school,
                    distance: calculateDistance(userPosition.lat, userPosition.lng, school.lat, school.lng)
                })).sort((a, b) => a.distance - b.distance);
                setNearestSchools(sortedSchools); //limit of 3 schools
                onNearestSchoolsChange(sortedSchools); //runs setNearestSchool state for App component
                console.log(nearestSchools);
            }, (error) => {
                //error handling
                console.error("Error retrieving location", error);
            });
    }, []);

    //show the map once the user's position has been retrieved
    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <div
                style={{
                height: "100vh",
                width: "100%"
            }}>
                {position && (
                    <Map defaultZoom={14} defaultCenter={position}>
                        <Marker position={position} onClick={() => setOpen(true)}/> {open && (
                            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                                <div>
                                    <p>You are here!</p>
                                </div>
                            </InfoWindow>
                        )}

                        {/* Display nearest CUNY schools */}
                        {nearestSchools.map((school, index) => (
                            <Marker
                                key={index}
                                position={{
                                lat: school.lat,
                                lng: school.lng
                            }}
                            icon={{
                                url: hoveredMarkerIndex === index ? "food_hover.png" : "food.png", // Change icon on hover
                                scaledSize: new window.google.maps.Size(52, 52),
                            }}
                            onMouseOver={() => setHoveredMarkerIndex(index)} // Set hovered marker index
                            onMouseOut={() => setHoveredMarkerIndex(null)} // Reset hovered marker index
                            >
                                <InfoWindow
                                    position={{
                                    lat: school.lat,
                                    lng: school.lng
                                }}>
                                    <div>
                                        <h3>{school.name}</h3>
                                        <p>Distance: {school
                                                .distance
                                                .toFixed(2)}
                                            km</p>
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
    const [nearestSchools,
        setNearestSchools] = useState([]);
    return (
        <div className="App">
            <NavBar/>
            <div>
                <h1>CUNY Pantry Finder</h1>
            </div>
            <header className="App-header">
                <MapComponent onNearestSchoolsChange={setNearestSchools}/>
                <div className="School-info-section">
                    {renderSchoolInfo(nearestSchools)}
                </div>
            </header>
        </div>
    );
}

export default App;

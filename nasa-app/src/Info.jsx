
import './App.css';
import { InfoWindow } from "@react-google-maps/api";
import React from "react";

const Info = (selectedRock) => {
    console.log(selectedRock)
    return(
        <InfoWindow
            position={{
                lat: parseFloat(selectedRock.reclat),
                lng: parseFloat(selectedRock.reclong)
            }}            
        >
                <div>
                    <h2 className="metname">{selectedRock.name}</h2>
                        <p>Landed: {selectedRock.year}</p>
                        <p>Mass: {selectedRock.mass} | Class: {selectedRock.recclass}</p>
                </div>
            
            
        </InfoWindow>
    )
}

export default Info;
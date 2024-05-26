import './App.css';
import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import axios from 'axios';

 
//MAP SETUP
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    zIndex: 0,
  };
  
  const center = {
    lat: 15,
    lng: 0
  };

  const options = {
    restriction: {
      latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
      strictBounds: true,
    },
    zoom: 2.5,
    minZoom: 2.4,
    styles: mapStyles,
    disableDefaultUI: true,
    opacity: 2
  }

  // const icon = {
  //   url: ('https://img.icons8.com/fluent/48/000000/marker-storm.png'),
  //   scaledSize: new window.google.maps.Size(12, 12),
  // }


  export default function App() {
    const [data, setData] = useState([])
    const [selectedRock, setSelectedRock] = useState(null)
    const [value, setValue] = useState(23000)
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: 'AIzaSyBPZjVzpRR7vF9JpnexwAS82gy1Q59jk5A'
    })
    // const [map, setMap] = React.useState(null)

  

    // RECEIVE DATA FROM API
    useEffect(() => {
      const fetchData = async() => {
        const res = await axios('https://data.nasa.gov/resource/gh4g-9sfh.json')
          const formattedRes = res.data.map((x) => ({
            ...x,
            
            year: new Date(x.year).getFullYear(),
            mass: x.mass/1000,
            ratio: x.mass/1000 > 20000 ? 50 : x.mass/1000 > 5000 ? 35 : x.mass/1000 > 100 ? 40 : x.mass/1000 < 10 ? 10 : 5
          }))
            
        setData(formattedRes)
        const maxMass = Math.max(...data.map((x) => parseInt(x.mass)).filter(value => !isNaN(value)))
        //23000
        const minMass = Math.min(...data.map((x) => parseInt(x.mass)).filter(value => !isNaN(value) && value > 0))
        //1
      }

      fetchData();
    }, [])


    //ON ROCK CLICK FUNCTION
    const handleClick = (rock) => {
      setSelectedRock(rock);
      console.log(rock)
    }

  
    return isLoaded ? (
      <>
      <div>
        <input 
          type="range"
          min='1'
          max='23000'
          value={value}
        />
      </div>
      <h1>METEORITE LANDINGS</h1>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          options={options}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >

          {data.map((rock) => (
            <Marker 
              key={rock.id}
              icon={{url: ('https://img.icons8.com/fluent/48/000000/marker-storm.png'),
              scaledSize: new window.google.maps.Size(rock.ratio, rock.ratio),
            }}
              position={{ 
                  lat: parseFloat(rock.reclat), 
                  lng: parseFloat(rock.reclong)
                  }}
              onClick={()=>handleClick(rock)}
            />

          ))}
          <></>

          {/* DISPLAY INFO BOX */}
          {selectedRock && (
              <InfoWindow
               position={{
                   lat: parseFloat(selectedRock.reclat),
                   lng: parseFloat(selectedRock.reclong)
               }}            
           >
                   <div>
                       <h2 className="metname">{selectedRock.name}</h2>
                           <p>Landed: {selectedRock.year}</p>
                           <p>Mass: {selectedRock.mass}KG | Class: {selectedRock.recclass}</p>
                   </div>
               
               
              </InfoWindow>
          )}

          

        </GoogleMap>
        </>
    ) : <></>
  }
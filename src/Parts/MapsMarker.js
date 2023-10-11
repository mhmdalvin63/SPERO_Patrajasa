import { Fragment, useEffect, useState } from "react";
import MarkerHelm from '../Images/markerHelm.png';
import Profile from '../Images/MotorIcon.png';
import Kendala from '../Images/banmotor.jpg';
import '../Css/Parts/MapsMarker.css';
import Table from 'react-bootstrap/Table';


import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import Loading from "./Loading";

// import "./App.css";



function App() {
  const [loading, setLoading] = useState(true);

  function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(
      decimals,
    );
  
    return parseFloat(str);
  }

  let [ListTicket, SetListTicket,] = useState([]);
  let [Markers, SetMarkers,] = useState([]);
  let [ListDriver, SetListDriver,] = useState([]);
  let [Driver, setDriver,] = useState([]);
  let markers = [];
  let markersDriver = [];
  useEffect(() => {
    let token = sessionStorage.getItem("jwttoken");
    axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
    .then((result) => {
      // console.log('DATA TICKETTTTTTT', result.data.data);
      SetListTicket(result.data.data);
      for (let index = 0; index < result.data.data.length; index++) {
        if (result.data.data[index].detail_ticket !== null) {
          // console.log('wooooo', result.data.data.length)
          let latData = (result.data.data[index].detail_ticket.lat === null ? getRandomFloat(-6, -7, 15) : result.data.data[index].detail_ticket.lat)
          let longData = (result.data.data[index].detail_ticket.long === null ? getRandomFloat(106.1, 106.3, 15) : result.data.data[index].detail_ticket.long)
          markers[index] = 
          {
            id: result.data.data[index].id,
            position: { lat: parseFloat(latData), lng: parseFloat(longData) },
            ticketcode: result.data.data[index].ticket_code,
            proses: result.data.data[index].activity.name,
            informasi: result.data.data[index].detail_ticket.content,
            color: result.data.data[index].activity.color,
            tanggal: "19-03-2023",
          }
        }
      }
      setLoading(false);
      SetMarkers(markers)
    })
    .catch((error) => {
      console.log(error)
      setLoading(false);});

   
    axios.get('https://apipatra.spero-lab.id/api/dashboard/driver/log-today', { headers: {"Authorization" : `Bearer ${token}`} })
    .then((result) => {
      console.log('DRIVERRRRR',result.data.data);
      SetListDriver('DRIVERRRRR',result.data);
       setLoading(false);
      // for (let index = 0; index < result.data.data.length; index++) {
      //   if (result.data.data[index].detail_ticket !== null) {
      //     let latData = (result.data.data[index].detail_ticket.lat === null ? getRandomFloat(-6, -7, 15) : result.data.data[index].detail_ticket.lat)
      //     let longData = (result.data.data[index].detail_ticket.long === null ? getRandomFloat(106.1, 106.3, 15) : result.data.data[index].detail_ticket.long)
      //     markersDriver[index] = 
      //     {
      //       id: result.data.data[index].id,
      //       position: { lat: parseFloat(latData), lng: parseFloat(longData) },
      //       ticketcode: result.data.data[index].ticket_code,
      //       proses: result.data.data[index].activity.name,
      //       informasi: result.data.data[index].detail_ticket.content,
      //       color: result.data.data[index].activity.color,
      //       tanggal: "19-03-2023",
      //     }
      //   }
      // }
      setDriver(markersDriver)
    })
    .catch((error) => {
      console.log(error)
      setLoading(false);});
  }, []);

  function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(
    decimals,
  );

  return parseFloat(str);
}
  
  // console.log('wwww', Markers);


  let { isLoaded } = useLoadScript({
    googleMapsApiKey:'AIzaSyBoIAb25f1-LUjLVkl6hRl8S_iBeaAEmxU'
  });

  let [activeMarker, setActiveMarker] = useState(null);

  let handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div>
    {loading ? (
      <Loading/>
    ) : (
      <div>
        <Fragment>
        <div style={{ height: "100vh", width: "100vw" }}>
          {isLoaded ? (
            <GoogleMap
              center={{ lat: -6.39850806754815, lng: 106.88613027971365 }}
              zoom={10}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100vw", height: "100vh" }}
            >
              {Markers.map(({ id, position, ticketcode, proses, informasi, tanggal, color }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  icon={{
                    url: MarkerHelm,
                  }}
                  ticketcode={ticketcode}
                  proses={proses}
                  informasi={informasi}
                  tanggal={tanggal}
                  color={color}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div className="maps-label">
                        <div className="header-maps py-2 px-3 gap-2">
                          <div className="header-maps-left gap-2">
                            <div className="header-maps-image p-2">
                              <img className='Profile' height={'25px'} src={Profile} alt="Profile" />
                            </div>
                            <h3 className="text-white">{ticketcode}</h3>
                          </div>
                          <div className="header-maps-right">
                            <div className="border-status-maps px-3 py-1" style={{backgroundColor: color}}>
                              <p>{proses}</p>
                            </div>
                          </div>
                        </div>
                        <div className="header-content">
                          <div className="gambar-aduan gap-3">
                            <img className='Kendala' src={Kendala} alt="Kendala" />
                            <img className='Kendala' src={Kendala} alt="Kendala" />
                            <img className='Kendala' src={Kendala} alt="Kendala" />
                            <img className='Kendala' src={Kendala} alt="Kendala" />
                          </div>
                          <Table>
                            <thead>
                              <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td><h3>Nama</h3></td>
                                <td colSpan={2}><h3>: {ticketcode}</h3></td>
                              </tr>
                              <tr>
                                <td><h3>Company</h3></td>
                                <td colSpan={2}><h3>: {proses}</h3></td>
                              </tr>
                              <tr>
                                <td><h3>Informasi</h3></td>
                                <td colSpan={2}><h3>: {informasi}</h3></td>
                              </tr>
                              <tr>
                                <td><h3>Tanggal</h3></td>
                                <td colSpan={2}><h3>: {tanggal}</h3></td>
                              </tr>
                            </tbody>
                          </Table>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur vel augue in tincidunt. Morbi lacus urna, efficitur sed auctor sed, fermentum vitae magna. Sed tincidunt elit non dui fringilla pellentesque. Vivamus ultrices a tellus nec porttitor. Proin fermentum bibendum felis in consectetur. Aenean ultricies imperdiet aliquet. Phasellus rutrum est vel hendrerit convallis.
Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam quis purus lorem. In accumsan orci ut erat viverra cursus. Vestibulum ipsum magna, cursus ut sodales eget, aliquet sed nibh. Aenean vitae suscipit diam. Vestibulum vel volutpat ligula, vitae rhoncus est. Duis at purus sollicitudin, pulvinar diam ac, pulvinar dolor. Curabitur rhoncus posuere interdum. Nunc risus mi, convallis sed commodo eu, interdum nec dui. Aliquam maximus porttitor mauris, ac dapibus metus blandit nec. Praesent sit amet ante ut lorem pulvinar iaculis. Sed lacinia molestie urna, non finibus risus tempor a. Etiam ornare, ligula nec accumsan faucibus, felis lacus consequat metus, id aliquam erat orci eget metus.</p>
                        </div>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
        </div>
    </Fragment>
      </div>
    )}
  </div>
    
  );
}

export default App;
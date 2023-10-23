import { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import MarkerHelm from '../Images/markerHelm.png';
import Profile from '../Images/MarkerStir.png';
import Kendala from '../Images/banmotor.jpg';
import '../Css/Parts/MapsMarker.css';
import Table from 'react-bootstrap/Table';
// import { useContext } from 'react';
import Tracking from '../Pages/PageTracking';



import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import Loading from "./Loading";


function App(props) {
  let idParamDynamic = props.data;
  const [loading, setLoading] = useState(true);
  const [Maps, setMaps,] = useState([]);
  const [Markers, setMarkers,] = useState([]);
  const [Drivers, setDrivers,] = useState([]);
  // let markers = [];
  console.log('MARKERRRRRRRRRRRRRRRRRRR', Markers)
  let Driver = [];
  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
    axios.get(process.env.REACT_APP_API_URL + 'api/dashboard/tracking', { headers: {"Authorization" : `Bearer ${token}`} })
    .then((result) => {
      console.log('MAPSSSSSSSSSS', result.data.data);
      setMaps(result.data.data);
      const filterMarkers = result.data.data
      .filter(item => item.ticket_id) // Filter only items with a ticketid
      .map(item => ({
        ticketid: item.ticket_id,
        position: { lat: parseFloat(item.lat), lng: parseFloat(item.long) },
        subject: item.subject,
        icon: item.icon,
        createdat: item.created_at,
      }));
      setMarkers(filterMarkers);

      const filterDrivers = result.data.data
      .filter(item => item.driver_id) // Filter only items with a driverid
      .map(item => ({
        driverid: item.driver_id,
        position: { lat: parseFloat(item.lat), lng: parseFloat(item.long) },
        drivercode: item.driver_code,
        name: item.name,
        createdat: item.created_at,
        status: item.status,
      }));
      setDrivers(filterDrivers);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error)
      setLoading(false);});
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    console.log(JSON.stringify(activeMarker))
    setActiveMarker(marker);
  };
  

 
  
  const [activeMarkerPosition, setActiveMarkerPosition] = useState(null);
  const [activeMarkerZoom, setActiveMarkerZoom] = useState(12);


  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
    <Fragment>
        <div style={{ height: "100vh", width: "100vw" }}>
          {isLoaded ? (
            <GoogleMap
            center={activeMarkerPosition || { lat: -6.39850806754815, lng: 106.88613027971365 }}
            zoom={activeMarkerZoom}
            onClick={() => {
              setActiveMarkerPosition(null); // Reset the active marker position when map is clicked
              setActiveMarkerZoom(12); // Reset the zoom level
            }}
              mapContainerStyle={{ width: "100vw", height: "100vh" }}
            >
              {Markers.map(({ ticketid, position, subject, icon, createdat }) => (
                <MarkerF
                  key={`s${ticketid}`}
                  position={position}
                  onClick={() => {
                    setActiveMarkerPosition(position); // Set the active marker's position
                    setActiveMarkerZoom(20); // Set the desired zoom level
                    setActiveMarker(null);
                    handleActiveMarker(`s${ticketid}`);
                  }}
                  icon={{
                    url: MarkerHelm,
                  }}
                >
                  {activeMarker === `s${ticketid}` ? (
                    <InfoWindowF position={position}
  onCloseClick={() => setActiveMarker(null)}>
                      <div className="maps-label">
                        <div className="header-maps py-2 px-3 gap-2">
                          <div className="header-maps-left gap-2">
                            <div className="header-maps-image p-2">
                              <p dangerouslySetInnerHTML={{ __html: icon }}></p>
                            </div>
                            <h3 className="text-white">hai</h3>
                          </div>
                          <div className="header-maps-right">
                            <div className="border-status-maps px-3 py-1">
                              <p>Open</p>
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
                                <td colSpan={2}><h3>Nama</h3></td>
                                <td><h3>: {ticketid}</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Company</h3></td>
                                <td><h3>: PT Patra Jasa</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Informasi</h3></td>
                                <td><h3>: Kendaraan Terbalik</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Tanggal</h3></td>
                                <td><h3>: Thursday 30 Juli 2023</h3></td>
                              </tr>
                            </tbody>
                          </Table>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur vel augue in tincidunt. Morbi lacus urna, efficitur sed auctor sed, fermentum vitae magna. Sed tincidunt elit non dui fringilla pellentesque. Vivamus ultrices a tellus nec porttitor. Proin fermentum bibendum felis in consectetur. Aenean ultricies imperdiet aliquet. Phasellus rutrum est vel hendrerit convallis.
Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam quis purus lorem. In accumsan orci ut erat viverra cursus. Vestibulum ipsum magna, cursus ut sodales eget, aliquet sed nibh. Aenean vitae suscipit diam. Vestibulum vel volutpat ligula, vitae rhoncus est. Duis at purus sollicitudin, pulvinar diam ac, pulvinar dolor. Curabitur rhoncus posuere interdum. Nunc risus mi, convallis sed commodo eu, interdum nec dui. Aliquam maximus porttitor mauris, ac dapibus metus blandit nec. Praesent sit amet ante ut lorem pulvinar iaculis. Sed lacinia molestie urna, non finibus risus tempor a. Etiam ornare, ligula nec accumsan faucibus, felis lacus consequat metus, id aliquam erat orci eget metus.</p>
                        </div>
                      </div>
                    </InfoWindowF>
                  ) : null}
                  {`s${ticketid}` === idParamDynamic ? (
                    <InfoWindowF position={position}
  onCloseClick={() => setActiveMarker(null)}>
                      <div className="maps-label">
                        <div className="header-maps py-2 px-3 gap-2">
                          <div className="header-maps-left gap-2">
                            <div className="header-maps-image p-2">
                              <p dangerouslySetInnerHTML={{ __html: icon }}></p>
                            </div>
                            <h3 className="text-white">hai</h3>
                          </div>
                          <div className="header-maps-right">
                            <div className="border-status-maps px-3 py-1">
                              <p>Open</p>
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
                                <td colSpan={2}><h3>Nama</h3></td>
                                <td><h3>: {ticketid}</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Company</h3></td>
                                <td><h3>: PT Patra Jasa</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Informasi</h3></td>
                                <td><h3>: Kendaraan Terbalik</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Tanggal</h3></td>
                                <td><h3>: Thursday 30 Juli 2023</h3></td>
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
              {Drivers.map(({ driverid, position, drivercode, name, createdat, status }) => (
                <MarkerF
                  key={`d${driverid}`}
                  position={position}
                  onClick={() => {
                    setActiveMarkerPosition(position); // Set the active marker's position
                    setActiveMarkerZoom(20); // Set the desired zoom level
                    setActiveMarker(null);
                    handleActiveMarker(`d${driverid}`);
                  }}
                  icon={{
                    url: Profile,
                  }}
                >
                  {activeMarker === `d${driverid}` ? (
                    <InfoWindowF position={position}
  onCloseClick={() => setActiveMarker(null)}>
                      <div className="maps-label">
                        <div className="header-maps py-2 px-3 gap-2">
                          <div className="header-maps-left gap-2">
                            <div className="header-maps-image p-2">
                            </div>
                            <h3 className="text-white">hai</h3>
                          </div>
                          <div className="header-maps-right">
                            <div className="border-status-maps px-3 py-1">
                              <p>Open</p>
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
                                <td colSpan={2}><h3>Nama</h3></td>
                                <td><h3>: {driverid}</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Company</h3></td>
                                <td><h3>: PT Patra Jasa</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Informasi</h3></td>
                                <td><h3>: Kendaraan Terbalik</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Tanggal</h3></td>
                                <td><h3>: Thursday 30 Juli 2023</h3></td>
                              </tr>
                            </tbody>
                          </Table>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur vel augue in tincidunt. Morbi lacus urna, efficitur sed auctor sed, fermentum vitae magna. Sed tincidunt elit non dui fringilla pellentesque. Vivamus ultrices a tellus nec porttitor. Proin fermentum bibendum felis in consectetur. Aenean ultricies imperdiet aliquet. Phasellus rutrum est vel hendrerit convallis.
Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam quis purus lorem. In accumsan orci ut erat viverra cursus. Vestibulum ipsum magna, cursus ut sodales eget, aliquet sed nibh. Aenean vitae suscipit diam. Vestibulum vel volutpat ligula, vitae rhoncus est. Duis at purus sollicitudin, pulvinar diam ac, pulvinar dolor. Curabitur rhoncus posuere interdum. Nunc risus mi, convallis sed commodo eu, interdum nec dui. Aliquam maximus porttitor mauris, ac dapibus metus blandit nec. Praesent sit amet ante ut lorem pulvinar iaculis. Sed lacinia molestie urna, non finibus risus tempor a. Etiam ornare, ligula nec accumsan faucibus, felis lacus consequat metus, id aliquam erat orci eget metus.</p>
                        </div>
                      </div>
                    </InfoWindowF>
                  ) : null}
                  {`d${driverid}` === idParamDynamic ? (
                    <InfoWindowF position={position}
  onCloseClick={() => setActiveMarker(null)}>
                      <div className="maps-label">
                        <div className="header-maps py-2 px-3 gap-2">
                          <div className="header-maps-left gap-2">
                            <div className="header-maps-image p-2">
                            </div>
                            <h3 className="text-white">hai</h3>
                          </div>
                          <div className="header-maps-right">
                            <div className="border-status-maps px-3 py-1">
                              <p>Open</p>
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
                                <td colSpan={2}><h3>Nama</h3></td>
                                <td><h3>: {driverid}</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Company</h3></td>
                                <td><h3>: PT Patra Jasa</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Informasi</h3></td>
                                <td><h3>: Kendaraan Terbalik</h3></td>
                              </tr>
                              <tr>
                                <td colSpan={2}><h3>Tanggal</h3></td>
                                <td><h3>: Thursday 30 Juli 2023</h3></td>
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
            <div className="position-absolute top-0">
             <h3> Nilai Parameter yang Diterima: {idParamDynamic}</h3>
            </div>
        </div>
    </Fragment>
      )}
    </div>
  );
}

export default App;
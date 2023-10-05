import { Fragment, useState } from "react";
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

// import "./App.css";

const markers = [
  {
    id: 1,
    name: "Taman Sukatani",
    position: { lat: -6.39850806754815, lng: 106.88613027971365 },
  },
  {
    id: 2,
    name: "Taman Merdeka",
    position: { lat: -6.396625090723208, lng: 106.8366856932065 },
  }
];

function App() {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey:  process.env.PUBLIC_GOOGLE_MAPS_API_KEY
    googleMapsApiKey: "AIzaSyBoIAb25f1-LUjLVkl6hRl8S_iBeaAEmxU"
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Fragment>
      {/* <h1 className="text-center">Vite + React | Google Map Markers</h1> */}
      <div style={{ height: "100vh", width: "100vw" }}>
          {isLoaded ? (
            <GoogleMap
              center={{ lat: -6.39850806754815, lng: 106.88613027971365 }}
              zoom={10}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "100vh" }}
            >
              {markers.map(({ id, name, position }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  icon={{
                    url: MarkerHelm,
                  }}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div className="maps-label">
                        <div className="header-maps py-2 px-3 gap-2">
                          <div className="header-maps-left gap-2">
                            <div className="header-maps-image p-2">
                              <img className='Profile' height={'25px'} src={Profile} alt="Profile" />
                            </div>
                            <h3 className="text-white">{name}</h3>
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
                                <td><h3>: Jaha Mulyadi</h3></td>
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
        </div>
    </Fragment>
  );
}

export default App;
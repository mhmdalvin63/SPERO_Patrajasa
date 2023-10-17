import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      selectedMarker: null,
    };
  }

  componentDidMount() {
    // Fetch marker data from your API using Axios
    let token = sessionStorage.getItem("jwttoken");
    axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        this.setState({ markers: response.data.data });
      })
      .catch((error) => {
        console.error('Error fetching marker data:', error);
      });
  }

  handleMarkerClick = (marker) => {
    this.setState({ selectedMarker: marker });
  };

  render() {
    const { markers, selectedMarker } = this.state;

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => this.handleMarkerClick(marker)}
            icon={marker.icon} // Assuming you receive the icon URL from the API
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => this.setState({ selectedMarker: null })}
          >
            <div>
              <h3>{selectedMarker.name}</h3>
              <p>{selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

export default withGoogleMap(MapComponent);

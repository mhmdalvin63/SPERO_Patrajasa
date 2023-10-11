// import React from 'react';
import IndonesiaMap from '../Images/SvgIndonesia.svg';
import PointMarker from "./PointMarker";

const MapComponent = () => {
  const markers = [
    { name: 'Jawa Barat', latitude: -6.2088, longitude: 107.6186 },
    { name: 'Jakarta', latitude: 2.1150, longitude: 98.7922 },
    // { name: 'Jawa Tengah', latitude: -7.1576360141618185, longitude: 110.04520606528698 },
    // Add more markers here
  ];

  const svgWidth = 1800; // Width of your SVG
  const svgHeight = 600; // Height of your SVG

  return (
    <div>
      <svg width={svgWidth} height={svgHeight}>
        <image href={IndonesiaMap} width="100%" height="100%" />
        {markers.map((marker, index) => (
          <PointMarker data={marker} index={index} />
        ))}
      </svg>
    </div>
  );
};

export default MapComponent;

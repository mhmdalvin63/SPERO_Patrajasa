// import React from 'react';
import IndonesiaMap from '../Images/SvgIndonesia.svg';

const MapComponent = () => {
  const markers = [
    { name: 'Jawa Barat', latitude: -7.090911, longitude: 107.668887 },
    // { name: 'Sumatera Utara', latitude: 2.029605644051971, longitude: 99.43745725657702 },
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
                <circle
                  key={index}
                   cx = {(marker.longitude + 180) * (svgWidth / 360)}
                   cy = {(90 - marker.latitude) * (svgHeight / 180)}
                  // cx={(marker.longitude + -90) / 90 * svgWidth}
                  // cy= {svgHeight - (marker.latitude + 90) / 300 * svgHeight}
                  // cy={((marker.latitude * -1) + 60) * (svgHeight / 90  )}
                  r="10"
                  fill="red"
                  stroke="red"
                />
        ))}
      </svg>
    </div>
  );
};

export default MapComponent;

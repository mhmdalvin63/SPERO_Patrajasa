// import React from 'react';
import IndonesiaMap from '../Images/SvgIndonesia.svg';

const MapComponent = () => {
  const markers = [
    { name: 'Depok', latitude: -6.365245114978172, longitude: 106.67279910839544 },
    { name: 'Sumatera Utara', latitude: 2.029605644051971, longitude: 99.43745725657702 },
    { name: 'Jawa Tengah', latitude: -7.1576360141618185, longitude: 110.04520606528698 },
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
                  cx={(marker.longitude + -10) * (svgWidth / 360)}
                  cy={((marker.latitude * -1) + 82) * (svgHeight / 120  )}
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

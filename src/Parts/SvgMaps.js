// import React from 'react';
import IndonesiaMap from '../Images/SvgIndonesia.svg';

const MapComponent = () => {
  const markers = [
    { name: 'Depok', latitude: -6.365245114978172, longitude: 106.67279910839544 },
    { name: 'Sumatera Utara', latitude: 2.246992181175681, longitude: 99.72232088035364 },
    { name: 'Jawa Tengah', latitude: -7.1576360141618185, longitude: 110.04520606528698 },
    // Add more markers here
  ];

  const svgWidth = 1500; // Width of your SVG
  const svgHeight = 600; // Height of your SVG

  return (
    <div>
      <svg width={svgWidth} height={svgHeight}>
        <image href={IndonesiaMap} width="100%" height="100%" />
        {markers.map((marker, index) => (
          <circle
            key={index}
            cx={(marker.longitude + 10) * (svgWidth / 360)}
            cy={((marker.latitude * -1) + 90) * (svgHeight / 180)}
            r="5"
            fill="red"
            stroke="black"
          />
        ))}
      </svg>
    </div>
  );
};

export default MapComponent;

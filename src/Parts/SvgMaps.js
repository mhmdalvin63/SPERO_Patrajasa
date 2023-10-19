import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Maps from '../Images/SvgIndonesia.svg';
import Radius from '../Images/Radius.png';
import Loading from './Loading';
import '../Css/Parts/SvgMaps.css'

const IndonesiaMap = () => {

  const [loading, setLoading] = useState(true);
  const [EarthQuakes, SetEarthQuakes] = useState([]);
  const mappedPoints = EarthQuakes.map(item => {
    // Perform some operation on each element, for example:
    return {
      province: item.province,
      middle_lat: item.middle_lat,
      middle_long: item.middle_long,
      count: item.count,
      image: Radius
    };
  });
  console.log('MAPPEDDDDDD', mappedPoints)

   // Convert the parameters object into a URL-encoded string
   useEffect(() => {
     const token = sessionStorage.getItem("jwttoken");
      axios.get('https://apipatra.spero-lab.id/api/dashboard/province-earthquake?filter=${parameter}', { headers: {"Authorization" : `Bearer ${token}`} })
       .then((result) => {
         console.log('EARTHQUAKEEEEEEEEEEEEE', result.data.data);
         SetEarthQuakes(result.data.data);
         setLoading(false);
       })
       .catch((error) => {
         console.log(error)
         setLoading(false);
     });
   }, []);

 
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerClick = (item) => {
    setSelectedMarker(item);
  };
  // Batas peta
  const minX = 95.0;
  const minY = -11.0;
  const maxX = 141.0;
  const maxY = 6.0;

  return (
   <div>
     {loading ? (
      <Loading/>
   ) : (
    <div>
      <svg width="1800" height="600">
      <image href={Maps} width="100%" height="100%" />
      {mappedPoints.map((item, index) => {
        const cx = (item.middle_long - minX) / (maxX - minX) * 1800;
        const cy = 600 - ((item.middle_lat - minY) / (maxY - minY) * 600);

        return (
          <g key={index}>
          <image
            x={cx - 25} // Adjust the position as needed
            y={cy - 25} // Adjust the position as needed
            width="50"
            height="50"
            xlinkHref= {item.image} // Use the URL from your data
            onClick={() => handleMarkerClick(index)}
          />
          {selectedMarker === index && (
                <foreignObject x={cx -50} y={cy + 25} width="200" height="100">
                <div className='pop-up-svg'>
                  <p>{item.province}</p>
                  <p>Total : {item.count}</p>
                </div>
              </foreignObject>
            )}
          </g>
        );
      })}
    </svg>
    </div>
   )}
   </div>
    
  );
};

export default IndonesiaMap;

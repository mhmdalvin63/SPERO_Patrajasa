import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Maps from '../Images/SvgIndonesia.svg';
import Radius from '../Images/Radius.png';
import Loading from './Loading';
import '../Css/Parts/SvgMaps.css'

const IndonesiaMap = (props) => {

  const [loading, setLoading] = useState(true);
  const [EarthQuakes, SetEarthQuakes] = useState([]);
  
  let mappedPoints;
  if (Array.isArray(EarthQuakes)) {
    mappedPoints = EarthQuakes.map(item => {
      // Perform some operation on each element, for example:
      return {
        province: item.province,
        middle_lat: item.middle_lat,
        middle_long: item.middle_long,
        count: item.count,
        image: Radius
      };
    });
  } else {
    mappedPoints = []; // or set to any default value you prefer
  }
  console.log('MAPPEDDDDDD', mappedPoints)

   // Convert the parameters object into a URL-encoded string
   useEffect(() => {
    const { parameter } = props;
     const token = sessionStorage.getItem("jwttoken");
      axios.get(`${process.env.REACT_APP_API_URL}api/dashboard/province-earthquake?filter=${parameter}`, { headers: {"Authorization" : `Bearer ${token}`} })
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
      <image href={Maps} className='svg-main' width="100%" height="100%" />
      {mappedPoints.map((item, index) => {
        const cx = (item.middle_long - minX) / (maxX - minX) * 1800;
        const cy = 600 - ((item.middle_lat - minY) / (maxY - minY) * 600);
        let x, y;
        if (item.count < 10) {
          x = 25;
          y = 75;
        } else if (item.count < 20) {
          x = 12.5; // Atur nilai x sesuai dengan kondisi ini
          y = 85; // Atur nilai y sesuai dengan kondisi ini
        } else if (item.count < 30) {
          x = 0; // Atur nilai x sesuai dengan kondisi ini
          y = 80; // Atur nilai y sesuai dengan kondisi ini
        }

        console.log(x, y)

        return (
          
          <g key={index}>
          <image
            x={cx - 25} // Adjust the position as needed
            y={cy - 30} // Adjust the position as needed
            // width="50"
            width={item.count < 10 ? "50" : item.count < 20 ? "75" : item.count < 30 ? "100" : "100"}
            xlinkHref= {item.image} // Use the URL from your data
            onClick={() => handleMarkerClick(index)}
          />(
                <foreignObject x={cx - x} y={cy - y} width="200" height="100">
                  <div class="ribbon-label">
                    <div class="arrow-down"></div>
                    <p>{item.count}</p>
                  </div>
              </foreignObject>
          )
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

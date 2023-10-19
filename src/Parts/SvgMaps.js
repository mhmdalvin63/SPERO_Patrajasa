import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Maps from '../Images/SvgIndonesia.svg';
import Radius from '../Images/Radius.png';
import Loading from './Loading';

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
  
  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
     axios.get('https://apipatra.spero-lab.id/api/dashboard/province-earthquake', { headers: {"Authorization" : `Bearer ${token}`} })
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
            // key={index}
            x={cx - 25} // Adjust the position as needed
            y={cy - 25} // Adjust the position as needed
            width="50"
            height="50"
            xlinkHref= {item.image} // Use the URL from your data
            onClick={() => handleMarkerClick(index)}
          />
          {/* {selectedMarker && (
            <div className="selected-marker">
              <div className="label">{selectedMarker.province}</div>
            </div>
          )} */}
          {/* {selectedMarker === index && (
              <div className="marker-label" style={{ left: cx, top: cy - 15 }}>
                {item.province}
              </div>
            )} */}
          {/* {selectedMarker === index &&  (
        <div
          style={{
            position: 'absolute',
            left: cx - 20, // Adjust the position as needed
            top: cy - 35, // Adjust the position as needed
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
          }}
        >
          {item.province}
        </div>
      )} */}
           {/* {selectedMarker && (
              <div className="selected-marker-info">
                <h3>{item.province}</h3>
              </div>
            )} */}
          {selectedMarker === index && (
              <text x={cx} y={cy - 15} textAnchor="middle">
                  {item.province}
              </text>
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

// import { useState, useEffect } from 'react';

import React, { useState, useEffect } from "react";

function DateTime(){
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the current time every second
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

       // Create a new Date object to get the current date
  const currentDate = new Date();
  // Array of month names
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  // Get the current year, month, and date
  const year = currentDate.getFullYear();
  const currentMonthName = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();

  return(
    <div>
        <h1 className=''>{`${day} ${currentMonthName} ${year}`}</h1>
        <p className='my-2 text-end xl'>{currentTime.toLocaleTimeString()} WIB</p>
    </div>
  )
}
export default DateTime
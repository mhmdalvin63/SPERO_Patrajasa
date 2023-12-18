// import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Loading from '../../Parts/Loading';

import { Icon } from '@iconify/react';
const apiUrl = process.env.REACT_APP_API_URL;

const MultiAxisLineChart = () => {

  // D R I V E R
  const [Data, setData] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();

    // Set state with the current month
    setSelectedOption(currentMonth);

    const token = sessionStorage.getItem("jwttoken");
     axios.get(`${apiUrl}api/dashboard/ticket/daily?month=${currentMonth}`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log('DATA BULANNNNNNNNNNNN',result.data.data);
        setData(result.data.data.days);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});

    // Implement the logic based on the selected month (currentMonth)
  }, []);

  const handleChange = (e) => {
    setLoading(true);
    setSelectedOption(e.target.value);
    
    const token = sessionStorage.getItem("jwttoken");
     axios.get(`${apiUrl}api/dashboard/ticket/daily?month=${e.target.value}`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log('DATA BULANNNNNNNNNNNN',result.data.data);
        setData(result.data.data.days);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});
  };

  // D R I V E R
  // useEffect(() => {
  //   const token = sessionStorage.getItem("jwttoken");
  //    axios.get(`${apiUrl}api/dashboard/ticket/daily?month=${selectedOption}`, { headers: {"Authorization" : `Bearer ${token}`} })
  //     .then((result) => {
  //       console.log('DATA BULANNNNNNNNNNNN',result.data.data);
  //       setData(result.data.data.days);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       setLoading(false);});
  //   }, [selectedOption]);
  // console.log('Data Terbaru', Data);
  let closed = [];
  // let deleted = [];
  let done = [];
  let forwarding = [];
  let open = [];
  let process = [];
  let reopen = [];
  Data.map((el) => {
    closed.push(el.status[4].value);
    // deleted.push(el.status[6].value);
    done.push(el.status[3].value);
    forwarding.push(el.status[1].value);
    open.push(el.status[0].value);
    process.push(el.status[2].value);
    reopen.push(el.status[5].value);
  });
  
  const options = {
    colors : ['#1767B3', '#7AC241', '#EC2028', '#FFB800', '#00F9F9', '#AA00E6'],
    stroke: {
      // curve: 'smooth',
      width: 3,
    },
    chart: {
      id: 'multi-axis-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
    },
    yaxis: [
      {
        title: {
          text: 'Primary Y-Axis',
        },
      },
    ],
  };

  const series = [
    {
      name: 'Open',
      type: 'line',
      data: open,
      yaxisIndex: 1, // Use the secondary Y-Axis
    },
    {
      name: 'Proses',
      type: 'line',
      data: process,
      yaxisIndex: 2, // Use the secondary Y-Axis
    },
    {
      name: 'Closed',
      type: 'line',
      data: closed,
      yaxisIndex: 3, // Use the secondary Y-Axis
    },
    {
      name: 'Forwarding',
      type: 'line',
      data: forwarding,
      yaxisIndex: 3, // Use the secondary Y-Axis
    },
    {
      name: 'Done',
      type: 'line',
      data: done,
      yaxisIndex: 3, // Use the secondary Y-Axis
    },
    {
      name: 'Re-Open',
      type: 'line',
      data: reopen,
      yaxisIndex: 3, // Use the secondary Y-Axis
    },
  ];

  return (
    <div>
    {loading ? (
      <Loading/>
    ) : (
         <div className="multi-axis pt-4">
          {isLoading ? (
            <Loading/>
          ) : (
            <ReactApexChart options={options} series={series} type="line" height={250} />
          )}
      <div className='title-multi-axis px-5'>
                    <p>Grafik Status Ticket Per Hari</p>
                    <select 
                    value={selectedOption} 
                    onChange={handleChange} 
                    size="xl" 
                    aria-label="Default select example" className='select-multi-axis'>
                      <option value="january">Januari</option>
                      <option value="february">Februari</option>
                      <option value="march">Maret</option>
                      <option value="april">April</option>
                      <option value="may">Mei</option>
                      <option value="june">Juni</option>
                      <option value="july">Juli</option>
                      <option value="august">Agustus</option>
                      <option value="september">September</option>
                      <option value="october">Oktober</option>
                      <option value="november">November</option>
                      <option value="december">Desember</option>
                    </select>
                    {/* <p>selected : {selectedOption}</p> */}
                  </div>
      
    </div>
    )}
  </div>
   
  );
};

export default MultiAxisLineChart;

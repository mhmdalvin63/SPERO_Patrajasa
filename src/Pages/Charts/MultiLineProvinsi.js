// import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import Form from 'react-bootstrap/Form';
import Loading from '../../Parts/Loading';
const apiUrl = process.env.REACT_APP_API_URL;



const MultiAxisLineChart = () => {
  const [loading, setLoading] = useState(true);
    // D R I V E R
  const [DataPerProvinsi, setDataPerProvinsi] = useState([]);

  // D R I V E R
  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
     axios.get(`${apiUrl}api/dashboard/ticket/each-province`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log('okkkkkkkkkkkkkkkkkk',result.data.data);
        setDataPerProvinsi(result.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});
    }, []);

    let provinsi = [];
    let open = [];
    let forwarding = [];
    let process = [];
    let reopen = [];
    let done = [];
    let closed = [];
    DataPerProvinsi.map((el) => {
      provinsi.push(el.province);
      open.push(el.count.open);
      forwarding.push(el.count.forwarding);
      process.push(el.count.process);
      reopen.push(el.count.reopen);
      done.push(el.count.done);
      closed.push(el.count.closed);
    });
    // console.log('OENNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',open)
    
  const options = {
    colors : ['#1767B3', '#7AC241', '#EC2028', '#FFB800', '#00F9F9', '#AA00E6'],
    stroke: {
      curve: 'smooth',
      // width: 2
    },
    chart: {
      id: 'multi-axis-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: provinsi,
    },
    labels: {
      rotate: -45, // Set the rotation angle in degrees (negative for counterclockwise rotation)
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
      name: 'Open ',
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
      <ReactApexChart options={options} series={series} type="line" height={250} />
      <div className='title-multi-axis px-5'>
                    <p>Grafik Per Provinsi</p>
                  </div>
    </div>
    )}
  </div>
   
  );
};

export default MultiAxisLineChart;

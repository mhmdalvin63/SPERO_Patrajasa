// import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';


const MultiAxisLineChart = () => {
    // D R I V E R
  const [DataPerProvinsi, setDataPerProvinsi] = useState([]);

  // D R I V E R
  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
     axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket/each-province', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log(result);
        setDataPerProvinsi(result.data.data);
      })
      .catch((error) => console.log(error));
    }, []);

    let provinsi = [];
    let count = [];
    DataPerProvinsi.map((el) => {
      provinsi.push(el.province);
      count.push(el.count);
    });

    console.log(count)
    
  const options = {
    colors : ['#1767B3'],
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
      data: count,
      yaxisIndex: 1, // Use the secondary Y-Axis
    },
  ];

  return (
    <div className="multi-axis pt-4">
      <ReactApexChart options={options} series={series} type="line" height={250} />
      <div className='title-multi-axis px-5'>
                    <p>Grafik Per Provinsi</p>
                    <Form.Select size="sm" aria-label="Default select example" className='select-multi-axis text-white'>
                      <option>Open this select menu</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </Form.Select>
                  </div>
    </div>
  );
};

export default MultiAxisLineChart;

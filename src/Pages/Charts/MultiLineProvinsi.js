// import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';


const MultiAxisLineChart = () => {
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
      categories: ['N Aceh Darussalam', 'Sumatera Utara', 'Sumatera Selatan', 'Sumatera Barat', 'Bengkulu', 'Riau', 'Kepulauan Riau','Jambi','Lampung','Bangka Belitung','Kalimantan Barat','Kalimantan Timur','Kalimantan Selatan','Kalimantan Tengah','Kalimantan Utara','Banten','DKI Jakarta'],
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
      data: [20, 50, 80, 30, 40, 90, 72, 46, 98, 76, 48, 87, 2, 76],
      yaxisIndex: 1, // Use the secondary Y-Axis
    },
    {
      name: 'Forward',
      type: 'line',
      data: [30, 60, 28, 49, 28, 12, 19, 37, 98, 57, 37, 87, 28, 8],
      yaxisIndex: 1, // Use the secondary Y-Axis
    },
    {
    //   name: 'Sumatera Selatan',
      type: 'Proses',
      data: [82, 94, 37, 10, 37, 89, 12, 76, 98, 48, 68, 48, 38,98],
      yaxisIndex: 1, // Use the secondary Y-Axis
    },
    {
      name: 'Reopen',
      type: 'line',
      data: [12, 30, 49, 18, 98, 49, 19, 28, 95, 83, 87, 76, 98, 26],
      yaxisIndex: 1, // Use the secondary Y-Axis
    },
    {
      name: 'Done',
      type: 'line',
      data: [91, 12, 37, 87, 49, 93, 54, 27, 87, 27, 76, 38, 19, 87],
      yaxisIndex: 1, // Use the secondary Y-Axis
    },
    {
      name: 'Closed',
      type: 'line',
      data: [12, 76, 83, 27, 18, 10, 23, 56, 32, 98, 87, 37, 83, 65],
      yaxisIndex: 1, // Use the secondary Y-Axis
    },
  ];

  return (
    <div className="multi-axis pt-4">
      <ReactApexChart options={options} series={series} type="line" height={250} />
      <div className='title-multi-axis px-5'>
                    <p>Grafik Status Ticket Per Provinsi</p>
                    <Form.Select size="sm" aria-label="Default select example" className='select-multi-axis text-white'>
                      <option>Open this select menu</option>
                      <option value="Januari">Januari</option>
                      <option value="Februari">Februari</option>
                      <option value="Maret">Maret</option>
                      <option value="April">April</option>
                      <option value="Mei">Mei</option>
                      <option value="Juni">Juni</option>
                      <option value="Juli">Juli</option>
                      <option value="Agustus">Agustus</option>
                      <option value="September">September</option>
                      <option value="Oktober">Oktober</option>
                      <option value="November">November</option>
                      <option value="Desember">Desember</option>
                    </Form.Select>
                  </div>
    </div>
  );
};

export default MultiAxisLineChart;

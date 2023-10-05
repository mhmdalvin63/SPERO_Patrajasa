// import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';


const MultiAxisLineChart = () => {
    // D R I V E R
  const [Data, setData] = useState([]);

  // D R I V E R
  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
     axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket/daily', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log(result.data.data.days);
        setData(result.data.data.days);
      })
      .catch((error) => console.log(error));
    }, []);

    
    // for(const i in Data){
    //   Data.day = Data[i].map((index) => {
    //       return index + 1;
    //   })
    // }
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
  // console.log('close : ',closed);
  // console.log('delete : ', deleted);
  // console.log('done : ',done);
  // console.log('forwarding : ',forwarding);
  // console.log('open : ',open);
  // console.log('process : ',process);
  // console.log('reopen : ',reopen);
  
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
    <div className="multi-axis pt-4">
      <ReactApexChart options={options} series={series} type="line" height={250} />
      <div className='title-multi-axis px-5'>
                    <p>Grafik Status Ticket Per Hari</p>
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

// import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Loading from '../../Parts/Loading';


const MultiAxisLineChart = () => {
  const [loading, setLoading] = useState(true);
    // D R I V E R
  const [DataPerBulan, setDataPerBulan] = useState([]);

  // D R I V E R
  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
     axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket/monthly', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log(result.data.data.months);
        setDataPerBulan(result.data.data.months);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});
    }, []);

    // console.log('data bulanan', DataPerBulan)

    let closed = [];
    // let deleted = [];
    let done = [];
    let forwarding = [];
    let open = [];
    let process = [];
    let reopen = [];
    DataPerBulan.map((el) => {
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
      categories: ['Jan', 'Feb', 'Mar', 'April', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'],
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
                    <p>Grafik Per Bulan</p>
                    <Form.Select size="sm" aria-label="Default select example" className='select-multi-axis text-white'>
                      <option>Open this select menu</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </Form.Select>
                  </div>
    </div>
      )}
    </div>
    
  );
};

export default MultiAxisLineChart;

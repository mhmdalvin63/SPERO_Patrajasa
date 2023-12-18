import '../Css/Pages/PageTicket.css';
import '../Css/Parts/Font.css'; 

import Pusher from 'pusher-js';

import {Dropdown, Form,  FormControl, Button} from 'react-bootstrap';

import { Icon } from '@iconify/react';

import { Link } from 'react-router-dom';

import {Table} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DateTime from '../Parts/DateTime';
import SvgLogo from '../Parts/SvgLogo';
import Loading from '../Parts/Loading';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




function PageTicket() {
    const [loading, setLoading] = useState(true);
    // T I C K E T
  const [Ticket, setTicket] = useState([]);
  const [Kategori, setKategori] = useState([]);
  const [endTime, setEndTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({ });
  const [Activity, setActivity] = useState([]);
  const [DetailTicket, setDetailTicket] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("jwttoken");

        const currentURL = window.location.href;
    console.log('CURRENTTTTTTTTTTTTT:', currentURL);
    let urlApi;
    if (currentURL.includes('172.16.16.3')) {
      urlApi = process.env.REACT_APP_API_URL_HTTP;
    } else if (currentURL.includes('dashboard.par.co.id')) {
      urlApi = process.env.REACT_APP_API_URL;
    } else {
      urlApi = process.env.REACT_APP_API_URL;
    }

        const fetchData = async () => {
          try {
            const result = await axios.get(`${urlApi}api/dashboard/ticket`, { headers: {"Authorization" : `Bearer ${token}`} })
            console.log('DATAAAAA',result.data.data);
            setTicket(result.data.data);
            setActivity(result.data.data);
            setDetailTicket(result.data.data);
            // setFilteredData(result.data.data);
            const eventEndTime = new Date(result.data.data.category.range_time);
            setEndTime(eventEndTime);
            setLoading(false);
    
            setLoading(false);
          } catch (error) {
            console.log(error)
            setLoading(false);
          }
        };

        const pusher = new Pusher('2b7208e6523a6e855f6b', {
          cluster: 'ap1',
        });
        const channel = pusher.subscribe('post-ticket');
        
        channel.bind('post-ticket-event', (data) => {
          console.log(data.message);
          try {
            if (data.message.status === 'open' || data.message.status === 'process' || data.message.status === 'done' || data.message.status === 'closed') {
              // If data.message is "Ping!", update the state
              // setOpen((prevOpen) => !prevOpen);
              // setOpenWeek((prevOpenWeek) => !prevOpenWeek);
              // setOpenMonth((prevOpenMonth) => !prevOpenMonth);
              // setOpenYear((prevOpenYear) => !prevOpenYear);
              // setProses((prevProses) => !prevProses);
              // setProsesWeek((prevProsesWeek) => !prevProsesWeek);
              // setProsesMonth((prevProsesMonth) => !prevProsesMonth);
              // setProsesYear((prevProsesYear) => !prevProsesYear);
              // setDone((prevDone) => !prevDone);
              // setDoneWeek((prevDoneWeek) => !prevDoneWeek);
              // setDoneMonth((prevDoneMonth) => !prevDoneMonth);
              // setDoneYear((prevDoneYear) => !prevDoneYear);
              // setClose((prevClose) => !prevClose);
              // setCloseWeek((prevCloseWeek) => !prevCloseWeek);
              // setCloseMonth((prevCloseMonth) => !prevCloseMonth);
              // setCloseYear((prevCloseYear) => !prevCloseYear);
              console.log('Fetching data...');
              fetchData();
            }
          } catch (error) {
            console.error('Gagal mengurai data JSON:', error);
          }
          // Add additional logic or rendering here if needed
        });

        const fetchDataInterval = setInterval(() => {
          console.log('Fetching data...');
          fetchData();
        }, 5000); // 5000 milliseconds = 5 seconds
      
        // Clear the interval when the component unmounts or when it is not needed anymore
        return () => clearInterval(fetchDataInterval);

        axios.get(`${urlApi}api/dashboard/ticket/get-categories`, { headers: {"Authorization" : `Bearer ${token}`} })
          .then((result) => {
            console.log('KATTTT',result.data.data);
            setKategori(result.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error)
            setLoading(false);});
    
        channel.bind('pusher:error', err => {
          console.error('Pusher Error:', err);
        });
    
        pusher.connection.bind('connected', () => {
          console.log('Connected to Pusher');
        });
    
        fetchData(); 

        return () => {
          pusher.disconnect(); // Disconnect Pusher when the component unmounts
        };
    
        //  axios.get(process.env.REACT_APP_API_URL + 'api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
        //   .then((result) => {
        //     console.log('DATAAAAA',result.data.data);
        //     setTicket(result.data.data);
        //     setActivity(result.data.data);
        //     setDetailTicket(result.data.data);
        //     // setFilteredData(result.data.data);
        //     const eventEndTime = new Date(result.data.data.category.range_time);
        //     setEndTime(eventEndTime);
        //     setLoading(false);
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //     setLoading(false);});

         
      }, []);

      const formatDateLong = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
        };
        const getTimeFromData = (timeString) => {
          const date = new Date(timeString);
          return date.toLocaleTimeString();
        };

        const [search, setSearch] = useState('');
        const [selectedCategoryId, setSelectedCategoryId] = useState('');
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');

        // Filtering 
        let filteredData = Ticket;
        if (startDate || endDate || search || selectedCategoryId) {
          // Filtering criteria provided, apply filters
         filteredData = Ticket.filter((item) => {
            // Filter by time range
            const startTime = new Date(item.start_time);
            const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);
            console.log('COBAAAAAA', endTime)
            const filterStartDate = startDate ? new Date(startDate) : null;
            const filterEndDate = endDate ? new Date(endDate) : null;
        
            // Check individual criteria
            const isDateInRange = (!filterStartDate || startTime >= filterStartDate) &&
                                  (!filterEndDate || endTime <= filterEndDate);
        
            const isSearchMatch = !search ||
              (item.ticket_code.toLowerCase().includes(search.toLowerCase()) ||
                item.category.name.toLowerCase().includes(search.toLowerCase()) ||
                item.activity.name.toLowerCase().includes(search.toLowerCase()) ||
                item.detail_ticket.subject.toLowerCase().includes(search.toLowerCase()));
        
            const isCategoryMatch = !selectedCategoryId || (item.category.name === selectedCategoryId);
        
            // Combine individual criteria with AND logic
            return isDateInRange && isSearchMatch && isCategoryMatch;
          });
        }
        

  useEffect(() => {
    // Update the time remaining every second
    const intervalId = setInterval(() => {
      // Update time remaining for each event
      const updatedTimeRemaining = {};
      filteredData.forEach((item) => {
        const startTime = new Date(item.start_time);
        const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);
        const currentTime = new Date();
        const remaining = endTime.getTime() - currentTime.getTime();
        updatedTimeRemaining[item.id] = remaining > 0 ? remaining : 0;
      });
      setTimeRemaining(updatedTimeRemaining);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [filteredData]);
         
        const calculateTimeDifference = (rangeTime) => {
          const now = new Date(); // Waktu sekarang
          const rangeTimeDate = new Date(rangeTime); // Konversi range_time ke objek Date
      
          const timeDifference = rangeTimeDate - now; // Perbedaan waktu dalam milidetik
          const secondsDifference = Math.floor(timeDifference / 1000);
          const minutesDifference = Math.floor(secondsDifference / 60);
          const hoursDifference = Math.floor(minutesDifference / 60);
          const dayDifference = Math.floor(hoursDifference / 24);

          if (timeDifference <= 0) {
            return "Waktu habis";
          }
          if (hoursDifference <= 0) {
            return `${minutesDifference} menit, ${secondsDifference} detik`;
          }
      
          return `${hoursDifference} jam, ${minutesDifference} menit`;
        };


    return (
        <div>
      {loading ? (
        <Loading/>
      ) : (
        <div className='PageListTicket'>
            <div className='main-new-header px-5 pt-2'>
                <div className='header-logo-prima'>
                    <SvgLogo></SvgLogo>
                </div>
                <div className='track-filter text-end'>
                    <DateTime/>
                </div>
            </div>

            {/* className='menu-dropdown-table-ticket'> */}
            <div className='table-list-ticket px-5'>
            <div className='filtering-table-dropdown-ticket px-3 my-3'>
                <div className='d-flex align-items-center gap-5'>
                <Form.Group className='select-date' controlId="sd">
                    <Form.Label>
                        <p className='nw'>
                            <Icon icon="bx:calendar" /> Start Date
                        </p>
                    </Form.Label>
                    <br />
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className='ms-3'
                        placeholderText="Start Date"
                    />
                </Form.Group>
                <Form.Group className='select-date' controlId="sd">
                    <Form.Label>
                        <p className='nw'>
                            <Icon icon="bx:calendar" /> End Date
                        </p>
                    </Form.Label>
                    <br />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className='ms-3'
                        placeholderText="End Date"
                    />
                </Form.Group>
                <Form.Group className='select-date' controlId="ed">
                    <Form.Label><p className='nw'><Icon icon="material-symbols:border-all" /> Kategori</p></Form.Label>
                    <Form.Select onChange={(e) => setSelectedCategoryId(e.target.value)}
                    value={selectedCategoryId} aria-label="Default select example">
                    <option value=''>Open this select menu</option>
                    {Kategori &&
                    Kategori.map((item) =>
                      item ? (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ) : null
                    )}
                    </Form.Select>
                    {/* <p>selected : {selectedCategoryId}</p> */}
                </Form.Group>
                </div>
                <Form className='search-bottom d-flex align-items-center'>
                    {/* <FormControl
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)} className="icon2 mr-sm-2" /> */}
                      
          <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
                    <Button className='icon'><Icon icon="ri:search-line" /></Button>
                </Form>
            </div>
            <Table responsive>
                <thead className='bg-blue w-100' id='page-ticket-bottom-thead'>
                <tr className='text-center text-white'>
                    <th className='text-center'>NO</th>
                    <th>ID Ticket</th>
                    <th>Title</th>
                    <th>Ticket Masuk</th>
                    <th>Dateline Ticket</th>
                    <th>Timecode</th>
                    <th>Prioritas</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody className='page-ticket-bottom-tbody'>
                {filteredData.map((item, index) => {
                  const remaining = timeRemaining[item.id];
  return (
        <tr className='text-center'>
        <td>{index + 1}</td>
        <td>{item.ticket_code}</td>
        <td>{item.detail_ticket.subject}</td>
        <td>
            <p>{formatDateLong(item.start_time)}</p>
            <p className='text-red'>{getTimeFromData(item.start_time)} WIB</p>
            {/* <p className='text-red'>11 : 14 WIB</p> */}
        </td>
        <td>
            {/* <p>{item.range_time}</p> */}
            <p>{formatDateLong(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>
            <p className='text-red'>{getTimeFromData(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>

            {/* <p>{new Date(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000).toLocaleString()}</p> */}
        </td>
        <td>
          {typeof remaining === 'number' ? (
            remaining <= 0 ? (
              <p className='text-red'>Waktu Habis</p>
            ) : (
              <p className='text-red'>{`${Math.floor(remaining / (60 * 60 * 1000))} jam, ${Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))} menit, ${Math.floor((remaining % (60 * 1000)) / 1000)} detik`}</p>
            )
          ) : (
            <p className='text-red'>Loading...</p>
          )}
        </td>
        {item.priority_id === 1 ? (
          <td>
          <p  className='fwb text-lime'>Low</p>
          </td>
        ) : item.priority_id === 2  ? (
         <td>
          <p className='fwb text-blue'>Medium</p>
          </td>
        ) : (
          <td>
          <p className='fwb text-red'>High</p>
          </td>
        )}
        <td>
            <p style={{ color: item.activity.color}}>{item.activity.name}</p>
        </td>
        <td><Link to={`/list-ticket/${item.id}`} className='button-eye py-2 px-3'><Icon icon="mdi:eye" /></Link></td>
        </tr>
  );
})}
                </tbody>
            </Table>
            </div>
        </div>
      )}
    </div>
        
    )
}

export default PageTicket
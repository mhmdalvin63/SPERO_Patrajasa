import '../Css/Pages/PageTicket.css';
import '../Css/Parts/Font.css'; 


import {Dropdown, Form,  FormControl, Button} from 'react-bootstrap';

import { Icon } from '@iconify/react';

import { Link } from 'react-router-dom';

import {Table} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DateTime from '../Parts/DateTime';
import SvgLogo from '../Parts/SvgLogo';
import Loading from '../Parts/Loading';




function PageTicket() {
    const [loading, setLoading] = useState(true);
    // T I C K E T
  const [Ticket, setTicket] = useState([]);
  const [Kategori, setKategori] = useState([]);
  const [endTime, setEndTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0 });
  const [Activity, setActivity] = useState([]);
  const [DetailTicket, setDetailTicket] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("jwttoken");
         axios.get(process.env.REACT_APP_API_URL + 'api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
          .then((result) => {
            console.log('DATAAAAA',result.data.data);
            setTicket(result.data.data);
            setActivity(result.data.data);
            setDetailTicket(result.data.data);
            // setFilteredData(result.data.data);
            const eventEndTime = new Date(result.data.data.category.range_time);
            setEndTime(eventEndTime);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error)
            setLoading(false);});

         axios.get(process.env.REACT_APP_API_URL + 'api/dashboard/ticket/get-categories', { headers: {"Authorization" : `Bearer ${token}`} })
          .then((result) => {
            console.log('KATTTT',result.data.data);
            setKategori(result.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error)
            setLoading(false);});
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
            const endTime = new Date(item.range_time);
            const filterStartDate = startDate ? new Date(startDate) : null;
            const filterEndDate = endDate ? new Date(endDate) : null;
        
            // Check individual criteria
            const isDateInRange = (!filterStartDate || startTime >= filterStartDate) &&
                                  (!filterEndDate || endTime <= filterEndDate);
        
            const isSearchMatch = !search ||
              (item.ticket_code.toLowerCase().includes(search.toLowerCase()) ||
                item.category.name.toLowerCase().includes(search.toLowerCase()) ||
                item.activity.name.toLowerCase().includes(search.toLowerCase()));
        
            const isCategoryMatch = !selectedCategoryId || (item.category.name === selectedCategoryId);
        
            // Combine individual criteria with AND logic
            return isDateInRange && isSearchMatch && isCategoryMatch;
          });
        }
         
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
                    <Form.Label><p className='nw'><Icon icon="bx:calendar" /> Start Date</p></Form.Label>
                    {/* <Form.Control type="date" name="sd" placeholder="Start Date" /> */}
                    <br/>
                    
          <input
          className='ms-3'
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
                </Form.Group>
                <Form.Group className='select-date' controlId="ed">
                    <Form.Label><p className='nw'><Icon icon="bx:calendar" /> End Date</p></Form.Label>
                    {/* <Form.Control type="date" name="ed" placeholder="End Date" /> */}
                    <br/>
                    <input
                    className='ms-3'
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
                {filteredData.map((item, index) => (
                    <tr className='text-center'>
                    <td>{index + 1}</td>
                    <td>{item.ticket_code}</td>
                    <td>{item.category.name}</td>
                    <td>
                        <p>{formatDateLong(item.start_time)}</p>
                        <p className='text-red'>{getTimeFromData(item.start_time)} WIB</p>
                        {/* <p className='text-red'>11 : 14 WIB</p> */}
                    </td>
                    <td>
                        <p>{formatDateLong(item.range_time)}</p>
                        <p className='text-red'>{getTimeFromData(item.range_time)} WIB</p>
                    </td>
                    <td>
                        <p className='text-red'>{calculateTimeDifference(item.range_time)} </p>
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
                ))}
                </tbody>
            </Table>
            </div>
        </div>
      )}
    </div>
        
    )
}

export default PageTicket
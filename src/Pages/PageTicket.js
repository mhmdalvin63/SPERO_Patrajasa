import '../Css/Pages/PageTicket.css';
import '../Css/Parts/Font.css'; 

import Pusher from 'pusher-js';

import SvgLogo from '../Parts/SvgLogo';
import {Dropdown, Form,  FormControl, Button, Row, Col} from 'react-bootstrap';

import { Icon } from '@iconify/react';

import {Table} from 'react-bootstrap';

import DateTime from '../Parts/DateTime'

import { useEffect, useState } from 'react';

import { ReactComponent as Detakblue } from '../Images/detak-blue.svg';
import { ReactComponent as Svgbiru } from '../Images/svg-biru.svg';
import { ReactComponent as Svgkuning } from '../Images/svg-kuning.svg';
import { ReactComponent as Svgmerah } from '../Images/svg-merah.svg';
import { ReactComponent as Svgungu } from '../Images/svg-ungu.svg';
import { ReactComponent as Svghijau } from '../Images/svg-hijau.svg';
import { ReactComponent as Svgcyan } from '../Images/svg-cyan.svg';

import ChartHari from './Charts/MultiLineHari'
import ChartBulan from './Charts/MultiLineBulan'
import ChartProvinsi from './Charts/MultiLineProvinsi'
import axios from 'axios';
import Loading from '../Parts/Loading';

import NothingHaveToken from '../Parts/NothingHaveToken';

function PageTicket() {
NothingHaveToken()
    const [loading, setLoading] = useState(true);

      // T I C K E T   S U M M A R Y
  const [posts, setPosts] = useState([]);
  const [priority, setPriority] = useState([]);

  const [open, setOpen] = useState([]);
  const [openlow, setopenlow] = useState([]);
  const [openmedium, setopenmedium] = useState([]);
  const [openhigh, setopenhigh] = useState([]);
  const [Proses, setProses] = useState([]);
  const [processlow, setprocesslow] = useState([]);
  const [processmedium, setprocessmedium] = useState([]);
  const [processhigh, setprocesshigh] = useState([]);
  
  const [Done, setDone] = useState([]);
  const [DoneLow, setDoneLow] = useState([]);
  const [DoneMedium, setDoneMedium] = useState([]);
  const [DoneHigh, setDoneHigh] = useState([]);
  const [Close, setClose] = useState([]);
  const [closedlow, setclosedlow] = useState([]);
  const [closedmedium, setclosedmedium] = useState([]);
  const [closedhigh, setclosedhigh] = useState([]);
  
  const [Kategori, setKategori] = useState([]);

  const [Ticket, setTicket] = useState([]);
  
  // const token = sessionStorage.getItem("jwttoken");
  // const fetchData = async () => {
  //   try {
  //     const result = await axios.get(`${process.env.REACT_APP_API_URL}api/ticket/summary`, { headers: {"Authorization" : `Bearer ${token}`} });
  //       setPosts(result.data.data.total_priority);
  //       setPriority(result.data.data.total_priority);
  //       setOpen(result.data.data.status.open);
  //       setopenlow(result.data.data.status.open.priority[0].value);
  //       setopenmedium(result.data.data.status.open.priority[1].value);
  //       setopenhigh(result.data.data.status.open.priority[2].value);
  //       setProses(result.data.data.status.process);
  //       setprocesslow(result.data.data.status.process.priority[0].value);
  //       setprocessmedium(result.data.data.status.process.priority[1].value);
  //       setprocesshigh(result.data.data.status.process.priority[2].value);
  //       setDone(result.data.data.status.done);
  //       setDoneLow(result.data.data.status.done.priority[0].value);
  //       setDoneMedium(result.data.data.status.done.priority[1].value);
  //       setDoneHigh(result.data.data.status.done.priority[2].value);
  //       setClose(result.data.data.status.closed);
  //       setclosedlow(result.data.data.status.closed.priority[0].value);
  //       setclosedmedium(result.data.data.status.closed.priority[1].value);
  //       setclosedhigh(result.data.data.status.closed.priority[2].value);
  //       setLoading(false);
  //   } catch (error) {
  //     console.log(error)
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   // Lakukan pemanggilan pertama
  //   fetchData();

  //   // Atur interval polling (misalnya, setiap 5 detik)
  //   const intervalId = setInterval(fetchData, 10000);

  //   // Membersihkan interval saat komponen di-unmount
  //   return () => clearInterval(intervalId);
  // }, []);

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
        const result = await axios.get(`${urlApi}api/ticket/summary`, { headers: {"Authorization" : `Bearer ${token}`} })
        setPosts(result.data.data.total_priority);
        setPriority(result.data.data.total_priority);
        setOpen(result.data.data.status.open);
        setopenlow(result.data.data.status.open.priority[0].value);
        setopenmedium(result.data.data.status.open.priority[1].value);
        setopenhigh(result.data.data.status.open.priority[2].value);
        setProses(result.data.data.status.process);
        setprocesslow(result.data.data.status.process.priority[0].value);
        setprocessmedium(result.data.data.status.process.priority[1].value);
        setprocesshigh(result.data.data.status.process.priority[2].value);
        setDone(result.data.data.status.done);
        setDoneLow(result.data.data.status.done.priority[0].value);
        setDoneMedium(result.data.data.status.done.priority[1].value);
        setDoneHigh(result.data.data.status.done.priority[2].value);
        setClose(result.data.data.status.closed);
        setclosedlow(result.data.data.status.closed.priority[0].value);
        setclosedmedium(result.data.data.status.closed.priority[1].value);
        setclosedhigh(result.data.data.status.closed.priority[2].value);

        const resultTicket = await axios.get(`${urlApi}api/dashboard/ticket`, { headers: {"Authorization" : `Bearer ${token}`} })
        setTicket(resultTicket.data.data);

        const resultKategori = await axios.get(`${urlApi}api/dashboard/ticket/get-categories`, { headers: {"Authorization" : `Bearer ${token}`} })
        setKategori(resultKategori.data.data);

        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    };
  //    axios.get(`${process.env.REACT_APP_API_URL}api/ticket/summary`, { headers: {"Authorization" : `Bearer ${token}`} })
  //     .then((result) => {
  //       setPosts(result.data.data.total_priority);
  //       setPriority(result.data.data.total_priority);
  //       setOpen(result.data.data.status.open);
  //       setopenlow(result.data.data.status.open.priority[0].value);
  //       setopenmedium(result.data.data.status.open.priority[1].value);
  //       setopenhigh(result.data.data.status.open.priority[2].value);
  //       setProses(result.data.data.status.process);
  //       setprocesslow(result.data.data.status.process.priority[0].value);
  //       setprocessmedium(result.data.data.status.process.priority[1].value);
  //       setprocesshigh(result.data.data.status.process.priority[2].value);
  //       setDone(result.data.data.status.done);
  //       setDoneLow(result.data.data.status.done.priority[0].value);
  //       setDoneMedium(result.data.data.status.done.priority[1].value);
  //       setDoneHigh(result.data.data.status.done.priority[2].value);
  //       setClose(result.data.data.status.closed);
  //       setclosedlow(result.data.data.status.closed.priority[0].value);
  //       setclosedmedium(result.data.data.status.closed.priority[1].value);
  //       setclosedhigh(result.data.data.status.closed.priority[2].value);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //   setLoading(false);
  // });

    //  axios.get(`${process.env.REACT_APP_API_URL}api/dashboard/ticket`, { headers: {"Authorization" : `Bearer ${token}`} })
    //   .then((result) => {
    //     // console.log('TICKETTTTT', result.data.data);
    //     setTicket(result.data.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     setLoading(false);
    //   });

    // axios.get(`${process.env.REACT_APP_API_URL}api/dashboard/ticket/get-categories`, { headers: {"Authorization" : `Bearer ${token}`} })
    //       .then((result) => {
    //         // console.log('KATTTT',result.data.data);
    //         setKategori(result.data.data);
    //         setLoading(false);
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //         setLoading(false);
    //       });   

    const pusher = new Pusher('2b7208e6523a6e855f6b', {
      cluster: 'ap1',
    });
    const channel = pusher.subscribe('post-ticket');

    channel.bind('post-ticket-event', (data) => {
      console.log('TESSSSSSSSSSSSSSSSS', data.message.status);
      try {
        if (data.message.status === 'open' || data.message.status === 'process' || data.message.status === 'done' || data.message.status === 'closed') {
          console.log('Fetching data...');
          fetchData();
        }
      } catch (error) {
        console.error('Failed to parse JSON data:', error);
      }
    });
    

channel.bind('pusher:error', (err) => {
  console.error('Pusher Error:', err);
});

pusher.connection.bind('connected', () => {
  console.log('Connected to Pusher');
});

fetchData();

return () => {
  pusher.disconnect(); // Disconnect Pusher when the component unmounts
};

  }, []);

  let DataOpen;
  if (Array.isArray(Ticket)) {
    DataOpen = Ticket.filter(item => item.activity.name === 'open');
  } else {
    DataOpen = []; // or set to any default value you prefer
  }
  let DataProcess;
  if (Array.isArray(Ticket)) {
    DataProcess = Ticket.filter(item => item.activity.name === 'process');
  } else {
    DataProcess = []; // or set to any default value you prefer
  }
  let DataDone;
  if (Array.isArray(Ticket)) {
    DataDone = Ticket.filter(item => item.activity.name === 'done');
  } else {
    DataDone = []; // or set to any default value you prefer
  }
  let DataClosed;
  if (Array.isArray(Ticket)) {
    DataClosed = Ticket.filter(item => item.activity.name === 'closed');
  } else {
    DataClosed = []; // or set to any default value you prefer
  }
  // let DataOpen = Ticket.filter(item => item.activity.name === 'open');
//   let openColor = ['color'];
//   let dataforwarding = Ticket.filter(item => item.activity.name === 'forwarding');
  // let DataProcess = Ticket.filter(item => item.activity.name === 'process');
  // let DataDone = Ticket.filter(item => item.activity.name === 'done');
  // let DataClosed = Ticket.filter(item => item.activity.name === 'closed');
  console.log('DATAAAAAA', DataOpen)


// CHECKBOX FILTER
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
    };
    let status = ['Open', 'Proses', 'Done' ,'Closed']
    let listStatusFilter = status.map((index)=>
        <Form.Check
        key={index}
        type="checkbox"
        label= {index}
        id="myCheckbox"
        checked={isChecked.index}
        onChange={handleCheckboxChange}
        />
    )
    let listKategoriFilter = Kategori.map((item) => (
      <Form.Check
          key={item.name}  // assuming that your objects have an 'name' property
          type="checkbox"
          label={item.name}  // assuming that your objects have an 'name' property
          id={`myCheckbox_${item.name}`}  // use a unique identifier for each checkbox
          checked={isChecked[item.name]}
          onChange={() => handleCheckboxChange(item.name)}
      />
  ));
    let prioritas = ['Low', 'Medium', 'High']
    let listPriorityFilter = prioritas.map((index)=>
        <Form.Check
        key={index}
        type="checkbox"
        label= {index}
        id="myCheckbox"
        checked={isChecked.index}
        onChange={handleCheckboxChange}
        />
    )
    let statusDriver = ['Online', 'Offline']
    let listStatusDriverFilter = statusDriver.map((index)=>
    <Form.Check
    key={index}
    type="checkbox"
    label= {index}
    id="myCheckbox"
    checked={isChecked.index}
    onChange={handleCheckboxChange}
    />
    )
    // END CHECKBOX FILTER

    const formatDateLong = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
        };
        const getTimeFromData = (timeString) => {
          const date = new Date(timeString);
          return date.toLocaleTimeString();
        };
        
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
        const [search, setSearch] = useState('');
        const [selectedCategoryId, setSelectedCategoryId] = useState('');
      
        // Filtering
        let filteredTicketOpen = DataOpen;
        if (startDate || endDate || search || selectedCategoryId) {
          // Filtering criteria provided, apply filters
          filteredTicketOpen = DataOpen.filter((item) => {
            // Filter by time range
            const startTime = new Date(item.start_time);
            const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);
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
        let filteredTicketProcess = DataProcess;
        if (startDate || endDate || search || selectedCategoryId) {
          // Filtering criteria provided, apply filters
          filteredTicketProcess = DataProcess.filter((item) => {
            // Filter by time range
            const startTime = new Date(item.start_time);
            const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);
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
        let filteredTicketDone = DataDone;
        if (startDate || endDate || search || selectedCategoryId) {
          // Filtering criteria provided, apply filters
          filteredTicketDone = DataDone.filter((item) => {
            // Filter by time range
            const startTime = new Date(item.start_time);
            const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);
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
        let filteredTicketClosed = DataClosed;
        if (startDate || endDate || search || selectedCategoryId) {
          // Filtering criteria provided, apply filters
          filteredTicketClosed = DataClosed.filter((item) => {
            // Filter by time range
            const startTime = new Date(item.start_time);
            const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);
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
        let allDataFiltered = Ticket;
        if (startDate || endDate || search || selectedCategoryId) {
          // Filtering criteria provided, apply filters
         allDataFiltered = Ticket.filter((item) => {
            // Filter by time range
            const startTime = new Date(item.start_time);
            const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);
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
        

        
    //     const filteredTicketProcess= DataProcess.filter((item) => {
    //         // Filter by time range
    //         const startTime = new Date(item.start_time);
    //         const endTime = new Date(item.range_time);
        
    //         if (startDate && endDate) {
    //           const filterStartDate = new Date(startDate);
    //           const filterEndDate = new Date(endDate);
        
    //           if (startTime >= filterStartDate && endTime <= filterEndDate) {
    //             return true;
    //           } else {
    //             return false;
    //           }
    //         }

    //    // Filter by search input
    // if (search && !item.ticket_code.toLowerCase().includes(search.toLowerCase()) &&
    // !item.category.name.toLowerCase().includes(search.toLowerCase()) && 
    // !item.activity.name.toLowerCase().includes(search.toLowerCase()) ) {
    // return false;
    // }
           
    //     // Filter by selected category 
        
    //     if (
    //       (selectedCategoryId && item.category.name !== selectedCategoryId)
    //     ) {
    //       return false;
    //     }

    
    //     return true;
    //     });
    //     const filteredTicketDone= DataDone.filter((item) => {
    //         // Filter by time range
    //         const startTime = new Date(item.start_time);
    //         const endTime = new Date(item.range_time);
        
    //         if (startDate && endDate) {
    //           const filterStartDate = new Date(startDate);
    //           const filterEndDate = new Date(endDate);
        
    //           if (startTime >= filterStartDate && endTime <= filterEndDate) {
    //             return true;
    //           } else {
    //             return false;
    //           }
    //         }

    //    // Filter by search input
    // if (search && !item.ticket_code.toLowerCase().includes(search.toLowerCase()) &&
    // !item.category.name.toLowerCase().includes(search.toLowerCase()) && 
    // !item.activity.name.toLowerCase().includes(search.toLowerCase()) ) {
    // return false;
    // }
           
    //     // Filter by selected category
        
    //     if (
    //       (selectedCategoryId && item.category.name !== selectedCategoryId)
    //     ) {
    //       return false;
    //     }

    
    //     return true;
    //     });
    //     const filteredTicketClosed= DataClosed.filter((item) => {
    //         // Filter by time range
    //         const startTime = new Date(item.start_time);
    //         const endTime = new Date(item.range_time);
        
    //         if (startDate && endDate) {
    //           const filterStartDate = new Date(startDate);
    //           const filterEndDate = new Date(endDate);
        
    //           if (startTime >= filterStartDate && endTime <= filterEndDate) {
    //             return true;
    //           } else {
    //             return false;
    //           }
    //         }

    //    // Filter by search input
    // if (search && !item.ticket_code.toLowerCase().includes(search.toLowerCase()) &&
    // !item.category.name.toLowerCase().includes(search.toLowerCase()) && 
    // !item.activity.name.toLowerCase().includes(search.toLowerCase()) ) {
    // return false;
    // }
           
    //     // Filter by selected category
        
    //     if (
    //       (selectedCategoryId && item.category.name !== selectedCategoryId)
    //     ) {
    //       return false;
    //     }

    
    //     return true;
    //     });
    //     const allDataFiltered= Ticket.filter((item) => {
    //         // Filter by time range
    //         const startTime = new Date(item.start_time);
    //         const endTime = new Date(item.range_time);
        
    //         if (startDate && endDate) {
    //           const filterStartDate = new Date(startDate);
    //           const filterEndDate = new Date(endDate);
        
    //           if (startTime >= filterStartDate && endTime <= filterEndDate) {
    //             return true;
    //           } else {
    //             return false;
    //           }
    //         }

    //    // Filter by search input
    // if (search && !item.ticket_code.toLowerCase().includes(search.toLowerCase()) &&
    // !item.category.name.toLowerCase().includes(search.toLowerCase()) && 
    // !item.activity.name.toLowerCase().includes(search.toLowerCase()) ) {
    // return false;
    // }
           
    //     // Filter by selected category
        
    //     if (
    //       (selectedCategoryId && item.category.name !== selectedCategoryId)
    //     ) {
    //       return false;
    //     }

    
    //     return true;
    //     });


    return (
        <div>
      {loading ? (
        <Loading />
      ) : (
          <div className='PageTicket'>
            <div className='main-new-header align-items-start px-5'>
                <div className='header-logo-prima'>
                    <SvgLogo></SvgLogo>
                </div>
                <div className='track-filter text-end'>
                    <DateTime />
                    <div className='d-flex gap-4 justify-content-end align-items-end'>
                        <Dropdown drop="down">
                            <Dropdown.Toggle className='dropdown-table-ticket'>
                            <p className='text-blue'>Table Ticket</p>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='menu-dropdown-table-ticket'>
                                                        <div className='table-list-ticket px-5'>
            <div className='filtering-table-dropdown-ticket px-3 my-3'>
                <div className='d-flex align-items-center gap-5'>
                 <Form.Group className='select-date' controlId="sd">
                    <Form.Label><p className='nw'><Icon icon="bx:calendar" /> Start Date</p></Form.Label>
                    {/* <Form.Control type="date" name="sd" placeholder="Start Date" /> */}
              <br/>
          <input
          type="date"
          className='ms-3'
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
          type="date"
          className='ms-3'
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
                    <th>Prioritas</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody className='page-ticket-bottom-tbody'>
                {allDataFiltered.map((item, index) => (
                    <tr className='text-center'>
                    <td>{index+1}</td>
                    <td>{item.ticket_code}</td>
                    <td>{item.category.name}</td>
                    <td>
                        <p>{formatDateLong(item.start_time)}</p>
                        {/* <p className='text-red'>{getTimeFromData(item.start_time)} WIB</p> */}
                        {/* <p className='text-red'>11 : 14 WIB</p> */}
                    </td>
                    <td>
                        <p>{formatDateLong(item.range_time)}</p>
                        {/* <p className='text-red'>{getTimeFromData(item.range_time)} WIB</p> */}
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
                    {/* <td><Link to={`/list-ticket/${item.id}`} className='button-eye py-2 px-3'><Icon icon="mdi:eye" /></Link></td> */}
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <Dropdown drop="start">
                            <Dropdown.Toggle className='dropdown-filter-tracking'>
                            <h1><Icon icon="ion:filter" className='filter-button' /></h1>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='menu-dropdown-tracking px-4'>
                                <div className='filter-header d-flex align-items-center justify-content-between my-1'>
                                    <div className='d-flex align-items-center'>
                                        <p className='md'><Icon icon="mdi:filter" /></p>
                                        <p className='md'>Filter</p>
                                    </div>
                                    <div className='d-flex justify-content-end' id='filtering-logo'>
                                        <SvgLogo/>
                                    </div>
                                </div>
                                <hr />
                                <Form className='my-4'>
                                    <p className='md'>{listStatusFilter}</p>
                                </Form>
                                <Form className='my-4'>
                                    <p className='md'>{listKategoriFilter}</p>
                                </Form>
                                <Form className='my-4'>
                                    <p className='md'>{listPriorityFilter}</p>
                                </Form>
                                <Form.Group className='select-date d-flex align-items-center my-2 gap-2' controlId="sd">
                                    <Form.Label><p className='nw'>Start Date</p></Form.Label>
                                    <Form.Control type="date" name="sd" placeholder="Start Date" />
                                </Form.Group>
                                <Form.Group className='select-date d-flex align-items-center my-2 gap-3' controlId="sd">
                                    <Form.Label><p className='nw'>End Date</p></Form.Label>
                                    <Form.Control type="date" name="sd" placeholder="End Date" />
                                </Form.Group>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </div>
                </div>
            </div>

            <div className='page-ticket-content d-flex justify-content-center  align-items-center px-5'>
                <div className='ticket-top'>
                    <div className='header-total-ticket '>
                            <div className='upper-hr align-items-start gap-3'>
                                <h1 className='xl text-black'>{posts.total}</h1>
                                <div className='text-blue'>
                                    <div className='icon-ticket gap-2'>
                                        <h1 className='md'><Icon icon="carbon:report" /></h1>
                                        <div>
                                            <Detakblue fill="blue" />
                                            <p className='text-start'>Ticket</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='hr-main text-black'></div>
                            <div className='lower-hr gap-4 text-black'>
                                <h3>Low <span>{priority.low}</span></h3>
                                <div className='vl'></div>
                                <h3>Medium <span>{priority.medium}</span></h3>
                                <div className='vl'></div>
                                <h3>High <span>{priority.high}</span></h3>
                            </div>
                    </div>
                </div>
                {/* <div className='vl-list'></div> */}
                <div className='chart-status'>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='md text-black'>{open.value}</h1>
                                    <div>
                                        {/* <div className='icon-ticket gap-2' style={{color: dataOpen.activity[openColor]}}> */}
                                        <div className='icon-ticket gap-2'>
                                            <h1 className='md2'><Icon icon="ion:log-in-outline" /></h1>
                                            <h1 className='md2'><Svgbiru fill="blue" /></h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end align-items-center gap-2 my-1'>
                                                    <h3 className='text-start'>Open</h3>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-blue' >
                                                        <p className='sm'>List Ticket</p>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className='menu-dropdown-table-ticket'>
                                                        <div className='table-list-ticket px-5'>
            <div className='filtering-table-dropdown-ticket px-3 my-3'>
                <div className='d-flex align-items-center gap-5'>
                 <Form.Group className='select-date' controlId="sd">
                    <Form.Label><p className='nw'><Icon icon="bx:calendar" /> Start Date</p></Form.Label>
                    {/* <Form.Control type="date" name="sd" placeholder="Start Date" /> */}
                            <br/>
          <input
          type="date"
          className='ms-3'
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
          type="date"
          className='ms-3'
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
                    <th>Prioritas</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody className='page-ticket-bottom-tbody'>
                {filteredTicketOpen.map((item, index) => {
  const startTime = new Date(item.start_time);
  const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);

  // Calculate the time remaining
  const currentTime = new Date();
  const timeRemaining = endTime.getTime() - currentTime.getTime();

  // Convert timeRemaining to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

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
            <p>{item.range_time}</p>
            <p>{formatDateLong(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>
            <p className='text-red'>{getTimeFromData(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>

            {/* <p>{new Date(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000).toLocaleString()}</p> */}
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
        </tr>
  );
})}
                </tbody>
            </Table>
            </div>
                            </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                <div className='hr-main text-black my-2'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span>{openlow}</span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>{openmedium}</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>{openhigh}</span></p>
                                </div>
                    </div>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='md text-black'>{Proses.value}</h1>
                                    <div className='text-lime'>
                                        <div className='icon-ticket gap-2'>
                                            <h1><Icon icon="clarity:process-on-vm-line" /></h1>
                                                <Svghijau fill="blue" />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end align-items-center gap-2 my-1'>
                                                    <h3 className='text-start'>Process</h3>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-lime' >
                                                        <p className='sm'>List Ticket</p>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className='menu-dropdown-table-ticket'>
                                                        <div className='table-list-ticket px-5'>
            <div className='filtering-table-dropdown-ticket px-3 my-3'>
                <div className='d-flex align-items-center gap-5'>
                 <Form.Group className='select-date' controlId="sd">
                    <Form.Label><p className='nw'><Icon icon="bx:calendar" /> Start Date</p></Form.Label>
                    {/* <Form.Control type="date" name="sd" placeholder="Start Date" /> */}
                            <br/>
          <input
          type="date"
          className='ms-3'
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
          type="date"
          className='ms-3'
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
                    <th>Prioritas</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody className='page-ticket-bottom-tbody'>
                {filteredTicketProcess.map((item, index) => {
  const startTime = new Date(item.start_time);
  const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);

  // Calculate the time remaining
  const currentTime = new Date();
  const timeRemaining = endTime.getTime() - currentTime.getTime();

  // Convert timeRemaining to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

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
            <p>{item.range_time}</p>
            <p>{formatDateLong(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>
            <p className='text-red'>{getTimeFromData(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>

            {/* <p>{new Date(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000).toLocaleString()}</p> */}
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
        </tr>
  );
})}
                </tbody>
            </Table>
            </div>
                            </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                <div className='hr-main text-black'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span>{processlow}</span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>{processmedium}</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>{processhigh}</span></p>
                                </div>
                    </div>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='md text-black'>{Done.value}</h1>
                                    <div className='text-cyan'>
                                        <div className='icon-ticket gap-2'>
                                            <h1><Icon icon="material-symbols:done" /></h1>
                                                <Svgcyan fill="blue" />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end align-items-center gap-2 my-1'>
                                                    <h3 className='text-start'>Done</h3>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-cyan' >
                                                        <p className='sm'>List Ticket</p>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className='menu-dropdown-table-ticket'>
                                                        <div className='table-list-ticket px-5'>
            <div className='filtering-table-dropdown-ticket px-3 my-3'>
                <div className='d-flex align-items-center gap-5'>
                 <Form.Group className='select-date' controlId="sd">
                    <Form.Label><p className='nw'><Icon icon="bx:calendar" /> Start Date</p></Form.Label>
                    {/* <Form.Control type="date" name="sd" placeholder="Start Date" /> */}
                            <br/>
          <input
          type="date"
          className='ms-3'
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
          type="date"
          className='ms-3'
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
                    <th>Prioritas</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody className='page-ticket-bottom-tbody'>
                {filteredTicketDone.map((item, index) => {
  const startTime = new Date(item.start_time);
  const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);

  // Calculate the time remaining
  const currentTime = new Date();
  const timeRemaining = endTime.getTime() - currentTime.getTime();

  // Convert timeRemaining to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

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
            <p>{item.range_time}</p>
            <p>{formatDateLong(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>
            <p className='text-red'>{getTimeFromData(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>

            {/* <p>{new Date(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000).toLocaleString()}</p> */}
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
        </tr>
  );
})}
                </tbody>
            </Table>
            </div>
                            </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                <div className='hr-main text-black'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span>{DoneLow}</span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>{DoneMedium}</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>{DoneHigh}</span></p>
                                </div>
                    </div>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='md text-black'>{Close.value}</h1>
                                    <div className='text-red'>
                                        <div className='icon-ticket gap-2'>
                                            <h1><Icon icon="jam:shield-close" /></h1>
                                                <Svgmerah fill="blue" />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end align-items-center gap-2 my-1'>
                                                    <h3 className='text-start'>Closed</h3>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-red' >
                                                        <p className='sm'>List Ticket</p>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className='menu-dropdown-table-ticket'>
                                                        <div className='table-list-ticket px-5'>
            <div className='filtering-table-dropdown-ticket px-3 my-3'>
                <div className='d-flex align-items-center gap-5'>
                 <Form.Group className='select-date' controlId="sd">
                    <Form.Label><p className='nw'><Icon icon="bx:calendar" /> Start Date</p></Form.Label>
                    {/* <Form.Control type="date" name="sd" placeholder="Start Date" /> */}
                            <br/>
          <input
          type="date"
          className='ms-3'
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
          type="date"
          className='ms-3'
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
                    <th>Prioritas</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody className='page-ticket-bottom-tbody'>
                {filteredTicketClosed.map((item, index) => {
  const startTime = new Date(item.start_time);
  const endTime = new Date(startTime.getTime() + item.range_time * 60 * 60 * 1000);

  // Calculate the time remaining
  const currentTime = new Date();
  const timeRemaining = endTime.getTime() - currentTime.getTime();

  // Convert timeRemaining to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

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
            <p>{item.range_time}</p>
            <p>{formatDateLong(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>
            <p className='text-red'>{getTimeFromData(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000)}</p>

            {/* <p>{new Date(new Date(item.start_time).getTime() + item.range_time * 60 * 60 * 1000).toLocaleString()}</p> */}
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
        </tr>
  );
})}
                </tbody>
            </Table>
            </div>
                            </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                <div className='hr-main text-black'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span>{closedlow}</span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>{closedmedium}</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>{closedhigh}</span></p>
                                </div>
                    </div>
                </div>
            </div>

            <div className='page-ticket-chart mt-5'>
                <Row>
                    <Col sm={6}><ChartHari /></Col>
                    <Col sm={6}><ChartBulan /></Col> 
                    <Col sm={12}><ChartProvinsi /></Col>
                </Row>
                
            </div>
            </div>
      )}
    </div>
        
    )
}

export default PageTicket
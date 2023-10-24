import '../Css/Pages/PageTracking.css';
import '../Css/Parts/Font.css'; 

import Maps from '../Parts/Marker2'
// import Filter from '../Parts/Filter'
import LogoPatra from '../Images/Logo-Prima.png';

import {Dropdown, Form,  FormControl, Button, Row, Col} from 'react-bootstrap';

// ICONIFY
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DateTime from '../Parts/DateTime';
import Loading from '../Parts/Loading';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'bootstrap/dist/css/bootstrap.min.css';

import NothingHaveToken from '../Parts/NothingHaveToken';

function Tracking({ filters }) {
  NothingHaveToken()

    const [loading, setLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

// T I C K E T
const [Ticket, setTicket,] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
  const [SearchResults1, setSearchResults1] = useState([]);
  const [SearchResults2, setSearchResults2] = useState([]);


// D R I V E R
const [Driver, setDriver,] = useState([]);

useEffect(() => {
  const token = sessionStorage.getItem("jwttoken");
  axios.get(`${process.env.REACT_APP_API_URL}api/dashboard/tracking`, { headers: {"Authorization" : `Bearer ${token}`} })
  .then((result) => {
    console.log('TICKETT WOIIIIIIIIIII', result.data.data);
    setTicket(result.data.data ?? 0);
    setLoading(false);
  })
  .catch((error) => {
    console.log(error)
setLoading(false);});
}, []);

// let byTicketId = Ticket.filter(item => item.ticket_id);
let byTicketId;
if (Array.isArray(Ticket)) {
  byTicketId = Ticket.filter(item => item.ticket_id);
} else {
  byTicketId = []; // or set to any default value you prefer
}
let byDriverId;
if (Array.isArray(Ticket)) {
  byDriverId = Ticket.filter(item => item.driver_id);
} else {
  byDriverId = []; // or set to any default value you prefer
}
console.log(byTicketId)
console.log(byDriverId)

const [filterDriver, setfilterDriver] = useState({
  online: true,
  offline: true,
});
const handleCheckboxChangeDriver = (status) => {
  setfilterDriver({
    ...filterDriver,
    [status]: !filterDriver[status],
  });
};
const [search, setSearch] = useState('');
// const onlineCheckbox = document.getElementById('onlineCheckbox');
// const offlineCheckbox = document.getElementById('offlineCheckbox');
// SEARCH TIKET
// Filter data for the first tab based on the search query

let filteredData1 = [];
let filteredData2  = [];
if (byTicketId) {
  filteredData1 = byTicketId.filter((item) => {
    if (item.subject !== null) {
      if (search && !item.subject.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    } else {
      console.error('yourVariable is null');
    }
  });
} else {
  console.error('byTicketId is null');
}
const [onlineCheckbox, setOnlineCheckbox] = useState(false);
  const [offlineCheckbox, setOfflineCheckbox] = useState(false);
if (byDriverId) {
  filteredData2 = byDriverId.filter((item) => {
    if (item.name !== null) {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
       }
      
      if (onlineCheckbox && item.status !== 'online') {
        return false;
      }
  
      if (offlineCheckbox && item.status !== 'offline') {
        return false;
      }
       return true;
    } else {
      console.error('yourVariable is null');
    }
  });
} else {
  console.error('byTicketId is null');
}

  



// PAGINATION
// Sample data (you can replace this with your actual data)
  let ticketIdData = filteredData1;
  let DriverIdData = filteredData2;
  // Pagination variables
  const itemsPerPage = 8; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Slice the data to display only the items for the current page
  const paginatedTicket = ticketIdData.slice(startIndex, endIndex);
  const paginatedDriver = DriverIdData.slice(startIndex, endIndex);
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const [filterOptions, setFilterOptions] = useState({
    open: true,
    forwarding: true,
    process: true,
    done: true,
    reopen: true,
    closed: true,
    online: true,
    offline: true,
  });
  

  const handleCheckboxChange = (status) => {
    setFilterOptions({
      ...filterOptions,
      [status]: !filterOptions[status],
    });
  };
  

  const maxWordsPerLine = 1;
  const trackingSubject = {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: maxWordsPerLine,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.2', // Adjust line height as needed
  };

  const [dataToSend, setDataToSend] = useState();

  const handleItemClick = (id_param) => {
    // Handle the click event with the id parameter
    console.log(`Item clicked with id ${id_param}`);
    // You can perform any action you want with the id here.
    setDataToSend(id_param);
  };

   // SHOW HIDE ELEMENT
   const [isElementVisible, setElementVisible] = useState(false);

   const toggleElement = () => {
     setElementVisible(!isElementVisible);
   };
 

console.log('data filter',filteredData2)
console.log('PAGINATEDDDDDDDD', paginatedTicket)

const formatDateLong = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const getTimeFromData = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString();
  };

    return (
        <div>
      {loading ? (
        <Loading/>
      ) : (
        <div className='PageTracking'>
            <div className='track-maps'>
                <Maps data={dataToSend} />
            </div>
            <div className='track-filter text-end'>
                <div className='text-white'>
                    <DateTime/>
                </div>
            <Dropdown drop="start">
                <Dropdown.Toggle className='dropdown-filter-tracking'>
                <h1><Icon icon="ion:filter" className='filter-button' /></h1>
                </Dropdown.Toggle>

                <Dropdown.Menu className='menu-dropdown-tracking px-4'>
                    <div className='filter-header d-flex align-items-end justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <p><Icon icon="mdi:filter" /></p>
                            <p>Filter</p>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <img className='LogoPatraTracking' src={LogoPatra} alt="LogoPatra" />
                        </div>
                    </div>
                    <hr />
                    <Form className='my-4'>
                    <div className="filter-component">
        <label className='d-flex gap-2'>
          <input
            type="checkbox"
            checked={filterOptions.open}
            onChange={() => handleCheckboxChange('open')}
          />
          <p>open</p>
        </label>
        <label className='d-flex gap-2'>
          <input
            type="checkbox"
            checked={filterOptions.forwarding}
            onChange={() => handleCheckboxChange('forwarding')}
          />
          <p>forwarding</p>
        </label>

        <label className='d-flex gap-2'>
          <input
            type="checkbox"
            checked={filterOptions.process}
            onChange={() => handleCheckboxChange('process')}
          />
          <p>process</p>
        </label>

        <label className='d-flex gap-2'>
          <input
            type="checkbox"
            checked={filterOptions.done}
            onChange={() => handleCheckboxChange('done')}
          />
          <p>done</p>
        </label>
        <label className='d-flex gap-2'>
          <input
            type="checkbox"
            checked={filterOptions.reopen}
            onChange={() => handleCheckboxChange('reopen')}
          />
          <p>reopen</p>
        </label>

        <label className='d-flex gap-2'>
          <input
            type="checkbox"
            checked={filterOptions.closed}
            onChange={() => handleCheckboxChange('closed')}
          />
          <p>closed</p>
        </label>
      </div>
                    </Form>
                    <Form className='my-4'>
                    <label className='d-flex gap-2'>
                      <input
                        type="checkbox"
                        id="onlineCheckbox"
                        checked={onlineCheckbox}
                        onChange={() => setOnlineCheckbox(!onlineCheckbox)}
                      />
                      <p>online</p>
                    </label>
                    <label className='d-flex gap-2'>
                      <input
                        type="checkbox"
                        id="offlineCheckbox"
                        checked={offlineCheckbox}
                        onChange={() => setOfflineCheckbox(!onlineCheckbox)}
                      />
                      <p>offline</p>
                    </label>
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
            </Dropdown>
            </div>
           <button onClick={toggleElement} className='button-show-hide'>
            {isElementVisible ? (
              <>
                <Icon icon="ep:arrow-down-bold" />
              </>
            ) : (
              <>
                <Icon icon="ep:arrow-up-bold" />
              </>
            )}
          </button>
            {isElementVisible && (
              <div className={`list-ticket-driver ${isElementVisible ? 'active' : ''}`}>
              <div className='header-list-td'>
                  <img className='LogoPatraBottom' src={LogoPatra} alt="LogoPatra" />
                  <p className='xl text-blue fwb'>LIST TICKET & DRIVER</p>
                  <Form className='search-bottom d-flex align-items-center'>
                      <Button className='icon'><Icon icon="ri:search-line" /></Button>
                      <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="icon2 mr-sm-2"
                      />
                  </Form>
              </div>
              <hr className='hr-bottom' />
              
              <Tabs className='justify-content-center' defaultActiveKey="Ticket" id="navigation-ticket-driver">
            <Tab eventKey="Ticket" title="Ticket">
            <Row>
              <div id="map">
                  <div class="marker" data-lat="40.7128" data-lng="-74.0060">
                      <svg class="marker-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      </svg>
                  </div>
              </div>
              {paginatedTicket.map((item) => (
                <Col sm={3} className='px-3 py-2' key={item.ticket_id} onClick={() => handleItemClick(`s${item.ticket_id}`)} style={{
                    display:  
                    filterOptions[item.activity_name ? item.activity_name : '-' || item.status ? item.status : '-'] ? 'block' : 'none',
                    }} data-status={item.activity?.name ? item.activity.name : item.status}>
                  <div className='col-item d-flex align-items-start gap-4'>
                        <h1 style={{fill: item.activity ? item.activity.color : '-'}} className='fwb d-flex align-items-start mt-2' dangerouslySetInnerHTML={{ __html: item.icon }}></h1>
                        <div className='subject-tracking-parent'>
                            <p className='xl fwb tg2 subject-tracking'>{item.subject}</p>
                            <p className='md2'>{formatDateLong(item.created_at)}  {getTimeFromData(item.created_at)}</p>
                            <div className='parent-status px-2 py-1' style={{backgroundColor: item.activity_color}}>
                              <p className='xl fwb' >{item.activity_name}</p>
                            </div>
                        </div>
                    </div>
                </Col>
              ))}
              </Row>
              <hr className='hr-bottom' />
              <div className='pagination-tracking mt-3'>
                  <nav className='d-flex justify-content-center'>
                      <ul className="pagination">
                      {Array.from({ length: Math.ceil(byTicketId.length / itemsPerPage) }).map((_, index) => (
                          <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                              {index + 1}
                          </button>
                          </li>
                      ))}
                      </ul>
                  </nav>
              </div>
            </Tab>
            <Tab eventKey="Driver" title="Driver">
            <Row>
              <div id="map">
                  <div class="marker" data-lat="40.7128" data-lng="-74.0060">
                      <svg class="marker-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      </svg>
                  </div>
              </div>
              {paginatedDriver.filter((item) => {
            if (onlineCheckbox && item.status !== 'online') {
              return false;
            }
            if (offlineCheckbox && item.status !== 'offline') {
              return false;
            }
            return true;
          }).map((item) => (
                <Col sm={3} className='px-3 py-2' key={item.driver_id} onClick={() => handleItemClick(`d${item.driver_id}`)} style={{
                    display:  
                    filterOptions[item.activity ? item.activity.name : '-' || item.status ? item.status : '-'] ? 'block' : 'none',
                    }} data-status={item.activity?.name ? item.activity.name : item.status}>
                  <div className='col-item d-flex align-items-start gap-4'>
                        <h1 style={{fill: item.activity ? item.activity.color : '-'}} className='fwb d-flex align-items-start mt-2' dangerouslySetInnerHTML={{ __html: item.icon }}></h1>
                        <div className='subject-tracking-parent'>
                            <p className='xl fwb tg2 subject-tracking'>{item.name}</p>
                            <p className='md2'>{formatDateLong(item.created_at)}  {getTimeFromData(item.created_at)}</p>
                            <div className='online-speed d-flex align-items-center gap-3'>
                            {item.status === 'online' ? (
                              <div className='circle-status bg-lime'></div>
                            ) : (
                              <div className='circle-status bg-red'></div>
                            )}
                              <h2><Icon icon="fontisto:motorcycle" /></h2>
                              <h2><Icon icon="fa-solid:parking" /></h2>
                              <h2><Icon icon="ic:round-wifi" /></h2>
                            </div>
                        </div>
                    </div>
                </Col>
              ))}
              </Row>
              <hr className='hr-bottom' />
              <div className='pagination-tracking mt-3'>
                  <nav className='d-flex justify-content-center'>
                      <ul className="pagination">
                      {Array.from({ length: Math.ceil(byDriverId.length / itemsPerPage) }).map((_, index) => (
                          <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                              {index + 1}
                          </button>
                          </li>
                      ))}
                      </ul>
                  </nav>
              </div>
            </Tab>
          </Tabs>
            
          </div>
            )}
            
        </div>
      )}
    </div>
        
    )
}

export default Tracking
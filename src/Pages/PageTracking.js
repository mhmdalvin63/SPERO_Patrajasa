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



function Tracking({ filters }) {

    const [loading, setLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

// T I C K E T
const [Ticket, setTicket,] = useState([]);

// D R I V E R
const [Driver, setDriver,] = useState([]);

useEffect(() => {
  const token = sessionStorage.getItem("jwttoken");
  axios.get('https://apipatra.spero-lab.id/api/dashboard/tracking', { headers: {"Authorization" : `Bearer ${token}`} })
  .then((result) => {
    console.log('TICKETT WOIIIIIIIIIII', result.data.data);
    setTicket(result.data.data);
    setLoading(false);
  })
  .catch((error) => {
    console.log(error)
setLoading(false);});
}, []);

// const mergedData = {...Ticket, ...Driver};
// console.log('DATA GABUNGANNNN', mergedData)

// const mergeData = mergeData(data1, data2);

// PAGINATION
// Sample data (you can replace this with your actual data)
  const allData = Ticket;
  // Pagination variables
  const itemsPerPage = 8; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Slice the data to display only the items for the current page
  const paginatedData = allData.slice(startIndex, endIndex);
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // console.log('PAGINATEDDDDDDDD', paginatedData)

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
  const [filterDriver, setfilterDriver] = useState({
    online: true,
    offline: true,
  });

  const handleCheckboxChange = (status) => {
    setFilterOptions({
      ...filterOptions,
      [status]: !filterOptions[status],
    });
  };
  const handleCheckboxChangeDriver = (status) => {
    setfilterDriver({
      ...filterDriver,
      [status]: !filterDriver[status],
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
                        checked={filterDriver.online}
                        onChange={() => handleCheckboxChangeDriver('online')}
                      />
                      <p>online</p>
                    </label>
                    <label className='d-flex gap-2'>
                      <input
                        type="checkbox"
                        checked={filterDriver.offline}
                        onChange={() => handleCheckboxChangeDriver('offline')}
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
            <div className='list-ticket-driver'>
                <div className='header-list-td'>
                    <img className='LogoPatraBottom' src={LogoPatra} alt="LogoPatra" />
                    <p className='xl text-blue fwb'>LIST TICKET & DRIVER</p>
                    <Form className='search-bottom d-flex align-items-center'>
                        <Button className='icon'><Icon icon="ri:search-line" /></Button>
                        <FormControl type="text" placeholder="Search" className="icon2 mr-sm-2" />
                    </Form>
                </div>
                <hr className='hr-bottom' />
                <Row>
                <div id="map">
                    <div class="marker" data-lat="40.7128" data-lng="-74.0060">
                        <svg class="marker-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        </svg>
                    </div>
                </div>
                {paginatedData.map((item) => (
                  <Col sm={3} className='px-3 py-2' key={item.ticket_id} onClick={() => handleItemClick(item.ticket_id)} style={{
                      display:  
                      filterOptions[item.activity ? item.activity.name : '-' || item.status ? item.status : '-'] ? 'block' : 'none',
                      }} data-status={item.activity?.name ? item.activity.name : item.status}>
                    <div className='col-item d-flex align-items-start gap-4'>
                          <h1 style={{fill: item.activity ? item.activity.color : '-'}} className='fwb d-flex align-items-start mt-2' dangerouslySetInnerHTML={{ __html: item.icon }}></h1>
                          <div className='subject-tracking-parent'>
                              <p className='xl fwb tg2 subject-tracking'>{item.subject}</p>
                              <p className='md2'>{item.created_at}</p>
                                <p className='xl fwb' style={{color: item.activity ? item.activity.color : '-'}}>{item.activity ? item.activity.name : '-'}</p>
                          </div>
                      </div>
                  </Col>
                ))}
                </Row>
                <hr className='hr-bottom' />
                <div className='pagination-tracking mt-3'>
                    <nav className='d-flex justify-content-center'>
                        <ul className="pagination">
                        {Array.from({ length: Math.ceil(allData.length / itemsPerPage) }).map((_, index) => (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                            </li>
                        ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
      )}
    </div>
        
    )
}

export default Tracking
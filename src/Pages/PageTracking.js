import '../Css/Pages/PageTracking.css';
import '../Css/Parts/Font.css'; 

import Maps from '../Parts/MapsMarker'
import LogoPatra from '../Images/Logo-Prima.png';

import {Dropdown, Form,  FormControl, Button, Row, Col} from 'react-bootstrap';




// ICONIFY
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DateTime from '../Parts/DateTime';



function Tracking() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
    };
    let status = ['Open', 'Proses', 'Closed', 'Forwarding', 'Done', 'Re-Open']
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
    

// T I C K E T
const [Ticket, setTicket,] = useState([]);

// D R I V E R
const [Driver, setDriver,] = useState([]);

useEffect(() => {
  const token = sessionStorage.getItem("jwttoken");
  axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
  .then((result) => {
    console.log('TICKETT WOIIIIIIIIIII', result.data.data);
    setTicket(result.data.data);
  })
  .catch((error) => console.log(error));

   axios.get('https://apipatra.spero-lab.id/api/dashboard/driver', { headers: {"Authorization" : `Bearer ${token}`} })
    .then((result) => {
      console.log('driverrrrrrrrrrrrrrrrrrrrrrrrrrrrr', result.data.data.drivers);
      setDriver(result.data.data.drivers);
    })
    .catch((error) => console.log(error));
}, []);

const mergedData = {...Ticket, ...Driver};
console.log('DATA GABUNGANNNN', mergedData)

// const mergeData = mergeData(data1, data2);

// PAGINATION
// Sample data (you can replace this with your actual data)
  const allData = Ticket;
  // Pagination variables
  const itemsPerPage = 12; // Number of items to display per page
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

    


    return (
        <div className='PageTracking'>
            <div className='track-maps'>
                <Maps />
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
                        {listStatusFilter}
                    </Form>
                    <Form className='my-4'>
                        {listStatusDriverFilter}
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
                    {/* <h1>13.27 54%</h1> */}
                    <Form className='search-bottom d-flex align-items-center'>
                        <Button className='icon'><Icon icon="ri:search-line" /></Button>
                        <FormControl type="text" placeholder="Search" className="icon2 mr-sm-2" />
                    </Form>
                </div>
                <hr className='hr-bottom' />
                <Row>
                {paginatedData.map((item, index) => (
                    <Col sm={3} className='px-3 py-2' key={index}>
                        <div className='col-item d-flex align-items-start gap-3'>
                            <h1 className='fwb text-blue d-flex align-items-start'><Icon icon="ion:log-in-outline" /></h1>
                            <div>
                                <p className='xl fwb tg2'>{item.ticket_code}</p>
                                <p className='md2'>11/09/2023</p>
                                <p className='xl fwb' style={{color: item.activity.color}}>{item.activity.name}</p>
                            </div>
                        </div>
                    </Col>
                ))}
                
                {/* {Driver.map((item, index) => (
                    <Col sm={3} className='px-3 py-2' key={index}>
                        <div className='col-item d-flex align-items-start gap-3'>
                            <h1 className='fwb text-blue d-flex align-items-start'><Icon icon="ion:log-in-outline" /></h1>
                            <div>
                                <p className='xl fwb tg2'>{item.name}</p>
                                <p className='md2'>11/09/2023</p>
                                <p className='xl fwb'>{item.id}</p>
                            </div>
                        </div>
                    </Col>
                ))} */}
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
    )
}

export default Tracking
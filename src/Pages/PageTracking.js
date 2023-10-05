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
      setDriver(result.data.data);
    })
    .catch((error) => console.log(error));
}, []);

// const mergeData = mergeData(data1, data2);


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
                    <p>LIST TICKET & DRIVER</p>
                    <Form className='search-bottom d-flex align-items-center'>
                        <Button className='icon'><Icon icon="ri:search-line" /></Button>
                        <FormControl type="text" placeholder="Search" className="icon2 mr-sm-2" />
                    </Form>
                </div>
                <hr className='hr-bottom' />
                <Row>
                    <Col sm={3} className='p-3'>
                        <div className='col-item d-flex align-items-start gap-2'>
                            <h1 className='fwb text-blue d-flex align-items-start'><Icon icon="ion:log-in-outline" /></h1>
                            <div>
                                <p className='md fwb'>Nama Ticket</p>
                                <p className='xs'>11/09/2023</p>
                                <p className='md fwb'>Open</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Tracking
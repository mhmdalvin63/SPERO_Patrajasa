import '../Css/Pages/PageTracking.css';
import '../Css/Parts/Font.css'; 

import Maps from '../Parts/MapsMarker'
import LogoPatra from '../Images/Logo-Prima.png';

import {Dropdown, Form,  FormControl, Button, Row, Col} from 'react-bootstrap';




// ICONIFY
import { Icon } from '@iconify/react';
import { useState } from 'react';



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
    



    return (
        <div className='PageTracking'>
            <div className='track-maps'>
                <Maps />
            </div>
            <div className='track-filter text-end'>
                <h1 className='text-white'>6 Oktober 2023</h1>
                <p className='my-2 text-white'>13:45 WIB</p>
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
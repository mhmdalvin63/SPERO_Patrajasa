import '../Css/Pages/PageTicket.css';
import '../Css/Parts/Font.css'; 

import LogoPatra from '../Images/Logo-Prima.png';
import {Dropdown, Form,  FormControl, Button, Row, Col} from 'react-bootstrap';

import { Icon } from '@iconify/react';

import {Table} from 'react-bootstrap';


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
import axios from 'axios';



function PageTicket() {

      // T I C K E T   S U M M A R Y
  const [posts, setPosts] = useState([]);
  const [priority, setPriority] = useState([]);
  const [open, setOpen] = useState([]);
  const [Forwarding, setForwarding] = useState([]);
  const [Proses, setProses] = useState([]);
  const [Reopen, setReopen] = useState([]);
  const [Done, setDone] = useState([]);
  const [Close, setClose] = useState([]);
    useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
     axios.get('https://apipatra.spero-lab.id/api/ticket/summary', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        console.log('DATAAAAAAAAAAAAAAAAA', result.data.data);
        setPosts(result.data.data);
        setPriority(result.data.data.total_priority);
        setOpen(result.data.data.status.open);
        setForwarding(result.data.data.status.forwarding);
        setProses(result.data.data.status.process);
        setReopen(result.data.data.status.reopen);
        setDone(result.data.data.status.done);
        setClose(result.data.data.status.closed);
      })
      .catch((error) => console.log(error));
  }, []);
  let DonePriority = Done;
  console.log(DonePriority)
//   END TICKET SUMMARY

// CHECKBOX FILTER
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
    let kategori = ['Kategori 1', 'Kategori 2']
    let listKategoriFilter = kategori.map((index)=>
        <Form.Check
        key={index}
        type="checkbox"
        label= {index}
        id="myCheckbox"
        checked={isChecked.index}
        onChange={handleCheckboxChange}
        />
    )
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

    return (
        <div className='PageTicket'>
            <div className='main-new-header px-5 pt-2'>
                <div className='header-logo-prima pt-2'>
                    <img className='LogoPatra mt-2' src={LogoPatra} alt="LogoPatra" />
                </div>
                <div className='track-filter text-end'>
                    <h1 className='text-black'>6 Oktober 2023</h1>
                    <p className='my-2 text-black'>13:45 WIB</p>
                    <div className='d-flex gap-4 justify-content-end align-items-end'>
                        <Dropdown drop="down">
                            <Dropdown.Toggle className='dropdown-table-ticket'>
                            <p className='text-blue'>Table Ticket</p>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='menu-dropdown-table-ticket'>
                                <div className='filtering-table-dropdown-ticket px-3 my-3'>
                                    <Form.Group className='select-date' controlId="sd">
                                        <Form.Label><p className='nw'><Icon icon="bx:calendar" /> Start Date</p></Form.Label>
                                        <Form.Control type="date" name="sd" placeholder="Start Date" />
                                    </Form.Group>
                                    <Form.Group className='select-date' controlId="ed">
                                        <Form.Label><p className='nw'><Icon icon="bx:calendar" /> End Date</p></Form.Label>
                                        <Form.Control type="date" name="ed" placeholder="End Date" />
                                    </Form.Group>
                                    <Form.Group className='select-date' controlId="ed">
                                        <Form.Label><p className='nw'><Icon icon="material-symbols:border-all" /> Kategori</p></Form.Label>
                                        <Form.Select aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form className='search-bottom d-flex align-items-center'>
                                        <FormControl type="text" placeholder="Search" className="icon2 mr-sm-2" />
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
            <tbody id='page-ticket-bottom-tbody'>
                <tr className='text-center'>
                  <td>1</td>
                  <td>1234</td>
                  <td>Tukar Armada</td>
                  <td>
                    <p>12 Sept’ 2023</p>
                    <p className='text-red'>11 : 14 WIB</p>
                  </td>
                  <td>
                    <p>12 Sept’ 2023</p>
                    <p className='text-red'>11 : 14 WIB</p>
                  </td>
                  <td className='text-blue'>
                    <p>Kategori 1</p>
                  </td>
                  <td className='text-blue'>
                    <p>Forwarding</p>
                  </td>
                </tr>
            </tbody>
                            </Table>
                            </Dropdown.Menu>
                        </Dropdown>
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
                                    {listKategoriFilter}
                                </Form>
                                <Form className='my-4'>
                                    {listPriorityFilter}
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
                </div>
            </div>

            <div className='page-ticket-content d-flex justify-content-center  align-items-center px-5'>
                <div className='ticket-top'>
                    <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='md text-black'>{posts.total_ticket}</h1>
                                <div className='text-blue'>
                                    <div className='icon-ticket gap-2'>
                                        <h1 className='sm'><Icon icon="carbon:report" /></h1>
                                        <div>
                                            <Detakblue fill="blue" />
                                            <p className='text-start'>Ticket</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='hr-main text-black'></div>
                            <div className='lower-hr gap-2 text-black'>
                                <p>Low <span>{priority.low}</span></p>
                                <div className='vl'></div>
                                <p>Medium <span>{priority.medium}</span></p>
                                <div className='vl'></div>
                                <p>High <span>{priority.high}</span></p>
                            </div>
                    </div>
                </div>
                <div className='vl-list'></div>
                <div className='chart-status'>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='sm text-black'>{open.value}</h1>
                                    <div className='text-blue'>
                                        <div className='icon-ticket gap-2'>
                                            <h1><Icon icon="ion:log-in-outline" /></h1>
                                                <Svgbiru fill="blue" />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end gap-2 my-1'>
                                                    <p className='text-start'>Open</p>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-blue' >
                                                        <p className='sm'>List Ticket</p>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className='menu-dropdown-table-ticket'>
                                <div className='filtering-table-dropdown-ticket px-3 my-3'>
                                    <Form.Group className='select-date' controlId="sd">
                                        <Form.Label><p className='nw'><Icon icon="bx:calendar" /> Start Date</p></Form.Label>
                                        <Form.Control type="date" name="sd" placeholder="Start Date" />
                                    </Form.Group>
                                    <Form.Group className='select-date' controlId="ed">
                                        <Form.Label><p className='nw'><Icon icon="bx:calendar" /> End Date</p></Form.Label>
                                        <Form.Control type="date" name="ed" placeholder="End Date" />
                                    </Form.Group>
                                    <Form.Group className='select-date' controlId="ed">
                                        <Form.Label><p className='nw'><Icon icon="material-symbols:border-all" /> Kategori</p></Form.Label>
                                        <Form.Select aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form className='search-bottom d-flex align-items-center'>
                                        <FormControl type="text" placeholder="Search" className="icon2 mr-sm-2" />
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
            <tbody id='page-ticket-bottom-tbody'>
                <tr className='text-center'>
                  <td>1</td>
                  <td>1234</td>
                  <td>Tukar Armada</td>
                  <td>
                    <p>12 Sept’ 2023</p>
                    <p className='text-red'>11 : 14 WIB</p>
                  </td>
                  <td>
                    <p>12 Sept’ 2023</p>
                    <p className='text-red'>11 : 14 WIB</p>
                  </td>
                  <td className='text-blue'>
                    <p>Kategori 1</p>
                  </td>
                  <td className='text-blue'>
                    <p>Forwarding</p>
                  </td>
                </tr>
            </tbody>
                            </Table>
                            </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                <div className='hr-main text-black'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span>7</span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>5</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>5</span></p>
                                </div>
                    </div>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='sm text-black'>{Forwarding.value}</h1>
                                    <div className='text-yellow'>
                                        <div className='icon-ticket gap-2'>
                                            <h1><Icon icon="material-symbols:forward" /></h1>
                                                <Svgkuning fill="blue" />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end gap-2 my-1'>
                                                    <p className='text-start'>Forward</p>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-blue' >
                                                        <p className='sm'>List Ticket</p>
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
                                <div className='hr-main text-black'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span>7</span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>5</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>5</span></p>
                                </div>
                    </div>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='sm text-black'>{Proses.value}</h1>
                                    <div className='text-lime'>
                                        <div className='icon-ticket gap-2'>
                                            <h1><Icon icon="clarity:process-on-vm-line" /></h1>
                                                <Svghijau fill="blue" />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end gap-2 my-1'>
                                                    <p className='text-start'>Process</p>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-blue' >
                                                        <p className='sm'>List Ticket</p>
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
                                <div className='hr-main text-black'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span>7</span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>5</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>5</span></p>
                                </div>
                    </div>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='sm text-black'>{Reopen.value}</h1>
                                    <div className='text-purple'>
                                        <div className='icon-ticket gap-2'>
                                            <h1><Icon icon="material-symbols:reopen-window" /></h1>
                                                <Svgungu fill="blue" />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end gap-2 my-1'>
                                                    <p className='text-start'>Re-Open</p>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-blue' >
                                                        <p className='sm'>List Ticket</p>
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
                                <div className='hr-main text-black'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span>7</span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>5</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>5</span></p>
                                </div>
                    </div>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='sm text-black'>{Done.value}</h1>
                                    <div className='text-cyan'>
                                        <div className='icon-ticket gap-2'>
                                            <h1><Icon icon="material-symbols:done" /></h1>
                                                <Svgcyan fill="blue" />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end gap-2 my-1'>
                                                    <p className='text-start'>Done</p>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-blue' >
                                                        <p className='sm'>List Ticket</p>
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
                                <div className='hr-main text-black'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span>7</span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>5</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>5</span></p>
                                </div>
                    </div>
                    <div className='header-total-ticket'>
                                <div className='upper-hr align-items-start gap-3'>
                                    <h1 className='sm text-black'>{Close.value}</h1>
                                    <div className='text-red'>
                                        <div className='icon-ticket gap-2'>
                                            <h1><Icon icon="jam:shield-close" /></h1>
                                                <Svgmerah fill="blue" />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end gap-2 my-1'>
                                                    <p className='text-start'>Closed</p>
                                                    <Dropdown drop="down">
                                                        <Dropdown.Toggle className='dropdown-list-ticket bg-blue' >
                                                        <p className='sm'>List Ticket</p>
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
                                <div className='hr-main text-black'></div>
                                <div className='lower-hr gap-2 text-black'>
                                    <p>Low <span></span></p>
                                    <div className='vl'></div>
                                    <p>Medium <span>5</span></p>
                                    <div className='vl'></div>
                                    <p>High <span>5</span></p>
                                </div>
                    </div>
                </div>
            </div>

            <div className='page-ticket-chart mt-5'>
                <Row>
                    <Col sm={6}><ChartHari /></Col>
                    <Col sm={6}><ChartBulan /></Col> 
                    <Col sm={12}><ChartHari /></Col>
                </Row>
                
            </div>
        </div>
    )
}

export default PageTicket
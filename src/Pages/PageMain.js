import '../Css/Pages/PageMain.css';
import '../Css/Parts/Font.css'; 

import SvgMaps from '../Parts/SvgMaps'

import Table from 'react-bootstrap/Table';

import DateTime from '../Parts/DateTime';

import LogoPatra from '../Images/Logo-Prima.png';

import Dropdown from 'react-bootstrap/Dropdown';

// import Detak from '../Images/detak.svg'
import { ReactComponent as Detak } from '../Images/detak.svg';
import { ReactComponent as Detakblue } from '../Images/detak-blue.svg';
import { ReactComponent as Detakred } from '../Images/detak-red.svg';
import { ReactComponent as Detakyellow } from '../Images/detak-yellow.svg';

// ICONIFY
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useState } from 'react';



function MainNew() {

    // T I C K E T   S U M M A R Y
  const [posts, setPosts] = useState([]);
  const [priority, setPriority] = useState([]);
  const [open, setOpen] = useState([]);
  const [Forwarding, setForwarding] = useState([]);
  const [Proses, setProses] = useState([]);
  const [Reopen, setReopen] = useState([]);
  const [Done, setDone] = useState([]);
  const [Close, setClose] = useState([]);
  
  // T I C K E T
  const [Ticket, setTicket] = useState([]);

  // D R I V E R
  const [Driver, setDriver] = useState([]);
  const [DriverList, setDriverList] = useState([]);
  
  // P R O C E S S   O W N E R
  const [Po, setPo] = useState([]);
  const [PoList, setPoList] = useState([]);

  // P R O C E S S   O W N E R
  const [Operator, SetOperator] = useState([]);


  // T I C K E T   S U M M A R Y
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

     axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log('DATAAAAAAAAAAAAAAAAA', result.data.data);
      })
      .catch((error) => console.log(error));

      axios.get('https://apipatra.spero-lab.id/api/dashboard/driver', { headers: {"Authorization" : `Bearer ${token}`} })
       .then((result) => {
         console.log('DRIVERRRRRR',result.data.data);
         setDriver(result.data.data.count);
         setDriverList(result.data.data.drivers)
         console.log(setDriverList);
       })
      //  .catch((error) => console.log(error));
       console.log(DriverList)

      axios.get('https://apipatra.spero-lab.id/api/dashboard/operator', { headers: {"Authorization" : `Bearer ${token}`} })
       .then((result) => {
         console.log('OPERATORRRR',result.data.data.operator);
         SetOperator(result.data.data.operator);
       })
      //  .catch((error) => console.log(error));
       console.log(DriverList)

     axios.get('https://apipatra.spero-lab.id/api/dashboard/process-owner', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log('PROSES OWNER COIIII',result.data.data);
        setPo(result.data.data);
        setPoList(result.data.data.process_owner)
      })
      .catch((error) => console.log(error));

     axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log(result.data.data);
        setTicket(result.data.data);
      })
      .catch((error) => console.log(error));
  }, []);


    return (
        <div className='PageMainNew'>
            <div className='main-new-header px-5'>
                <div className='header-logo-prima'>
                    <img className='LogoPatra' src={LogoPatra} alt="LogoPatra" />
                </div>
                <div className='header-total-ticket'>
                    <div className='text-end'>
                        <DateTime />
                    </div>
                    <div className='upper-hr-top gap-3'>
                        <h1 className='xl tg'>{posts.total_ticket}</h1>
                        <div>
                            <div className='icon-ticket-top gap-2 text-blue'>
                                <h1 className='md fwb mt-3'><Icon icon="carbon:report" /></h1>
                                <div>
                                <Detakblue className='detak' />
                                <p className='xl fwb700 tt'>Ticket</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='hr-main'></div>
                    <div className='lower-hr gap-3'>
                        <p className='xl text-blue'>Low <span className='fwb'>{priority.low}</span></p>
                        <div className='vl'></div>
                        <p className='xl text-lime'>Medium <span className='fwb'>{priority.medium}</span></p>
                        <div className='vl'></div>
                        <p className='xl text-red'>Height <span className='fwb'>{priority.high}</span></p>
                    </div>
                </div>
            </div>

            <div className='SvgMaps'>
                <SvgMaps />
            </div>

            <div className='main-new-bottom px-5'>
                <div className='main-new-bottom-left'>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='md fwb text-blue'><Icon icon="ion:log-in-outline" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{open.value}</h1>
                            <p className='xl'>Open</p>
                        </div>
                    </div>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='md fwb text-yellow'><Icon icon="material-symbols:forward" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Forwarding.value}</h1>
                            <p className='xl'>Forwarding</p>
                        </div>
                    </div>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='md fwb text-lime'><Icon icon="clarity:process-on-vm-line" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Proses.value}</h1>
                            <p className='xl'>Proses</p>
                        </div>
                    </div>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='md fwb text-purple'><Icon icon="material-symbols:reopen-window" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Reopen.value}</h1>
                            <p className='xl'>Re-Open</p>
                        </div>
                    </div>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='md fwb text-cyan'><Icon icon="material-symbols:done" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Done.value}</h1>
                            <p className='xl'>Done</p>
                        </div>
                    </div>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='md fwb text-red'><Icon icon="jam:shield-close" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Close.value}</h1>
                            <p className='xl'>Closed</p>
                        </div>
                    </div>
                </div>

                <div className='main-new-bottom-right gap-5'>
                <Dropdown className="dropup">
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Po.count}</h1>
                                <div className='text-lime'>
                                    <div className='icon-ticket gap-2'>
                                        <h1 className='md'><Icon icon="clarity:administrator-solid" /></h1>
                                        <Detak fill="blue" className='detak' />
                                    </div>
                                    <p className='text-start xl tt fwb700'>Proses Owner</p>
                                </div>
                            </div>
                            <div className='hr-main tg'></div>
                            <div className='lower-hr gap-3 tg'>
                                <p className='xl'>Online <span className='fwb700'>7</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>5</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-lime text-center text-white'>
                            <tr>
                            <th>Driver</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {PoList.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}>{item.name}</td>
                            <td className='text-center'>{new Date(item.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup">
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Driver.total}</h1>
                                <div className='text-red'>
                                    <div className='icon-ticket gap-2'>
                                        <h1 className='md'><Icon icon="game-icons:full-motorcycle-helmet" /></h1>
                                            <Detakred fill="blue"  className='detak'/>
                                    </div>
                                            <p className='text-center fwb700 tt xl'>Driver</p>
                                </div>
                            </div>
                            <div className='hr-main tg'></div>
                            <div className='lower-hr gap-3 tg'>
                                <p className='xl '>Online <span className='fwb700'>7</span></p>
                                <div className='vl'></div>
                                <p className='xl '>Offline <span className='fwb700'>5</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-red text-center text-white'>
                            <tr>
                            <th>Driver</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {DriverList.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}>{item.name}</td>
                            <td className='text-center'>{new Date(item.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                            
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup">
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>12</h1>
                                <div className='text-yellow'>
                                    <div className='icon-ticket gap-2'>
                                        <h1 className='md'><Icon icon="ic:round-support-agent" /></h1>
                                            <Detakyellow fill="blue"  className='detak'/>
                                    </div>
                                            <p className='text-center fwb700 tt xl'>Operator</p>
                                </div>
                            </div>
                            <div className='hr-main tg'></div>
                            <div className='lower-hr gap-3 tg'>
                                <p className='xl'>Online <span className='fwb700'>7</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>5</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-orange text-center text-white'>
                            <tr>
                            <th>Driver</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Operator.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}>{item.name}</td>
                            <td className='text-center'>{new Date(item.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default MainNew
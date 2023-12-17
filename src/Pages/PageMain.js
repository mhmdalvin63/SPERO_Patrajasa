import '../Css/Pages/PageMain.css';
import '../Css/Parts/Font.css'; 
import Pusher from 'pusher-js';

import SvgMaps from '../Parts/SvgMaps'

import Table from 'react-bootstrap/Table';

import DateTime from '../Parts/DateTime';

import SvgLogo from '../Parts/SvgLogo';

import Dropdown from 'react-bootstrap/Dropdown';

import { ReactComponent as Detak } from '../Images/detak.svg';
import { ReactComponent as Detakblue } from '../Images/detak-blue.svg';
import { ReactComponent as Detakred } from '../Images/detak-red.svg';
import { ReactComponent as Detakyellow } from '../Images/detak-yellow.svg';

import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 

// ICONIFY
import { Icon, _api } from '@iconify/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Parts/Loading';
// import { useState } from 'react';
import NothingHaveToken from '../Parts/NothingHaveToken';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainNew() {
    NothingHaveToken()
    const [loading, setLoading] = useState(true);

    // T I C K E T   S U M M A R Y
  const [posts, setPosts] = useState([]);
  const [priority, setPriority] = useState([]);
  const [open, setOpen] = useState([]);
  const [Proses, setProses] = useState([]);
  const [Done, setDone] = useState([]);
  const [Close, setClose] = useState([]);
    // T I C K E T   S U M M A R Y
  const [postsWeek, setPostsWeek] = useState([]);
  const [priorityWeek, setPriorityWeek] = useState([]);
  const [openWeek, setOpenWeek] = useState([]);
  const [ProsesWeek, setProsesWeek] = useState([]);
  const [DoneWeek, setDoneWeek] = useState([]);
  const [CloseWeek, setCloseWeek] = useState([]);
    // T I C K E T   S U M M A R Y
  const [postsMonth, setPostsMonth] = useState([]);
  const [priorityMonth, setPriorityMonth] = useState([]);
  const [openMonth, setOpenMonth] = useState([]);
  const [ProsesMonth, setProsesMonth] = useState([]);
  const [DoneMonth, setDoneMonth] = useState([]);
  const [CloseMonth, setCloseMonth] = useState([]);
    // T I C K E T   S U M M A R Y
  const [postsYear, setPostsYear] = useState([]);
  const [priorityYear, setPriorityYear] = useState([]);
  const [openYear, setOpenYear] = useState([]);
  const [ProsesYear, setProsesYear] = useState([]);
  const [DoneYear, setDoneYear] = useState([]);
  const [CloseYear, setCloseYear] = useState([]);
  
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
  const [OperatorCount, SetOperatorCount] = useState([]);


  // T I C K E T   S U M M A R Y
  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
    // URL API CUSTOM
    const currentURL = window.location.href;
    console.log('CURRENTTTTTTTTTTTTT:', currentURL);
    let urlApi;
    if (currentURL.includes('172.16.16.3:3000')) {
        urlApi = process.env.REACT_APP_API_URL_HTTP;
      } else {
        urlApi = process.env.REACT_APP_API_URL;
      }
    // const apiUrl = 

    const fetchData = async () => {
      try {
        const result = await axios.get(`${urlApi}api/ticket/summary?filter=day`, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(urlApi)
        setPosts(result.data.data.total_priority);
        setPriority(result.data.data.total_priority);
        setOpen(result.data.data.status.open);
        setProses(result.data.data.status.process);
        setDone(result.data.data.status.done);
        setClose(result.data.data.status.closed);

        const resultWeek = await axios.get(`${urlApi}api/ticket/summary?filter=week`, { headers: {"Authorization" : `Bearer ${token}`} })
        setPostsWeek(resultWeek.data.data.total_priority);
        setPriorityWeek(resultWeek.data.data.total_priority);
        setOpenWeek(resultWeek.data.data.status.open);
        setProsesWeek(resultWeek.data.data.status.process);
        setDoneWeek(resultWeek.data.data.status.done);
        setCloseWeek(resultWeek.data.data.status.closed);

        const resultMonth = await axios.get(`${urlApi}api/ticket/summary?filter=month`, { headers: {"Authorization" : `Bearer ${token}`} })
        setPostsMonth(resultMonth.data.data.total_priority);
        setPriorityMonth(resultMonth.data.data.total_priority);
        setOpenMonth(resultMonth.data.data.status.open);
        setProsesMonth(resultMonth.data.data.status.process);
        setDoneMonth(resultMonth.data.data.status.done);
        setCloseMonth(resultMonth.data.data.status.closed);

        const resultYear = await axios.get(`${urlApi}api/ticket/summary?filter=year`, { headers: {"Authorization" : `Bearer ${token}`} })
        setPostsYear(resultYear.data.data.total_priority);
        setPriorityYear(resultYear.data.data.total_priority);
        setOpenYear(resultYear.data.data.status.open);
        setProsesYear(resultYear.data.data.status.process);
        setDoneYear(resultYear.data.data.status.done);
        setCloseYear(resultYear.data.data.status.closed);

        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    };

    //  axios.get(process.env.REACT_APP_API_URL + 'api/ticket/summary?filter=day', { headers: {"Authorization" : `Bearer ${token}`} })
    //   .then((result) => {
    //     setPosts(result.data.data.total_priority);
    //     setPriority(result.data.data.total_priority);
    //     setOpen(result.data.data.status.open);
    //     setProses(result.data.data.status.process);
    //     setDone(result.data.data.status.done);
    //     setClose(result.data.data.status.closed);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     setLoading(false);
    // });

    //  axios.get(process.env.REACT_APP_API_URL + 'api/ticket/summary?filter=week', { headers: {"Authorization" : `Bearer ${token}`} })
    //   .then((result) => {
    //     // console.log('DATAAAAAAAAAAAAAAAAA', result.data.data);
    //     setPostsWeek(result.data.data.total_priority);
    //     setPriorityWeek(result.data.data.total_priority);
    //     setOpenWeek(result.data.data.status.open);
    //     setProsesWeek(result.data.data.status.process);
    //     setDoneWeek(result.data.data.status.done);
    //     setCloseWeek(result.data.data.status.closed);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     setLoading(false);});

    //  axios.get(process.env.REACT_APP_API_URL + 'api/ticket/summary?filter=month', { headers: {"Authorization" : `Bearer ${token}`} })
    //   .then((result) => {
    //     // console.log('DATAAAAAAAAAAAAAAAAA', result.data.data);
    //     setPostsMonth(result.data.data.total_priority);
    //     setPriorityMonth(result.data.data.total_priority);
    //     setOpenMonth(result.data.data.status.open);
    //     setProsesMonth(result.data.data.status.process);
    //     setDoneMonth(result.data.data.status.done);
    //     setCloseMonth(result.data.data.status.closed);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     setLoading(false);});

    //  axios.get(process.env.REACT_APP_API_URL + 'api/ticket/summary?filter=year', { headers: {"Authorization" : `Bearer ${token}`} })
    //   .then((result) => {
    //     // console.log('DATAAAAAAAAAAAAAAAAA', result.data.data);
    //     setPostsYear(result.data.data.total_priority);
    //     setPriorityYear(result.data.data.total_priority);
    //     setOpenYear(result.data.data.status.open);
    //     setProsesYear(result.data.data.status.process);
    //     setDoneYear(result.data.data.status.done);
    //     setCloseYear(result.data.data.status.closed);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     setLoading(false);});

      axios.get(`${urlApi}api/dashboard/driver`, { headers: {"Authorization" : `Bearer ${token}`} })
       .then((result) => {
         console.log('DRIVERRRRRR',result.data.data);
         setDriver(result.data.data.count);
         setDriverList(result.data.data.drivers)
        //  console.log(setDriverList);
         setLoading(false);
       })
       .catch((error) => {
        console.log(error)
        setLoading(false);});
       console.log(DriverList)

      axios.get(`${urlApi}api/dashboard/operator`, { headers: {"Authorization" : `Bearer ${token}`} })
       .then((result) => {
        //  console.log('OPERATORRRR',result.data.data);
         SetOperator(result.data.data.operators);
         SetOperatorCount(result.data.data.count);
         setLoading(false);
       })
       .catch((error) => {
        console.log(error)
        setLoading(false);});
       console.log(DriverList)

     axios.get(`${urlApi}api/dashboard/process-owner`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        console.log('PROSES OWNER COIIII',result.data.data);
        setPo(result.data.data.count);
        setPoList(result.data.data.process_owners)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});

     axios.get(`${urlApi}api/dashboard/ticket`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        console.log(result.data.data);
        setTicket(result.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        });

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
    }, []);


    useEffect(() => {
        const handleOnlineStatusChange = () => {
          if (navigator.onLine) {
            // Koneksi jaringan baik
            toast.success('Jaringan kembali online!', { position: toast.POSITION.TOP_CENTER });
          } else {
            // Koneksi jaringan buruk
            toast.error('Koneksi jaringan kurang bagus!', { position: toast.POSITION.TOP_CENTER });
          }
        };
    
        // Menambahkan event listener untuk mendeteksi perubahan status koneksi
        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);
    
        // Membersihkan event listener saat komponen di-unmount
        return () => {
          window.removeEventListener('online', handleOnlineStatusChange);
          window.removeEventListener('offline', handleOnlineStatusChange);
        };
      }, []);

    // console.log(open)
    return (
        <div>
            <ToastContainer />
        {loading ? (
           <Loading/>
        ) : (
            <div className='PageMainNew'>
           <Tabs defaultActiveKey="first" className='nav-tabs-main'> 
                <Tab eventKey="first" title="Harian"> 
                <div className='main-new-header px-5'>
                <div className='header-logo-prima'>
                    <SvgLogo></SvgLogo>
                </div>
                <div className='header-total-ticket'>
                    <div className='text-end'>
                        <DateTime />
                    </div>
                    <div className='upper-hr-top gap-3'>
                        <h1 className='xl tg'>{posts.total}</h1>
                        <div>
                            <div className='icon-ticket-top gap-2 text-blue'>
                                <h1 className='md fwb mt-3'><Icon icon="carbon:report" /></h1>
                                <div>
                                <Detakblue className='detak' />
                                <p className='xl fwb700 tt'>Ticket Active</p>
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
                        <p className='xl text-red'>High <span className='fwb'>{priority.high}</span></p>
                    </div>
                </div>
            </div>

            <div className='SvgMaps'>
                <SvgMaps parameter = 'day' className='h-100' />
            </div>

            <div className='main-new-bottom px-5'>
                <div className='main-new-bottom-left'>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-blue'><Icon icon="ion:log-in-outline" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{open.value}</h1>
                            <h2>Open</h2>
                        </div>
                    </div>
                    {/* <div className='main-parent-ticket-border d-none gap-4'>
                        <h1 className='md fwb text-yellow'><Icon icon="material-symbols:forward" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Forwarding.value}</h1>
                            <p className='xl'>Forwarding</p>
                        </div>
                    </div> */}
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-lime'><Icon icon="clarity:process-on-vm-line" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{Proses.value}</h1>
                            <h2>Proses</h2>
                        </div>
                    </div>
                    {/* <div className='main-parent-ticket-border d-none gap-4'>
                        <h1 className='md fwb text-purple'><Icon icon="material-symbols:reopen-window" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Reopen.value}</h1>
                            <p className='xl'>Re-Open</p>
                        </div>
                    </div> */}
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-cyan'><Icon icon="material-symbols:done" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{Done.value}</h1>
                            <h2>Done</h2>
                        </div>
                    </div>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-red'><Icon icon="jam:shield-close" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{Close.value}</h1>
                            <h2>Closed</h2>
                        </div>
                    </div>
                </div>

                <div className='main-new-bottom-right gap-5'>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Po.total}</h1>
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
                                <p className='xl'>Online <span className='fwb700'>{Po.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>{Po.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-lime text-center text-white'>
                            <tr>
                            <th><h2>Proses Owner</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {PoList.map((item, id) => (
                            <tr key={id}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Driver.total}</h1>
                                <div className='text-red'>
                                    <div className='icon-ticket gap-2'>
                                        <h1 className='md'><Icon icon="mingcute:steering-wheel-fill" /></h1>
                                            <Detakred fill="blue"  className='detak'/>
                                    </div>
                                            <p className='text-center fwb700 tt xl'>Driver</p>
                                </div>
                            </div>
                            <div className='hr-main tg'></div>
                            <div className='lower-hr gap-3 tg'>
                                <p className='xl '>Online <span className='fwb700'>{Driver.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl '>Offline <span className='fwb700'>{Driver.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-red text-center text-white'>
                            <tr>
                            <th><h2>Driver</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {DriverList.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                            
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{OperatorCount.total}</h1>
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
                               <p className='xl'>Online <span className='fwb700'>{OperatorCount.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>{OperatorCount.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-orange text-center text-white'>
                            <tr>
                            <th><h2>Operator</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {Operator.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
                </Tab> 
                <Tab eventKey="second" title="Mingguan"> 
                <div className='main-new-header px-5'>
                <div className='header-logo-prima'>
                    <SvgLogo></SvgLogo>
                </div>
                <div className='header-total-ticket'>
                    <div className='text-end'>
                        <DateTime />
                    </div>
                    <div className='upper-hr-top gap-3'>
                        <h1 className='xl tg'>{postsWeek.total}</h1>
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
                        <p className='xl text-blue'>Low <span className='fwb'>{priorityWeek.low}</span></p>
                        <div className='vl'></div>
                        <p className='xl text-lime'>Medium <span className='fwb'>{priorityWeek.medium}</span></p>
                        <div className='vl'></div>
                        <p className='xl text-red'>High <span className='fwb'>{priorityWeek.high}</span></p>
                    </div>
                </div>
            </div>

            <div className='SvgMaps'>
                <SvgMaps parameter='week'/>
            </div>

            <div className='main-new-bottom px-5'>
                <div className='main-new-bottom-left'>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-blue'><Icon icon="ion:log-in-outline" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{openWeek.value}</h1>
                            <h2>Open</h2>
                        </div>
                    </div>
                    {/* <div className='main-parent-ticket-border d-none gap-4'>
                        <h1 className='md fwb text-yellow'><Icon icon="material-symbols:forward" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Forwarding.value}</h1>
                            <p className='xl'>Forwarding</p>
                        </div>
                    </div> */}
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-lime'><Icon icon="clarity:process-on-vm-line" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{ProsesWeek.value}</h1>
                            <h2>Proses</h2>
                        </div>
                    </div>
                    {/* <div className='main-parent-ticket-border d-none gap-4'>
                        <h1 className='md fwb text-purple'><Icon icon="material-symbols:reopen-window" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Reopen.value}</h1>
                            <p className='xl'>Re-Open</p>
                        </div>
                    </div> */}
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-cyan'><Icon icon="material-symbols:done" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{DoneWeek.value}</h1>
                            <h2>Done</h2>
                        </div>
                    </div>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-red'><Icon icon="jam:shield-close" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{CloseWeek.value}</h1>
                            <h2>Closed</h2>
                        </div>
                    </div>
                </div>

                <div className='main-new-bottom-right gap-5'>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Po.total}</h1>
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
                                <p className='xl'>Online <span className='fwb700'>{Po.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>{Po.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-lime text-center text-white'>
                            <tr>
                            <th><h2>Proses Owner</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {PoList.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Driver.total}</h1>
                                <div className='text-red'>
                                    <div className='icon-ticket gap-2'>
                                    <h1 className='md'><Icon icon="mingcute:steering-wheel-fill" /></h1>
                                            <Detakred fill="blue"  className='detak'/>
                                    </div>
                                            <p className='text-center fwb700 tt xl'>Driver</p>
                                </div>
                            </div>
                            <div className='hr-main tg'></div>
                            <div className='lower-hr gap-3 tg'>
                            <p className='xl '>Online <span className='fwb700'>{Driver.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl '>Offline <span className='fwb700'>{Driver.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-red text-center text-white'>
                            <tr>
                            <th><h2>Driver</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {DriverList.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                            
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{OperatorCount.total}</h1>
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
                               <p className='xl'>Online <span className='fwb700'>{OperatorCount.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>{OperatorCount.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-orange text-center text-white'>
                            <tr>
                            <th><h2>Operator</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {Operator.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
                </Tab> 
                <Tab eventKey="third" title="Bulanan"> 
                <div className='main-new-header px-5'>
                <div className='header-logo-prima'>
                    <SvgLogo></SvgLogo>
                </div>
                <div className='header-total-ticket'>
                    <div className='text-end'>
                        <DateTime />
                    </div>
                    <div className='upper-hr-top gap-3'>
                        <h1 className='xl tg'>{postsMonth.total}</h1>
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
                        <p className='xl text-blue'>Low <span className='fwb'>{priorityMonth.low}</span></p>
                        <div className='vl'></div>
                        <p className='xl text-lime'>Medium <span className='fwb'>{priorityMonth.medium}</span></p>
                        <div className='vl'></div>
                        <p className='xl text-red'>High <span className='fwb'>{priorityMonth.high}</span></p>
                    </div>
                </div>
            </div>

            <div className='SvgMaps'>
                <SvgMaps parameter = 'month'/>
            </div>

            <div className='main-new-bottom px-5'>
                <div className='main-new-bottom-left'>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-blue'><Icon icon="ion:log-in-outline" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{openMonth.value}</h1>
                            <h2>Open</h2>
                        </div>
                    </div>
                    {/* <div className='main-parent-ticket-border d-none gap-4'>
                        <h1 className='md fwb text-yellow'><Icon icon="material-symbols:forward" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Forwarding.value}</h1>
                            <p className='xl'>Forwarding</p>
                        </div>
                    </div> */}
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-lime'><Icon icon="clarity:process-on-vm-line" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{ProsesMonth.value}</h1>
                            <h2>Proses</h2>
                        </div>
                    </div>
                    {/* <div className='main-parent-ticket-border d-none gap-4'>
                        <h1 className='md fwb text-purple'><Icon icon="material-symbols:reopen-window" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{Reopen.value}</h1>
                            <p className='xl'>Re-Open</p>
                        </div>
                    </div> */}
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-cyan'><Icon icon="material-symbols:done" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{DoneMonth.value}</h1>
                            <h2>Done</h2>
                        </div>
                    </div>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-red'><Icon icon="jam:shield-close" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{CloseMonth.value}</h1>
                            <h2>Closed</h2>
                        </div>
                    </div>
                </div>

                <div className='main-new-bottom-right gap-5'>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Po.total}</h1>
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
                                <p className='xl'>Online <span className='fwb700'>{Po.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>{Po.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-lime text-center text-white'>
                            <tr>
                            <th><h2>Proses Owner</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {PoList.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Driver.total}</h1>
                                <div className='text-red'>
                                    <div className='icon-ticket gap-2'>
                                    <h1 className='md'><Icon icon="mingcute:steering-wheel-fill" /></h1>
                                            <Detakred fill="blue"  className='detak'/>
                                    </div>
                                            <p className='text-center fwb700 tt xl'>Driver</p>
                                </div>
                            </div>
                            <div className='hr-main tg'></div>
                            <div className='lower-hr gap-3 tg'>
                            <p className='xl '>Online <span className='fwb700'>{Driver.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl '>Offline <span className='fwb700'>{Driver.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-red text-center text-white'>
                            <tr>
                            <th><h2>Driver</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {DriverList.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                            
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{OperatorCount.total}</h1>
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
                               <p className='xl'>Online <span className='fwb700'>{OperatorCount.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>{OperatorCount.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-orange text-center text-white'>
                            <tr>
                            <th><h2>Operator</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {Operator.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
                </Tab> 
                <Tab eventKey="fourth" title="Tahunan"> 
                <div className='main-new-header px-5'>
                <div className='header-logo-prima'>
                    <SvgLogo></SvgLogo>
                </div>
                <div className='header-total-ticket'>
                    <div className='text-end'>
                        <DateTime />
                    </div>
                    <div className='upper-hr-top gap-3'>
                        <h1 className='xl tg'>{postsYear.total}</h1>
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
                        <p className='xl text-blue'>Low <span className='fwb'>{priorityYear.low}</span></p>
                        <div className='vl'></div>
                        <p className='xl text-lime'>Medium <span className='fwb'>{priorityYear.medium}</span></p>
                        <div className='vl'></div>
                        <p className='xl text-red'>High <span className='fwb'>{priorityYear.high}</span></p>
                    </div>
                </div>
            </div>

            <div className='SvgMaps'>
                <SvgMaps parameter = 'year'/>
            </div>

            <div className='main-new-bottom px-5'>
                <div className='main-new-bottom-left'>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-blue'><Icon icon="ion:log-in-outline" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{openYear.value}</h1>
                            <h2>Open</h2>
                        </div>
                    </div>
                    {/* <div className='main-parent-ticket-border d-none gap-4'>
                        <h1 className='xl fwb text-yellow'><Icon icon="material-symbols:forward" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{Forwarding.value}</h1>
                            <h2>Forwarding</h2>
                        </div>
                    </div> */}
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-lime'><Icon icon="clarity:process-on-vm-line" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{ProsesYear.value}</h1>
                            <h2>Proses</h2>
                        </div>
                    </div>
                    {/* <div className='main-parent-ticket-border d-none gap-4'>
                        <h1 className='xl fwb text-purple'><Icon icon="material-symbols:reopen-window" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{Reopen.value}</h1>
                            <h2>Re-Open</h2>
                        </div>
                    </div> */}
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-cyan'><Icon icon="material-symbols:done" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{DoneYear.value}</h1>
                            <h2>Done</h2>
                        </div>
                    </div>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-red'><Icon icon="jam:shield-close" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='md fwb'>{CloseYear.value}</h1>
                            <h2>Closed</h2>
                        </div>
                    </div>
                </div>

                <div className='main-new-bottom-right gap-5'>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Po.total}</h1>
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
                                <p className='xl'>Online <span className='fwb700'>{Po.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>{Po.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-lime text-center text-white'>
                            <tr>
                            <th><h2>Proses Owner</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {PoList.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{Driver.total}</h1>
                                <div className='text-red'>
                                    <div className='icon-ticket gap-2'>
                                    <h1 className='md'><Icon icon="mingcute:steering-wheel-fill" /></h1>
                                            <Detakred fill="blue"  className='detak'/>
                                    </div>
                                            <p className='text-center fwb700 tt xl'>Driver</p>
                                </div>
                            </div>
                            <div className='hr-main tg'></div>
                            <div className='lower-hr gap-3 tg'>
                            <p className='xl '>Online <span className='fwb700'>{Driver.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl '>Offline <span className='fwb700'>{Driver.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-red text-center text-white'>
                            <tr>
                            <th><h2>Driver</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {DriverList.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                            
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropup-main" id='dropup-main'>
                    <Dropdown.Toggle className='dropdown-main' id="dropdown-basic">
                        <div className='header-total-ticket '>
                            <div className='upper-hr gap-3'>
                                <h1 className='xl tg'>{OperatorCount.total}</h1>
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
                               <p className='xl'>Online <span className='fwb700'>{OperatorCount.online}</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>{OperatorCount.offline}</span></p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id='menu-dropdown-active'>
                    <Table className='border-none'>
                        <thead className='bg-orange text-center text-white'>
                            <tr>
                            <th><h2>Operator</h2></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h2>Date</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {Operator.map((item, index) => (
                            <tr key={index}>
                            <td colSpan={5}><h2>{item.name}</h2></td>
                            <td className='text-center'><h2>{new Date(item.created_at).toLocaleDateString()}</h2></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
                </Tab> 
            </Tabs>
            </div>
        )}
        </div>
        
    )
}

export default MainNew
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

    const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

    // T I C K E T
  const [Ticket, setTicket] = useState([]);
  const [Activity, setActivity] = useState([]);
  const [DetailTicket, setDetailTicket] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("jwttoken");
         axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
          .then((result) => {
            console.log('DATAAAAA',result.data.data);
            setTicket(result.data.data);
            setActivity(result.data.data);
            setDetailTicket(result.data.data);
            setFilteredData(result.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error)
            setLoading(false);});
      }, []);

      useEffect(() => {
        const filtered = Ticket.filter((item) => {
          const searchData = search.toLowerCase().trim();
          if (searchData === '') {
            return true; // Return true for all items if the search input is empty
          }
          // Split the search input into words
          const searchWords = searchData.split(' ');
          // Check if any word in the search input matches any property in the item
          return searchWords.some((word) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(word)
            )
          );
        });
        setFilteredData(filtered);
      }, [search, Ticket]);
    

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
                </div>
                <Form className='search-bottom d-flex align-items-center'>
                    <FormControl
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)} className="icon2 mr-sm-2" />
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
                <tbody id='page-ticket-bottom-tbody'>
                {filteredData.map((item) => (
                    <tr className='text-center'>
                    <td>{item.id}</td>
                    <td>{item.ticket_code}</td>
                    <td>{item.activity.name}</td>
                    <td>
                        <p>{item.start_time}</p>
                        {/* <p className='text-red'>11 : 14 WIB</p> */}
                    </td>
                    <td>
                        <p>12 Sept’ 2023</p>
                        <p className='text-red'>11 : 14 WIB</p>
                    </td>
                    <td>
                        <p className='text-red'>59 Detik </p>
                    </td>
                    <td className='text-blue'>
                        <p>Kategori 1</p>
                    </td>
                    <td>
                        <p style={{ color: item.activity.color}}>{item.activity.name}</p>
                    </td>
                    <td><Link to={`/list-ticket/${item.id}`}><Icon icon="mdi:eye" /></Link></td>
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
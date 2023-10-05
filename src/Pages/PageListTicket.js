import '../Css/Pages/PageTicket.css';
import '../Css/Parts/Font.css'; 

import LogoPatra from '../Images/Logo-Prima.png';
import {Dropdown, Form,  FormControl, Button} from 'react-bootstrap';

import { Icon } from '@iconify/react';

import {Table} from 'react-bootstrap';




function PageTicket() {

    return (
        <div className='PageListTicket'>
            <div className='main-new-header px-5 pt-2'>
                <div className='header-logo-prima pt-2'>
                    <img className='LogoPatra mt-2' src={LogoPatra} alt="LogoPatra" />
                </div>
                <div className='track-filter text-end'>
                    <h1 className='text-black'>6 Oktober 2023</h1>
                    <p className='my-2 text-black'>13:45 WIB</p>
                </div>
            </div>

            {/* className='menu-dropdown-table-ticket'> */}
            <div className='table-list-ticket px-5'>
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
            </div>
        </div>
    )
}

export default PageTicket
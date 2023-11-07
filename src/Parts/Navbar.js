
import Dropdown from 'react-bootstrap/Dropdown';
import '../Css/Parts/Navbar.css';

import { NavLink } from 'react-router-dom';

import Logout from './ButtonLogout'

import { Icon } from '@iconify/react';



function Example() {
  return (
    <>

      <Dropdown >
        <Dropdown.Toggle id='sidebar-button'>
          <h1><Icon className='sidebar-burger-menu' icon="gg:menu-left" /></h1>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className='d-flex align-items-center gap-3' id='nav-menu'>
          <h1><Icon icon="material-symbols:dashboard" /></h1>
          <NavLink className='menu-sidebar my-3' activeClassName="active" to={'/main'}><p>Main <br/>Dashboard</p></NavLink>
          </div>
          <div className='d-flex align-items-center gap-3' id='nav-menu'>
          <h1><Icon icon="gis:poi-map" /></h1>
          <NavLink className='menu-sidebar my-3' activeClassName="active" to={'/tracking'}><p>Map <br/>Tracking</p></NavLink>
          </div>
          
          <Dropdown id='dropdown-ticket'>
            <Dropdown.Toggle id="dropdown-basic">
            <div className='d-flex align-items-start gap-3' id='nav-menu'>
            <h1><Icon icon="ion:ticket" /></h1>
            <div>
              <NavLink className='menu-sidebar' activeClassName="active"><p>Ticket</p></NavLink>
            </div>
            </div>
            </Dropdown.Toggle>

            <Dropdown.Menu id='dropdown-menuuu'>
              <Dropdown.Item href="/ticket">
              <div className='d-flex align-items-center gap-2 my-2'>
              <div className='rectangle'></div>
              <NavLink className='menu-sidebar mt-0' activeClassName="active" to={'/ticket'}><p className='sm'>Summary Ticket</p></NavLink>
            </div>
              </Dropdown.Item>
              <Dropdown.Item href="/list-ticket">
              <div className='d-flex align-items-center gap-2 my-2'>
              <div className='rectangle'></div>
              <NavLink className='menu-sidebar mt-0' activeClassName="active" to={'/list-ticket'}><p className='sm'>List Ticket</p></NavLink>
            </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
         
          
          <div className='nav-bottom mt-3'>
            <Logout/>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default Example;
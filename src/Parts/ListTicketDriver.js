import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Icon } from '@iconify/react';


const MyComponent = () => {

    // T I C K E T
const [Ticket, setTicket,] = useState([]);

// D R I V E R
const [Driver, setDriver,] = useState([]);

useEffect(() => {
  const token = sessionStorage.getItem("jwttoken");
  axios.get(process.env.REACT_APP_API_URL + 'api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
  .then((result) => {
    console.log('TICKETT WOIIIIIIIIIII', result.data.data);
    setTicket(result.data.data);
  })
  .catch((error) => console.log(error));

   axios.get(process.env.REACT_APP_API_URL + 'api/dashboard/driver', { headers: {"Authorization" : `Bearer ${token}`} })
    .then((result) => {
      console.log('driverrrrrrrrrrrrrrrrrrrrrrrrrrrrr', result.data.data.drivers);
      setDriver(result.data.data.drivers);
    })
    .catch((error) => console.log(error));
}, []);

const mergedData = {...Ticket, ...Driver};
console.log('DATA GABUNGANNNN', mergedData)

// PAGINATION
// Sample data (you can replace this with your actual data)
const allData = Ticket;
// Pagination variables
const itemsPerPage = 100; // Number of items to display per page
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

let data = mergedData.ticket_code;


      return (
        <div>
            {mergedData.map((item, index) => (
                    <Col sm={3} className='px-3 py-2' key={index}>
                    <div className='col-item d-flex align-items-start gap-3'>
                        <h1 className='fwb text-blue d-flex align-items-start'><Icon icon="ion:log-in-outline" /></h1>
                        <div>
                        {item.ticket_code !== undefined ? (
                            <p className='xl fwb tg2'>{item.name}</p>
                            ) : (
                            <p className='xl fwb tg2'>{item.ticket_code}</p>
                        )}
                            <p className='md2'>11/09/2023</p>
                            <p className='xl fwb'>{item.phone_number}</p>
                        </div>
                    </div>
                    </Col>
             ))}
        </div>
    );
};

export default MyComponent;

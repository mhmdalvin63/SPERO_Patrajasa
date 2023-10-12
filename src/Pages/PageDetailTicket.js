import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Parts/Loading';
import DateTime from '../Parts/DateTime';
import SvgLogo from '../Parts/SvgLogo';
import { Col, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import '../Css/Pages/PageDetailTicket.css';
// import { useHistory } from 'react-router-dom';


function DetailComponent() {
    const goBack = () => {
        window.history.back();
      };

  const { id } = useParams();
  const [Activity, setActivity] = useState(null);
  const [Added, setAdded] = useState(null);
  const [Chat, setChat] = useState(null);
  const [Detail, setDetail] = useState(null);
  const [Log, setLog] = useState(null);
  const [Ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
    axios.get(`https://apipatra.spero-lab.id/api/ticket/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        console.log('DATAAAAAAA', response.data.data)
        setActivity(response.data.data.activity);
        setAdded(response.data.data.added_by);
        setChat(response.data.data.chat);
        setDetail(response.data.data.detail_ticket);
        setLog(response.data.data.log);
        setTicket(response.data.data.detail_ticket.ticket);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);

      });
  }, [id]);

  console.log('ACTIVITYYYYYYYY', Activity)
  console.log('ADDEDDDDDDDDDDDDDDDDD', Added)
  console.log('CHATTTTTTT', Chat)
  console.log('DETAILLLLLLLLL', Detail)
  console.log('TICKETTTTTT', Ticket)
  console.log('LOGGGGGG', Log)

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <div className='PageDetailTicket'>
            <div className='main-new-header px-5 pt-2'>
                <div className='header-logo-prima'>
                    <SvgLogo></SvgLogo>
                </div>
                <div className='track-filter text-end'>
                    <DateTime/>
                </div>
            </div>
            <div className='body-data px-5'>
            <button onClick={goBack} className='back-button'><h3><Icon icon="pajamas:go-back" />  Back</h3></button>
                    <Row>
                        <Col sm={7}>
                            <div className='data-pemohon my-4'>
                                <div className='header-pemohon px-5 py-3'>
                                    <h3>Pemohon</h3>
                                </div>
                                <Row className='px-5 pt-4 pb-2'>
                                    <Col sm={3}><h3>Nama</h3></Col>
                                    <Col sm={7}><h3>: {Added.name}</h3></Col>
                                </Row>
                                <Row className='px-5 py-2'>
                                    <Col sm={3}><h3>Email</h3></Col>
                                    <Col sm={7}><h3>: {Added.email}</h3></Col>
                                </Row>
                                <Row className='px-5 py-2'>
                                    <Col sm={3}><h3>Phone Number</h3></Col>
                                    <Col sm={7}><h3>: {Added.phone_number}</h3></Col>
                                </Row>
                                <Row className='px-5 pb-4 pt-2'>
                                    <Col sm={3}><h3>Gender</h3></Col>
                                    <Col sm={7}><h3>: {Added.gender}</h3></Col>
                                </Row>
                            </div>

                            <div className='data-ticket px-5 my-4'>
                                <div className='header-ticket  py-3'>
                                    <h3><Icon icon="ion:ticket" /> Ticket</h3>
                                </div>
                                <hr />
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Ticket Code</h3></Col>
                                    <Col sm={7}><h3>: {Ticket.ticket_code}</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Category</h3></Col>
                                    <Col sm={7}><h3>: {Ticket.category_id}</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Priority</h3></Col>
                                    <Col sm={7}><h3>: {Ticket.priority_id}</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Target Time</h3></Col>
                                    <Col sm={7}><h3>: {Ticket.range_time}</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Subject</h3></Col>
                                    <Col sm={7}><h3>: {Detail.subject}</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Content</h3></Col>
                                    <Col sm={7}><h3>: {Detail.content}</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Location</h3></Col>
                                    <Col sm={7}><h3>: {Detail.location}</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Attachment</h3></Col>
                                    <Col sm={7}><h3>: Driver</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Number Plate</h3></Col>
                                    <Col sm={7}><h3>: {Detail.number_plate}</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Driver Code</h3></Col>
                                    <Col sm={7}><h3>: {Detail.driver_code}</h3></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h3>Created At</h3></Col>
                                    <Col sm={7}><h3>: Driver</h3></Col>
                                </Row>
                                <Row className='pb-4 pt-2'>
                                    <Col sm={3}><h3>Update At</h3></Col>
                                    <Col sm={7}><h3>: Driver</h3></Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
            </div>
        </div>
      )}
    </div>
  );
}

export default DetailComponent;
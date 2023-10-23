import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Parts/Loading';
import DateTime from '../Parts/DateTime';
import SvgLogo from '../Parts/SvgLogo';
import { Col, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import '../Css/Pages/PageDetailTicket.css';
import ChatPage from '../Parts/Chat'
// import Timeline from '../Parts/Timeline';
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

//   console.log('ACTIVITYYYYYYYY', Activity)
//   console.log('ADDEDDDDDDDDDDDDDDDDD', Added)
//   console.log('CHATTTTTTT', Chat)
//   console.log('DETAILLLLLLLLL', Detail)
//   console.log('TICKETTTTTT', Ticket)
//   console.log('LOGGGGGG', Log)

    const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const formatDateLong = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const getTimeFromData = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString();
      };

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
                                    <h4>Pemohon</h4>
                                </div>
                                <Row className='px-5 pt-4 pb-2'>
                                    <Col sm={3}><h4>Nama</h4></Col>
                                    <Col sm={7}><h4>: {Added.name}</h4></Col>
                                </Row>
                                <Row className='px-5 py-2'>
                                    <Col sm={3}><h4>Email</h4></Col>
                                    <Col sm={7}><h4>: {Added.email}</h4></Col>
                                </Row>
                                <Row className='px-5 py-2'>
                                    <Col sm={3}><h4>Phone Number</h4></Col>
                                    <Col sm={7}><h4>: {Added.phone_number}</h4></Col>
                                </Row>
                                <Row className='px-5 pb-4 pt-2'>
                                    <Col sm={3}><h4>Gender</h4></Col>
                                    <Col sm={7}><h4>: {Added.gender}</h4></Col>
                                </Row>
                            </div>

                            <div className='data-ticket px-5 my-4'>
                                <div className='header-ticket  py-3'>
                                    <h4><Icon icon="ion:ticket" /> Ticket</h4>
                                </div>
                                <hr />
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Ticket Code</h4></Col>
                                    <Col sm={7}><h4>: {Ticket.ticket_code}</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Category</h4></Col>
                                    <Col sm={7}><h4>: {Ticket.category_id}</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Priority</h4></Col>
                                    <Col sm={7}><h4>: {Ticket.priority_id}</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Target Time</h4></Col>
                                    <Col sm={7}><h4>: {Ticket.range_time}</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Subject</h4></Col>
                                    <Col sm={7}><h4>: {Detail.subject}</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Content</h4></Col>
                                    <Col sm={7}><h4>: {Detail.content}</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Location</h4></Col>
                                    <Col sm={7}><h4>: {Detail.location}</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Attachment</h4></Col>
                                    <Col sm={7}><h4>: Driver</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Number Plate</h4></Col>
                                    <Col sm={7}><h4>: {Detail.number_plate}</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Driver Code</h4></Col>
                                    <Col sm={7}><h4>: {Detail.driver_code}</h4></Col>
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Created At</h4></Col>
                                    <Col sm={7}><h4>: {formatDateLong(Detail.created_at)} {getTimeFromData(Detail.updated_at)}</h4></Col>
                                </Row>
                                <Row className='pb-4 pt-2'>
                                    <Col sm={3}><h4>Update At</h4></Col>
                                    <Col sm={7}><h4>: {formatDateLong(Detail.updated_at)} {getTimeFromData(Detail.updated_at)}</h4></Col>
                                </Row>
                            </div>
                        </Col>
                        <Col sm={5}>
                            <div className='data-log px-5 py-3 my-4'>
                                <div className='header-ticket pb-3'>
                                    <h3 className='text-blue'>Log</h3>
                                </div>
                                <hr />
                                <div className='timeline-right'>
                                <ul className="timeline">
                                {Log.map((item, id) => (
                                    <li key={id} className='my-2'>
                                        <div className="direction-r">
                                            <div className="flag-wrapper">
                                            <span className="hexa" style={{backgroundColor: item.activity.color}}></span>
                                            <div className="flag">
                                                <h3 style={{color: item.activity.color}}>{item.activity.public_name}</h3>
                                                <h4>{formatDate(item.created_at)} {getTimeFromData(item.created_at)}</h4>
                                            </div>
                                            </div>
                                            <div className="desc">
                                                <h4>{item.added_by.name}</h4>
                                                <h4>Read By Operator</h4>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                </ul>
                                </div>
                            </div>
                            <div className='data-chat px-5 py-3 my-4'>
                                <div className='header-ticket pb-3'>
                                    <h3 className='text-blue'>Chat</h3>
                                </div>
                                {/* <hr /> */}
                                <div className='element-chat'>
                                    <ol class="chat">
                                        <li class="other">
                                            <div className="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
                                        <div className="msg">
                                            <h4>Lorem ipsum dolor sit amet consectetur. Quis interdum nulla nibh ut. Donec eu placerat at senectus. Molestie tristique ac sed velit eget a.</h4>
                                            <time>20:17</time>
                                        </div>
                                        </li>
                                        <li class="self">
                                            <div className="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
                                        <div className="msg">
                                            <h4>Lorem ipsum dolor sit amet consectetur. Quis interdum nulla nibh ut. Donec eu placerat at senectus. Molestie tristique ac sed velit eget a.</h4>
                                            <time>20:18</time>
                                        </div>
                                        </li>
                                    </ol>
                                </div>
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
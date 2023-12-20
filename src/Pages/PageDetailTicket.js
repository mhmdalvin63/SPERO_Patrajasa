import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Parts/Loading';
import DateTime from '../Parts/DateTime';
import SvgLogo from '../Parts/SvgLogo';
import { Col, Row } from 'react-bootstrap';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import '../Css/Pages/PageDetailTicket.css';
import Pusher from 'pusher-js';
// import ChatPage from '../Parts/Chat'
// import Pusher from '../Parts/Pusher'
// import Pusher from 'pusher-js/types/src/core/pusher';
// import Timeline from '../Parts/Timeline';
// import { useHistory } from 'react-router-dom';


function DetailComponent() {
    const goBack = () => {
        window.history.back();
      };

  const { id } = useParams();
  const [Activity, setActivity] = useState([null]);
  const [Added, setAdded] = useState([null]);
  const [Chat, setChat] = useState([]);
  const [Image, setImage] = useState([]);
  const [Detail, setDetail] = useState([null]);
  const [Log, setLog] = useState([null]);
  const [Ticket, setTicket] = useState([null]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");

    const currentURL = window.location.href;
    console.log('CURRENTTTTTTTTTTTTT:', currentURL);
    let urlApi;
    if (currentURL.includes('172.16.16.3')) {
      urlApi = process.env.REACT_APP_API_URL_HTTP;
    } else if (currentURL.includes('dashboard.par.co.id')) {
      urlApi = process.env.REACT_APP_API_URL;
    } else {
      urlApi = process.env.REACT_APP_API_URL;
    }
  
    axios.get(`${urlApi}api/ticket/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((response) => {
        console.log('DATA REAL',response.data.data)
        console.log('DATAAAAAAA', response.data.data.chat);
        console.log('setActivity',setActivity)
        setAdded(response.data.data.added_by);
        setChat(response.data.data.chat);
        setDetail(response.data.data.detail_ticket);
        setImage(response?.data?.data?.detail_ticket?.file_upload?.attachments ?? []);
        setLog(response.data.data.log);
        setTicket(response.data.data.detail_ticket.ticket);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });


      const pusher = new Pusher('2b7208e6523a6e855f6b', {
        cluster: 'ap1',
      });
      const channel = pusher.subscribe(`chat`);
      const idToCheck = id; // Uncomment this line if 'id' is the variable you want to use
      console.log(idToCheck); // Uncomment this line to log the 'id'

      channel.bind('chat-event', (data) => {
          try {
              let me = JSON.parse(data.message);
              const newData = me;
              console.log('truth or dare', idToCheck == newData.ticket_id);
              if (idToCheck == newData.ticket_id) {
                  setChat((prevData) => [...prevData, newData]);
              }
          } catch (error) {
              console.error('Gagal mengurai data JSON:', error);
          }
      });
    
     
  
      channel.bind('pusher:error', err => {
        console.error('Pusher Error:', err);
      });
  
      pusher.connection.bind('connected', () => {
        console.log('Connected to Pusher');
      });
  
      return () => {
        pusher.disconnect(); // Disconnect Pusher when the component unmounts
      };
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

      const [popoverShow, setPopoverShow] = useState(false);
      const [popoverContent, setPopoverContent] = useState('');
    
      const handlePopover = (content) => {
        setPopoverShow(!popoverShow);
        setPopoverContent(content);
      };

      const chatContainerRef = useRef(null);
      useEffect(() => {
    // Scroll to the bottom when the component mounts or when new messages are added
    scrollToBottom();
  }, [Chat]);
      useEffect(() => {
    // Scroll to the bottom whenever the component updates (e.g., when new messages arrive)
    scrollToBottom();
  });
      const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  //   function removeUndefined(text) {
  //   return text.replace(/undefined, /g, '');
  // }



const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedImageUrl, setSelectedImageUrl] = useState('');

const openModal = (imageUrl) => {
  setSelectedImageUrl(imageUrl);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
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
                                    <Col sm={7}><h4>: {formatDateLong(new Date(Ticket.start_time).getTime() + Ticket.range_time * 60 * 60 * 1000)} <span className='text-red'>{getTimeFromData(new Date(Ticket.start_time).getTime() + Ticket.range_time * 60 * 60 * 1000)}</span></h4></Col>
                                    <p></p>
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
                                    {/* <Col sm={7}><h4>: {removeUndefined(Detail.location)}</h4></Col> */}
                                    <Col sm={7}><h4>: {Detail.location}</h4></Col>
                                    {/* <Col sm={7}><h4>: {Detail.location}</h4></Col> */}
                                </Row>
                                <Row className=' py-2'>
                                    <Col sm={3}><h4>Attachment</h4></Col>
                                    <Col sm={7} className='d-flex gap-2'>: 
                                    {Image && Image.length > 0 ?(
  Image.map((attachment) => (
    <div key={attachment.id} className='img-detail-ticket'>
      <img
        src={`${attachment.file_path}/${attachment.file_hash}`}
        alt={attachment.file_name}
        onClick={() => openModal(`${attachment.file_path}/${attachment.file_hash}`)}
      />
    </div>
  ))
) : (
  <h4>No images available</h4>
)}

      {/* Modal */}
      <div
        style={{
          display: isModalOpen ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1,
        }}
        onClick={closeModal}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img
            src={selectedImageUrl}
            alt="Modal"
            style={{ maxWidth: '80vw', maxHeight: '80vh' }}
          />
        </div>
      </div>
                                    </Col>
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
                            <div className='data-chat px-5 py-3 my-4'>
                                <div className='header-ticket pb-3'>
                                    <h3 className='text-blue'>Chat</h3>
                                </div>
                                {/* <hr /> */}
                                <div className='element-chat' ref={chatContainerRef}>
                                    <ol className="chat">
                                    {Chat.map((item, id) => (
                                        <li key={id} className={item.user_id === 3 ? 'self' : 'other'}>
                                            <div className="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
                                        <div className="msg">
                                            <h4>{item.user.name}</h4>
                                            <div className='my-2'/>
                                            <h4>{item.content}</h4>
                                            <div className='text-end'>{getTimeFromData(item.created_at)}</div>
                                        </div>
                                        </li>
                                    ))}
                                    </ol>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12}>
                        <div className='data-log px-5 py-3 my-4'>
                                <div className='header-ticket pb-3'>
                                    <h3 className='text-blue'>Log</h3>
                                </div>
                                <hr />
                                <div className='timeline-right'>
                                {/* <ul className="timeline">
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
                                </ul> */}
                                <div className="line_box my-4">
                        {/* <div className="line_box" style="margin: 40px 0 40px 0;"> */}
                            {Log.map((item, id) => (
                                <div key={id} className="text_circle">
                                    <div className="circle">
                                    <h3 style={{ color: item.activity.color }}>{item.activity.public_name}</h3>
                                    <h4>{formatDate(item.created_at)} {getTimeFromData(item.created_at)}</h4>
                                    <h4>{item.added_by.name}</h4>
                                    <h4 onClick={() => handlePopover('Read By Operator')}>Read By Operator</h4>
                                    </div>
                                <h2 className="tvar" style={{ border: `4px solid #${item.activity.color}` }}>
                                    <span style={{ backgroundColor: item.activity.color }}><Icon icon="fe:timeline" /></span>
                                </h2>
                                </div>
                            ))}
                        </div>
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
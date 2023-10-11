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

import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 

// ICONIFY
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Parts/Loading';
// import { useState } from 'react';



function MainNew() {
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


  // T I C K E T   S U M M A R Y
  useEffect(() => {
    const token = sessionStorage.getItem("jwttoken");
     axios.get('https://apipatra.spero-lab.id/api/ticket/summary?filter=day', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        console.log('DATAAAAAAAAAAAAAAAAA', result.data.data);
        setPosts(result.data.data.total_priority);
        setPriority(result.data.data.total_priority);
        setOpen(result.data.data.status.open);
        setProses(result.data.data.status.process);
        setDone(result.data.data.status.done);
        setClose(result.data.data.status.closed);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
    });

     axios.get('https://apipatra.spero-lab.id/api/ticket/summary?filter=week', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        console.log('DATAAAAAAAAAAAAAAAAA', result.data.data);
        setPostsWeek(result.data.data.total_priority);
        setPriorityWeek(result.data.data.total_priority);
        setOpenWeek(result.data.data.status.open);
        setProsesWeek(result.data.data.status.process);
        setDoneWeek(result.data.data.status.done);
        setCloseWeek(result.data.data.status.closed);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});

     axios.get('https://apipatra.spero-lab.id/api/ticket/summary?filter=month', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        console.log('DATAAAAAAAAAAAAAAAAA', result.data.data);
        setPostsMonth(result.data.data.total_priority);
        setPriorityMonth(result.data.data.total_priority);
        setOpenMonth(result.data.data.status.open);
        setProsesMonth(result.data.data.status.process);
        setDoneMonth(result.data.data.status.done);
        setCloseMonth(result.data.data.status.closed);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});

     axios.get('https://apipatra.spero-lab.id/api/ticket/summary?filter=year', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        console.log('DATAAAAAAAAAAAAAAAAA', result.data.data);
        setPostsYear(result.data.data.total_priority);
        setPriorityYear(result.data.data.total_priority);
        setOpenYear(result.data.data.status.open);
        setProsesYear(result.data.data.status.process);
        setDoneYear(result.data.data.status.done);
        setCloseYear(result.data.data.status.closed);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});

      axios.get('https://apipatra.spero-lab.id/api/dashboard/driver', { headers: {"Authorization" : `Bearer ${token}`} })
       .then((result) => {
         console.log('DRIVERRRRRR',result.data.data);
         setDriver(result.data.data.count);
         setDriverList(result.data.data.drivers)
         console.log(setDriverList);
         setLoading(false);
       })
       .catch((error) => {
        console.log(error)
        setLoading(false);});
    //    console.log(DriverList)

      axios.get('https://apipatra.spero-lab.id/api/dashboard/operator', { headers: {"Authorization" : `Bearer ${token}`} })
       .then((result) => {
         console.log('OPERATORRRR',result.data.data.operator);
         SetOperator(result.data.data.operator);
         setLoading(false);
       })
       .catch((error) => {
        console.log(error)
        setLoading(false);});
    //    console.log(DriverList)

     axios.get('https://apipatra.spero-lab.id/api/dashboard/process-owner', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log('PROSES OWNER COIIII',result.data.data);
        setPo(result.data.data);
        setPoList(result.data.data.process_owner)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});

     axios.get('https://apipatra.spero-lab.id/api/dashboard/ticket', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((result) => {
        // console.log(result.data.data);
        setTicket(result.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);});
  }, []);


    return (
        <div>
        {loading ? (
           <Loading/>
        ) : (
            <div className='PageMainNew'>
           <Tabs defaultActiveKey="first" className='nav-tabs-main'> 
                <Tab eventKey="first" title="Harian"> 
                <div className='main-new-header px-5'>
                <div className='header-logo-prima'>
                    {/* <img className='LogoPatra' src={LogoPatra} alt="LogoPatra" /> */}
                    <svg className='LogoPatra' width="200" height="51" viewBox="0 0 191 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M135.065 20.7176C135.065 24.0735 135.067 27.429 135.064 30.7849C135.062 33.6675 135.052 36.5504 135.054 39.433C135.054 39.869 134.999 40.2837 134.802 40.6761C134.689 40.9016 134.542 41.0949 134.339 41.2471C134.227 41.3313 134.108 41.3826 133.967 41.3826C133.809 41.3826 133.652 41.3826 133.494 41.384C132.841 41.3914 132.188 41.4034 131.536 41.4045C131.311 41.4049 131.087 41.3767 130.862 41.3639C130.405 41.3376 130.117 41.0678 129.929 40.6834C129.749 40.3141 129.698 39.9093 129.677 39.5026C129.668 39.3228 129.675 39.1424 129.675 38.9623C129.675 29.8185 129.675 20.6744 129.673 11.5307C129.673 11.2397 129.712 10.945 129.622 10.6584C129.608 10.6112 129.511 10.5537 129.462 10.5764C129.402 10.6042 129.335 10.6295 129.291 10.6749C129.229 10.7386 129.179 10.8162 129.138 10.8949C129.065 11.0343 129.002 11.1789 128.935 11.3217C127.366 14.6871 125.792 18.0503 124.228 21.4179C121.716 26.8265 119.21 32.2385 116.701 37.6489C116.256 38.6083 115.813 39.5692 115.364 40.5264C115.249 40.7702 115.115 41.0052 114.986 41.242C114.939 41.3273 114.854 41.3635 114.762 41.372C114.65 41.3822 114.537 41.3837 114.425 41.3837C112.961 41.3844 111.497 41.3848 110.033 41.3829C109.898 41.3829 109.762 41.3789 109.63 41.3577C109.57 41.3482 109.5 41.3039 109.466 41.2541C109.377 41.1249 109.299 40.9872 109.23 40.8463C108.668 39.6933 108.102 38.5417 107.55 37.3836C105.896 33.9091 104.241 30.435 102.598 26.9546C99.7064 20.8285 96.8235 14.698 93.9402 8.56828C93.7667 8.19968 93.5767 7.84425 93.3058 7.53787C93.263 7.48955 93.2048 7.44782 93.1455 7.4233C93.1147 7.41049 93.0466 7.42842 93.028 7.45551C92.9354 7.58692 92.8903 7.73846 92.887 7.89952C92.8823 8.12464 92.8823 8.34975 92.8823 8.57524C92.8819 18.9804 92.8823 29.3855 92.8819 39.7907C92.8819 39.9934 92.8951 40.1973 92.8768 40.3983C92.845 40.7519 92.6824 41.0374 92.3837 41.2405C92.2692 41.3185 92.1462 41.3683 92.0082 41.3767C91.9185 41.3822 91.8281 41.384 91.738 41.3844C90.7021 41.3848 89.6659 41.3848 88.63 41.3844C88.6073 41.3844 88.5849 41.3829 88.5623 41.3844C88.0842 41.4155 87.7474 41.1205 87.534 40.653C87.5069 40.5938 87.4967 40.5231 87.4945 40.4569C87.4883 40.2768 87.489 40.0967 87.489 39.9166C87.489 28.0026 87.4897 16.0886 87.4857 4.1743C87.4857 3.71821 87.5329 3.28116 87.7083 2.85508C87.9191 2.34262 88.2295 1.91179 88.6688 1.57466C89.1186 1.22912 89.6117 0.960442 90.1476 0.775956C90.3156 0.718122 90.4957 0.687373 90.6729 0.665045C90.8284 0.645645 90.9876 0.652966 91.145 0.652966C92.4288 0.652234 93.7125 0.651868 94.9962 0.652966C95.1763 0.652966 95.3567 0.655894 95.5361 0.669804C95.7766 0.688838 95.9647 0.803409 96.0793 1.01901C96.3011 1.4363 96.5354 1.8481 96.7338 2.27637C99.4498 8.13635 102.153 14.0026 104.876 19.8592C106.622 23.6141 108.392 27.3573 110.158 31.1023C110.667 32.181 111.199 33.2491 111.724 34.3198C111.843 34.5617 111.977 34.7964 112.109 35.0314C112.172 35.1434 112.298 35.1331 112.365 35.0098C112.495 34.7729 112.627 34.5372 112.745 34.2945C113.651 32.4328 114.569 30.577 115.454 28.7054C117.494 24.3923 119.521 20.0737 121.543 15.7522C123.251 12.1035 124.947 8.45005 126.641 4.79474C127.075 3.85804 127.702 3.07507 128.459 2.38728C129.2 1.71486 130.077 1.35284 131.061 1.20459C132.204 1.03219 133.351 1.04976 134.499 1.08343C134.544 1.0849 134.589 1.08929 134.634 1.09441C134.901 1.12699 135.047 1.27121 135.057 1.52854C135.065 1.75329 135.063 1.97877 135.063 2.20389C135.065 8.37574 135.065 14.5469 135.065 20.7176Z" fill="#1767B3"/>
                    <path d="M34.0533 21.4209C34.0533 15.4306 34.0537 9.44027 34.0529 3.44961C34.0529 2.99828 34.0712 2.55134 34.203 2.11282C34.3498 1.62452 34.6016 1.21016 34.9904 0.879259C35.4992 0.445864 36.0933 0.186705 36.7375 0.0384575C36.8887 0.00368338 37.0508 0.00990635 37.2079 0.00880822C37.996 0.00368361 38.7844 -0.000342922 39.5725 2.31214e-05C44.2117 0.00258542 48.8506 0.00624631 53.4898 0.0106388C53.8727 0.0110049 54.256 0.00661177 54.6377 0.0282083C54.9965 0.0487067 55.3548 0.0919 55.7113 0.14095C57.054 0.325435 58.3641 0.63401 59.6189 1.15965C59.9318 1.29069 60.2323 1.43967 60.5135 1.62928C61.3539 2.19665 62.168 2.79989 62.9465 3.44925C63.5545 3.95622 64.0857 4.53786 64.5458 5.18246C64.8606 5.62318 65.138 6.08512 65.3427 6.58916C65.7918 7.69608 66.1893 8.81873 66.4254 9.993C66.6615 11.1658 66.8035 12.3481 66.7746 13.5469C66.7574 14.2706 66.6319 14.9807 66.4734 15.6831C66.2849 16.5188 66.0063 17.3274 65.6593 18.1115C65.0367 19.5171 64.1128 20.6946 62.9345 21.6738C62.0117 22.4407 61.0065 23.0703 59.8875 23.5227C58.7195 23.9949 57.5664 24.504 56.4083 25C56.2853 25.0527 56.1667 25.1186 56.0529 25.1893C56.0258 25.2061 56.0034 25.2801 56.0177 25.3057C56.084 25.4221 56.1575 25.5359 56.2403 25.6413C57.0339 26.6502 57.8289 27.6575 58.625 28.6641C61.5717 32.3912 64.5183 36.1179 67.465 39.8449C67.5627 39.9686 67.6524 40.0986 67.7549 40.2183C67.8654 40.3475 67.894 40.4954 67.8896 40.6575C67.8819 40.9507 67.6872 41.1722 67.3973 41.2C67.2633 41.2128 67.1275 41.2113 66.9924 41.2113C65.3035 41.2132 63.6146 41.2143 61.9253 41.2157C61.8579 41.2157 61.7902 41.2161 61.7229 41.2143C61.5084 41.2091 61.329 41.1209 61.1851 40.9683C61.0775 40.8537 60.9802 40.7289 60.885 40.6037C58.1594 37.0191 55.4353 33.4333 52.7094 29.849C51.8236 28.6839 50.9334 27.5221 50.045 26.3591C49.963 26.2519 49.873 26.1501 49.7972 26.0385C49.6292 25.791 49.4037 25.6904 49.1043 25.7131C48.8129 25.7354 48.5197 25.7358 48.2272 25.7361C45.7499 25.7376 43.2728 25.7365 40.7955 25.7372C39.9642 25.7376 40.026 25.6842 40.026 26.5001C40.0257 30.8465 40.026 35.1929 40.0257 39.5393C40.0257 39.7194 40.0297 39.8998 40.0231 40.0795C40.0191 40.1912 40.0136 40.3069 39.9825 40.413C39.8507 40.864 39.5645 41.2157 38.9528 41.2095C37.9846 41.1996 37.0161 41.1901 36.0479 41.1806C35.8228 41.1784 35.5976 41.1766 35.3722 41.1725C35.2598 41.1707 35.147 41.1682 35.035 41.1594C34.3622 41.1063 34.0899 40.5678 34.0515 40.1348C34.0317 39.9112 34.042 39.6849 34.042 39.4595C34.0416 33.4465 34.0416 27.4338 34.0416 21.4209C34.046 21.4209 34.0496 21.4209 34.0533 21.4209ZM40.0264 12.8994C40.0264 15.2626 40.0209 17.6257 40.0286 19.9889C40.0323 21.1064 39.8697 20.9424 40.9924 20.9454C44.841 20.9549 48.6895 20.9549 52.5378 20.9564C52.7625 20.9564 52.9894 20.9512 53.2113 20.9201C54.081 20.7979 54.9368 20.6185 55.7714 20.3348C56.927 19.9417 57.9127 19.2982 58.7253 18.39C59.5636 17.4537 60.1906 16.4009 60.4849 15.1667C60.848 13.6424 60.7902 12.1292 60.3374 10.6354C59.8952 9.17599 59.0548 7.97537 57.9142 6.96838C56.8724 6.04888 55.6725 5.48774 54.3076 5.2542C53.3738 5.09461 52.4353 5.01152 51.4879 5.01225C47.9318 5.01481 44.3761 5.01335 40.82 5.01335C40.6399 5.01335 40.4598 5.01408 40.2801 5.01811C40.2358 5.01921 40.1867 5.02396 40.149 5.0441C40.1121 5.06386 40.0626 5.1034 40.0597 5.1378C40.0418 5.33876 40.0275 5.54082 40.0275 5.74214C40.0257 8.12801 40.0264 10.5135 40.0264 12.8994Z" fill="#1767B3"/>
                    <path d="M0.000365922 20.5376C0.000365922 14.4557 0.000365922 8.37394 0.000365922 2.29214C0.000365922 2.06702 -0.00109801 1.84154 0.00183034 1.61642C0.00366055 1.48135 0.00439241 1.34555 0.0194002 1.21158C0.0962692 0.526344 0.509532 0.105761 1.19513 0.0263297C1.39536 0.00326898 1.59997 0.0109562 1.8024 0.0105901C4.07735 0.00949198 6.35268 0.00985773 8.62764 0.00985773C9.97907 0.00985773 11.3309 0.0179105 12.6823 0.00766128C14.1922 -0.00368605 15.7011 0.0248655 17.2062 0.144562C19.185 0.301594 21.143 0.585277 23.0373 1.20901C23.5937 1.39204 24.1347 1.61349 24.6636 1.86679C25.8642 2.44148 26.8617 3.26435 27.6912 4.30061C28.678 5.53345 29.3471 6.92295 29.7388 8.44715C29.9859 9.40911 30.1367 10.3864 30.1689 11.3813C30.1938 12.1475 30.2044 12.914 30.1469 13.6779C30.0166 15.4005 29.6239 17.0543 28.8219 18.5986C28.3405 19.5258 27.73 20.356 27.0048 21.1056C26.2255 21.9113 25.2987 22.4995 24.2811 22.9505C23.3316 23.3715 22.3429 23.6793 21.3293 23.9C19.986 24.1929 18.6268 24.3711 17.2553 24.4842C15.9734 24.59 14.6911 24.6072 13.4074 24.6094C10.997 24.6131 8.587 24.6109 6.17661 24.6101C5.52396 24.6098 5.54226 24.5875 5.54226 25.2299C5.54299 29.8475 5.54262 34.4655 5.54262 39.0831C5.54262 39.2859 5.53896 39.4887 5.54079 39.6911C5.54262 39.9203 5.48955 40.1395 5.41304 40.3515C5.27322 40.7373 5.00601 40.9979 4.60116 41.0898C4.40496 41.1341 4.20108 41.1637 4.00048 41.1655C3.167 41.1736 2.33352 41.174 1.50004 41.1648C1.29945 41.1626 1.09593 41.1289 0.900466 41.0817C0.551261 40.9975 0.302718 40.7794 0.1563 40.4499C0.0735748 40.2636 0.0131774 40.0703 0.00988305 39.8639C0.00585658 39.6161 0.0010983 39.3683 0.0010983 39.1208C1.74628e-07 32.9266 0.000365922 26.7321 0.000365922 20.5376ZM5.54226 12.269C5.54226 14.544 5.54189 16.8189 5.54262 19.0939C5.54262 19.2963 5.54848 19.4991 5.55434 19.7015C5.5569 19.7912 5.6356 19.8798 5.71466 19.8845C5.84937 19.8922 5.98407 19.9028 6.11878 19.9028C8.77662 19.9036 11.4345 19.9065 14.0923 19.9014C15.4898 19.8988 16.8826 19.826 18.2645 19.5961C19.0211 19.4705 19.7656 19.3 20.49 19.0474C21.0661 18.8468 21.6167 18.5902 22.1145 18.2329C23.0618 17.5532 23.691 16.6385 24.0725 15.5473C24.5022 14.3177 24.6135 13.0446 24.5571 11.7525C24.5436 11.4377 24.5128 11.1233 24.4736 10.8103C24.3583 9.88716 24.1175 9.00097 23.6683 8.17957C23.1694 7.26703 22.4725 6.55214 21.5544 6.05579C21.0369 5.77577 20.49 5.57078 19.927 5.4068C19.0167 5.14105 18.084 4.98072 17.1429 4.88775C16.1798 4.79258 15.2142 4.7168 14.2438 4.72193C12.7346 4.72962 11.2254 4.7212 9.71661 4.72047C8.50025 4.71973 7.28389 4.71973 6.06753 4.72156C5.93283 4.72193 5.79739 4.72998 5.66415 4.74792C5.62901 4.75268 5.57593 4.80466 5.57301 4.83833C5.5558 5.03966 5.54336 5.24208 5.54336 5.44413C5.54153 7.71909 5.54226 9.99405 5.54226 12.269Z" fill="#1767B3"/>
                    <path d="M149.36 20.8217C149.884 19.6518 150.408 18.4816 150.934 17.3121C152.991 12.7362 155.05 8.16064 157.106 3.584C157.291 3.17221 157.497 2.77432 157.764 2.40791C158.162 1.86141 158.675 1.48145 159.329 1.2955C159.763 1.17215 160.198 1.06563 160.654 1.06892C161.623 1.07588 162.591 1.07624 163.559 1.07954C163.626 1.0799 163.694 1.08027 163.761 1.08722C163.951 1.10772 164.109 1.19704 164.209 1.3559C164.304 1.50708 164.38 1.67179 164.451 1.83688C164.913 2.91195 165.371 3.98812 165.83 5.06465C167.709 9.4729 169.586 13.8815 171.465 18.2901C172.047 19.6562 172.63 21.0216 173.213 22.3873C173.275 22.5322 173.346 22.675 173.388 22.8258C173.423 22.9535 173.429 23.0912 173.432 23.2248C173.434 23.3167 173.389 23.4027 173.314 23.4579C173.225 23.5246 173.131 23.5912 173.03 23.6358C172.18 24.0081 171.302 24.2746 170.37 24.3456C169.808 24.3884 169.247 24.4302 168.684 24.3932C168.571 24.3859 168.459 24.3796 168.347 24.3668C168.2 24.35 168.101 24.2643 168.041 24.1329C167.976 23.9894 167.915 23.8441 167.853 23.6992C166.876 21.4015 165.901 19.1024 164.92 16.8058C163.753 14.0748 162.649 11.3181 161.52 8.57171C161.418 8.32316 161.335 8.06437 161.163 7.84841C161.09 7.7569 160.962 7.76312 160.895 7.8722C160.859 7.9293 160.823 7.9864 160.793 8.0468C160.724 8.18846 160.655 8.33012 160.594 8.47507C158.435 13.5708 156.276 18.6668 154.118 23.7629C154.091 23.8251 154.07 23.8891 154.046 23.9525C153.901 23.8979 153.751 23.8547 153.612 23.787C152.872 23.4239 152.158 23.0139 151.474 22.5538C150.715 22.0432 149.995 21.4839 149.36 20.8217Z" fill="#1767B3"/>
                    <path d="M79.5577 21.0145C79.5544 27.3178 79.5511 33.6214 79.5471 39.9247C79.5471 40.0821 79.5511 40.2406 79.5364 40.3969C79.4943 40.8413 79.0836 41.2227 78.629 41.2457C78.5166 41.2516 78.4039 41.2487 78.2915 41.2487C77.256 41.2487 76.2205 41.2487 75.1845 41.2487C75.0945 41.2487 75.0041 41.2439 74.9144 41.249C74.5956 41.2673 74.3503 41.1271 74.1454 40.8987C74.0055 40.7428 73.921 40.5623 73.918 40.35C73.9151 40.1476 73.9133 39.9448 73.9133 39.7424C73.9129 34.497 73.9129 29.2512 73.9129 24.0058C73.9129 17.4994 73.9129 10.9934 73.9129 4.48697C73.9129 4.28418 73.9049 4.08139 73.9151 3.87934C73.9664 2.8471 74.3789 2.01142 75.2735 1.45357C75.54 1.28739 75.8218 1.1439 76.1048 1.007C76.5759 0.779319 77.0656 0.646812 77.6015 0.680488C78.095 0.711235 78.5917 0.689272 79.0866 0.694396C79.2374 0.695861 79.3362 0.785907 79.3999 0.914022C79.5222 1.16074 79.5602 1.42795 79.5705 1.69882C79.5774 1.87855 79.5727 2.05901 79.5727 2.2391C79.5727 8.4977 79.5727 14.7563 79.5727 21.0149C79.5676 21.0145 79.5624 21.0145 79.5577 21.0145Z" fill="#1767B3"/>
                    <path d="M149.36 20.8217C149.995 21.4839 150.714 22.0432 151.474 22.5534C152.158 23.0136 152.872 23.4235 153.612 23.7866C153.75 23.8544 153.901 23.8976 154.046 23.9521C154.182 24.029 154.313 24.1179 154.456 24.1805C156.215 24.9521 158.036 25.5158 159.935 25.8277C161.715 26.1198 163.504 26.3105 165.306 26.3793C165.823 26.3991 166.34 26.4262 166.858 26.4441C168.166 26.4895 169.472 26.428 170.772 26.3105C172.301 26.1721 173.789 25.8167 175.247 25.3332C177.328 24.6432 179.296 23.7087 181.185 22.601C183.425 21.2873 185.53 19.7858 187.472 18.0603C187.907 17.6734 188.399 17.5244 188.96 17.5533C189.388 17.5753 189.738 17.7663 190.011 18.0903C190.082 18.1737 190.138 18.2792 190.171 18.3838C190.311 18.8359 190.272 19.2598 190.012 19.6752C188.344 22.3378 186.303 24.6534 183.746 26.4979C183.436 26.7219 183.122 26.9408 182.811 27.1638C181.559 28.0617 180.201 28.756 178.762 29.3003C176.905 30.0024 175.006 30.5562 173.051 30.9033C171.677 31.1474 170.294 31.3421 168.894 31.3689C168.535 31.3758 168.173 31.3813 167.814 31.3549C166.961 31.292 166.109 31.2126 165.257 31.1339C164.719 31.0841 164.183 31.0094 163.645 30.9695C161.862 30.837 160.132 30.4355 158.424 29.9336C157.647 29.7056 156.877 29.4534 156.111 29.1905C154.529 28.6481 153.036 27.9163 151.616 27.0345C150.695 26.4624 149.833 25.8127 149.076 25.0319C148.73 24.6754 148.419 24.2921 148.154 23.8701C148.041 23.6889 147.996 23.4978 148.032 23.2903C148.083 23.0022 148.12 22.7097 148.202 22.4301C148.395 21.7606 148.782 21.2207 149.36 20.8217Z" fill="#EC2028"/>
                    <path d="M143.639 41.3281C142.807 41.3281 141.975 41.3281 141.143 41.3281C140.962 41.3281 140.785 41.3171 140.621 41.2234C140.523 41.1674 140.452 41.0466 140.487 40.9438C140.573 40.6887 140.652 40.4295 140.758 40.1828C140.998 39.6257 141.254 39.0755 141.5 38.5213C142.863 35.4627 144.224 32.4036 145.587 29.3453C145.678 29.14 145.77 28.9343 145.876 28.7366C145.986 28.5309 146.253 28.4657 146.464 28.581C146.543 28.6242 146.619 28.6722 146.694 28.7216C147.893 29.517 149.092 30.3117 150.289 31.1104C150.692 31.3791 150.739 31.4984 150.57 31.9512C150.326 32.6031 150.073 33.2532 149.801 33.8942C148.88 36.0663 147.948 38.2336 147.02 40.4031C146.941 40.5891 146.856 40.7732 146.786 40.9625C146.697 41.207 146.522 41.3124 146.27 41.3142C146.09 41.3157 145.91 41.3259 145.731 41.3263C145.033 41.3278 144.336 41.327 143.639 41.327C143.639 41.327 143.639 41.3274 143.639 41.3281Z" fill="#1767B3"/>
                    <path d="M178.48 41.3262C177.49 41.3262 176.501 41.3262 175.511 41.3266C175.385 41.3266 175.299 41.2578 175.239 41.1578C175.193 41.0813 175.16 40.9971 175.124 40.9148C175 40.6256 174.879 40.335 174.756 40.0458C174.253 38.8679 173.749 37.6903 173.246 36.512C173.185 36.3678 173.13 36.2207 173.076 36.0728C173.042 35.978 173.14 35.8363 173.243 35.822C173.287 35.8158 173.331 35.8067 173.376 35.8037C174.026 35.7605 174.678 35.7313 175.327 35.6712C175.752 35.6321 176.175 35.5662 176.593 35.4812C177.284 35.3411 177.922 35.0687 178.493 34.6489C178.542 34.613 178.644 34.6335 178.673 34.68C178.721 34.7561 178.771 34.8308 178.812 34.9106C178.915 35.1104 179.015 35.3118 179.112 35.5146C179.903 37.179 180.694 38.8437 181.482 40.5096C181.568 40.6915 181.665 40.8705 181.69 41.077C181.704 41.189 181.625 41.3145 181.516 41.3196C181.359 41.3273 181.202 41.3317 181.044 41.3317C180.189 41.3328 179.335 41.3321 178.48 41.3321C178.48 41.3302 178.48 41.3281 178.48 41.3262Z" fill="#1767B3"/>
                    </svg>

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
                                <p className='xl'>Online <span className='fwb700'>3</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>0</span></p>
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
                                        <h1 className='md'><Icon icon="mingcute:steering-wheel-fill" /></h1>
                                            <Detakred fill="blue"  className='detak'/>
                                    </div>
                                            <p className='text-center fwb700 tt xl'>Driver</p>
                                </div>
                            </div>
                            <div className='hr-main tg'></div>
                            <div className='lower-hr gap-3 tg'>
                                <p className='xl '>Online <span className='fwb700'>3</span></p>
                                <div className='vl'></div>
                                <p className='xl '>Offline <span className='fwb700'>0</span></p>
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
                                <h1 className='xl tg'>{Operator.length}</h1>
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
                </Tab> 
                <Tab eventKey="second" title="Mingguan"> 
                <div className='main-new-header px-5'>
                <div className='header-logo-prima'>
                    <img className='LogoPatra' src={LogoPatra} alt="LogoPatra" />
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
                        <p className='xl text-red'>Height <span className='fwb'>{priorityWeek.high}</span></p>
                    </div>
                </div>
            </div>

            <div className='SvgMaps'>
                <SvgMaps />
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
                                <p className='xl'>Online <span className='fwb700'>3</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>0</span></p>
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
                                <p className='xl '>Online <span className='fwb700'>3</span></p>
                                <div className='vl'></div>
                                <p className='xl '>Offline <span className='fwb700'>0</span></p>
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
                                <h1 className='xl tg'>{Operator.length}</h1>
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
                </Tab> 
                <Tab eventKey="third" title="Bulanan"> 
                <div className='main-new-header px-5'>
                <div className='header-logo-prima'>
                    <img className='LogoPatra' src={LogoPatra} alt="LogoPatra" />
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
                        <p className='xl text-red'>Height <span className='fwb'>{priorityMonth.high}</span></p>
                    </div>
                </div>
            </div>

            <div className='SvgMaps'>
                <SvgMaps />
            </div>

            <div className='main-new-bottom px-5'>
                <div className='main-new-bottom-left'>
                    <div className='main-parent-ticket-border gap-4'>
                        <h1 className='xl fwb text-blue'><Icon icon="ion:log-in-outline" /></h1>
                        <div className='count-ticket-border'>
                            <h1 className='sm fwb'>{openMonth.value}</h1>
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
                                <p className='xl'>Online <span className='fwb700'>3</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>0</span></p>
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
                                <p className='xl '>Online <span className='fwb700'>3</span></p>
                                <div className='vl'></div>
                                <p className='xl '>Offline <span className='fwb700'>0</span></p>
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
                                <h1 className='xl tg'>{Operator.length}</h1>
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
                </Tab> 
                <Tab eventKey="fourth" title="Tahunan"> 
                <div className='main-new-header px-5'>
                <div className='header-logo-prima'>
                    <img className='LogoPatra' src={LogoPatra} alt="LogoPatra" />
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
                        <p className='xl text-red'>Height <span className='fwb'>{priorityYear.high}</span></p>
                    </div>
                </div>
            </div>

            <div className='SvgMaps'>
                <SvgMaps />
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
                                <p className='xl'>Online <span className='fwb700'>3</span></p>
                                <div className='vl'></div>
                                <p className='xl'>Offline <span className='fwb700'>0</span></p>
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
                                <p className='xl '>Online <span className='fwb700'>3</span></p>
                                <div className='vl'></div>
                                <p className='xl '>Offline <span className='fwb700'>0</span></p>
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
                                <h1 className='xl tg'>{Operator.length}</h1>
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
                </Tab> 
            </Tabs>
            </div>
        )}
        </div>
        
    )
}

export default MainNew
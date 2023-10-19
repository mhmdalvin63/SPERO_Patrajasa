import { Route, Routes } from 'react-router-dom';
import './App.css'

import Navbar from './Parts/Navbar';
import Login from './Pages/Login';
import Main from './Pages/PageMain';
import Tracking from './Pages/PageTracking';
import Ticket from './Pages/PageTicket';
import ListTicket from './Pages/PageListTicket';
import DetailTicket from './Pages/PageDetailTicket';
import PAR from './Images/PAR.jpg'
function App() {

  document.title = "Patrajasa";
  const newFaviconUrl = PAR; // Provide the path to your new favicon image
  const linkElement = document.querySelector("link[rel='icon']");
  linkElement.href = newFaviconUrl;
  return (
    <div id='body'>
      <Navbar />
       <Routes>
        <Route path='/' exact element={<Login />}/>
        <Route path='/main' element={<Main />}/>
        <Route path='/tracking' element={<Tracking />}/>
        <Route path='/ticket' element={<Ticket />}/>
        <Route path='/list-ticket' element={<ListTicket />}/>
        <Route path='/list-ticket/:id' element={<DetailTicket />}/>
      </Routes>
    </div>
  );
}

export default App;
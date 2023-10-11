import { Route, Routes } from 'react-router-dom';
import './App.css'

import Navbar from './Parts/Navbar';
import Login from './Pages/Login';
import Main from './Pages/PageMain';
import Tracking from './Pages/PageTracking';
import Ticket from './Pages/PageTicket';
import ListTicket from './Pages/PageListTicket';

function App() {
  return (
    <div id='body'>
      <Navbar />
       <Routes>
        <Route path='/' exact element={<Login />}/>
        <Route path='/main' element={<Main />}/>
        <Route path='/tracking' element={<Tracking />}/>
        <Route path='/ticket' element={<Ticket />}/>
        <Route path='/list-ticket' element={<ListTicket />}/>
      </Routes>
    </div>
  );
}

export default App;
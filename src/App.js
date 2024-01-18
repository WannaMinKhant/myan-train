import Layout from './Layout/layout';
import AddTrain from './Page/Train/AddTrain';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AddStation from './Page/Station/AddStation';
import AddMessage from './Page/Message/AddMessage';
import AddMarquee from './Page/Message/AddMarquee';
import ActionMarquee from './Page/ActionMarquee';
import LoginPage from './Page/Authentication/LoginPage';
import DashboardPage from './Page/Dashboard/DashboardPage';
import StationAccount from './Page/Station/StationAccount';
import Auth from './Page/Authentication/Auth';
import LanePage from './Page/Lane/LanePage';
import AdvertisePage from './Page/Advertise/AdvertisePage';
import socketIO from 'socket.io-client';
import TimeTable from './Page/TimeTable/TimeTable';
import StationDepature from './Page/StationDepature/StationDepature';
import StationDepatureList from './Page/StationDepature/StationDepatureList';

function App() {

  const socket = socketIO.connect('http://localhost:3500')

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage socket={socket}/>} />
        <Route path="/train" element={<AddTrain />} />
        <Route path="/lane" element={<LanePage />} />
        <Route path="/station" element={<AddStation />} />
        <Route path="/station-account" element={<StationAccount />} />
        <Route path="/message" element={<AddMessage />} />
        <Route path="/marquee" element={<AddMarquee socket={socket}/>} />
        <Route path="/actionMarquee" element={<ActionMarquee  socket={socket}/>} />
        <Route path="/ads-manager" element={<AdvertisePage />} />
        <Route path="/time-table" element={<TimeTable />} />
        <Route path="/time-duration" element={<StationDepature />} />
        <Route path="/time-duration-all" element={<StationDepatureList />} />
      </Routes>
    </Layout>
  );
}

export default App;

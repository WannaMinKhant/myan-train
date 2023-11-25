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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/train" element={<AddTrain />} />
        <Route path="/lane" element={<LanePage />} />
        <Route path="/station" element={<AddStation />} />
        <Route path="/station-account" element={<StationAccount />} />
        <Route path="/message" element={<AddMessage />} />
        <Route path="/marquee" element={<AddMarquee />} />
        <Route path="/actionMarquee" element={<ActionMarquee />} />
        <Route path="/ads-manager" element={<AdvertisePage />} />
      </Routes>
    </Layout>
  );
}

export default App;

import Layout from './Layout/layout';
import AddTrain from './Page/AddTrain';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AddCategory from './Page/addCategory';
import AddStation from './Page/AddStation';
import AddMessage from './Page/AddMessage';
import AddMarquee from './Page/AddMarquee';
import ActionMarquee from './Page/ActionMarquee';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/train" element={<AddTrain />} />
        <Route path="/category" element={<AddCategory />} />
        <Route path="/station" element={<AddStation />} />
        <Route path="/message" element={<AddMessage />} />
        <Route path="/marquee" element={<AddMarquee />} />actionMarquee
        <Route path="/actionMarquee" element={<ActionMarquee />} />
      </Routes>
    </Layout>
  );
}

export default App;

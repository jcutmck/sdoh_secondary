import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SdohForm from './pages/SdohForm';
import Success from './pages/Success';
//<Route path="/orderreq/:orderId" exact element={<PrintTemplate />} />
//<Route path="/404" exact element={<NotFound />} />

function App() {
  return (
    <div className="Home">
      <header className="py-16"></header>
      <div className="App-body">
        <Router>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/form" exact element={<SdohForm />} />
            <Route path="/success" exact element={<Success />} />
          </Routes>
        </Router>
      </div>
    </div>
    );
}

export default App;

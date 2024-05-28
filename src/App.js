import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LandingPageNEW from './pages/LandingPageNEW';
import FstackForm from './pages/FstackForm';
//import FstackFormIframe from './pages/FstackFormIframe';
import SdohForm from './pages/SdohForm';
//<Route path="/orderreq/:orderId" exact element={<PrintTemplate />} />
//<Route path="/404" exact element={<NotFound />} />

function App() {
  return (
    <div className="Home">
      <header className="py-16"></header>
      <div className="App-body">
        <Router>
          <Routes>
            <Route path="/" exact element={<LandingPageNEW />} />
            <Route path="/utform" exact element={<SdohForm />} />
            <Route path="/fsform" exact element={<FstackForm />} />
          </Routes>
        </Router>
      </div>
    </div>
    );
}

export default App;

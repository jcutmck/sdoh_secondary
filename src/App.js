import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SdohForm from './pages/SdohForm';
import SuccessPage from './pages/SplashSuccess';
import FailedPage from './pages/SplashFailed';
import InvalidPage from './pages/SplashInvalid';
import Layout from '../src/components/Layout';


function App() {
  return (
    <div className="Home">
      <header className="py-16"></header>
      <div className="App-body">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" exact element={<LandingPage />} />
              <Route path="/utform" exact element={<SdohForm />} />
              <Route path="/successpage" exact element={<SuccessPage />} />
              <Route path="/faileddpage" exact element={<FailedPage />} />
              <Route path="/validationfail" exact element={<InvalidPage />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </div>
    );
}

export default App;

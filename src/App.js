import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SdohForm from './pages/SdohForm';
import Layout from '../src/components/Layout';
import CheckEnv from './components/CheckEnv';

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
            </Routes>
          </Layout>
        </Router>
      </div>
      <h1>Environment Check</h1>
      <CheckEnv />
    </div>
    );
}

export default App;

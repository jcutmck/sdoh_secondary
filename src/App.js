import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import VerifyVisit from './pages/VerifyVisit';
import SdohForm from './pages/SdohForm';
import ValidateUsr from './pages/ValidateUsr';
import SuccessPage from './pages/SplashSuccess';
import FailedPage from './pages/SplashFailed';
import InvalidPage from './pages/SplashInvalid';
//import WelcomeStart from './pages/WelcomeStart';
//import VisitFormsCheck from './pages/VisitFormsCheck;
import SDOHWelcome from './pages/WelcomeSDOH';
import Layout from '../src/components/Layout';
import createEmotionCache from '../src/components/EmotionCache'; // You'll need to create this file
//<Route path="/" exact element={<SDOHWelcome />} />

const clientSideEmotionCache = createEmotionCache();

function App({ emotionCache = clientSideEmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <div className="Home">
        <header className="py-16"></header>
        <div className="App-body">
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/sdoh" replace />} /> {/* Redirect root to /sdoh */}
                <Route path="/sdoh" exact element={<VerifyVisit />} />
                <Route path="/validateusr" exact element={<ValidateUsr />} />
                <Route path="/utform" exact element={<SdohForm />} />
                <Route path="/successpage" exact element={<SuccessPage />} />
                <Route path="/faileddpage" exact element={<FailedPage />} />
                <Route path="/validationfail" exact element={<InvalidPage />} />
              </Routes>
            </Layout>
          </Router>
        </div>
      </div>
    </CacheProvider>
    );
}

export default App;

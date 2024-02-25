import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AuthSession } from '@supabase/supabase-js';
import { supabase } from './hooks/supabaseClient';
import HomeScreen from './components/HomeScreen';
import InitialScreen from './components/InitialScreen';
import CurrentScreenProvider from './hooks/CurrentScreenContext';
import PingTestPage from './PingTestPage';

function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const debug = true; // Set to true to bypass login for debugging

  useEffect(() => {
    if (!debug) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    }
  }, [debug]);

  const rootElement = document.getElementById('root') as Element;

  const router = [
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <InitialScreen /> },
    { path: '/home', element: <HomeScreen /> },
    { path: '/ping-test', element: <PingTestPage /> },
  ];

  createRoot(rootElement).render(
    <Router>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <CurrentScreenProvider>
          <Routes>
            {router.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </CurrentScreenProvider>
      </div>
    </Router>
  );
}

export default App;

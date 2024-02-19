// App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthSession } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Account from './Account';
import PingTestPage from './PingTestPage'; // Import your new component

function App() {
  console.log("In App");

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

  return (
    <Router>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <Routes>
          {/* <Route path="/" element={!session && !debug ? <Auth /> : <Navigate to="/account" />} /> */}
          <Route path="/" element={<Navigate to="/ping-test" />} />
          {/* <Route path="/account" element={<Account session={session} />} /> */}
          <Route path="/ping-test" element={<PingTestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

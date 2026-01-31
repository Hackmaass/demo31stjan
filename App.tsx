import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Assistant } from './pages/Assistant';
import { Layout } from './components/Layout';
import { logoutUser } from './services/authService';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check local storage or initial auth state
    const auth = localStorage.getItem('aura_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsReady(true);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('aura_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem('aura_auth');
    setIsAuthenticated(false);
  };

  if (!isReady) return null; // Or a loading spinner

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        <Route 
          path="/assistant" 
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Assistant />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        <Route 
            path="/vitals" 
            element={
                isAuthenticated ? (
                <Layout onLogout={handleLogout}>
                    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">🩺</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Vitals</h2>
                        <p className="text-gray-500 mt-2">Connect a device to start tracking detailed vitals.</p>
                    </div>
                </Layout>
                ) : (
                <Navigate to="/login" replace />
                )
            } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

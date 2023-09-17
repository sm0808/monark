// App.tsx
import React, { useState, useEffect } from 'react';
import Login from './pages/login/login';
import Profile from './pages/profille/profile';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a token is already stored in local storage (you can use a more secure storage method)
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const handleLogin = (newToken: string) => {
    // Save the token in the state and local storage
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const handleLogout = () => {
    // Remove the token from the state and local storage
    setToken(null);
    localStorage.removeItem('authToken');
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div data-testid="main-div">
      {token ? (
        <Profile token={token} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;

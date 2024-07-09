import { useState, useEffect } from 'react';
 

const useAuth = () => {
  const [user, setUser] = useState(null);
 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, navigate) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate('admin/emails');
  };

  const logout = (navigate) => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
   
  };

  return { user, loading, login, logout,setUser };
};

export default useAuth;

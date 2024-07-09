import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import PublicHeader from './components/PublicHeader';
import Home from './screens/Home';
import { ThemeProvider } from './ThemeContext';
import TopStoryDetail from './screens/TopStoryDetail';
import FeaturedStoryDetail from './screens/FeaturedStoryDetail';
import AdminHeader from './components/AdminHeader';
import Emails from './screens/admin/Emails';
import AddUsers from './screens/admin/AddUsers';
import StoryEditor from './screens/admin/StoryEditor';
import Auth from './screens/admin/Auth';
import useAuth from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();
  const ADMIN_USER_ID = 'UhcvKoAb8lP5V9da9qMBy9PNxR03';
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ThemeProvider>
        <Router>
          <div>
            <MainHeader/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topDetails/:id" element={<TopStoryDetail />} />
              <Route path="/featureDetails/:id" element={<FeaturedStoryDetail />} />
              <Route path="/admin/*" element={<AdminRoutes   user={user}  ADMIN_USER_ID={ADMIN_USER_ID} />} />
            </Routes>
          </div>
        </Router>

      </ThemeProvider >
    </>
  );
}

const MainHeader = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return isAdminRoute ? <AdminHeader /> : <PublicHeader />;
};

 

const AdminRoutes = ({ user,  ADMIN_USER_ID }) => (
  <div>
    <Routes>
    <Route path="/" element={<Auth />} />
    {user &&<Route path="/emails" element={<Emails />} /> }
    {user &&  <Route path="/stories" element={<StoryEditor />} /> }
      {user && user.uid === ADMIN_USER_ID ? (
        <Route path="/add-users" element={<AddUsers />} />
      ) : (
        <Route path="/add-users" element={<Navigate to="/" replace />} />
      )}
      {!user && <Route path="*" element={<Navigate to="/" replace />} />}
      {!user && <Route path="*" element={<Navigate to="/" replace />} />}
    </Routes>
  </div>

);

export default App;

import React from 'react'
import Login from '../../components/admin/Login'
import useAuth from '../../hooks/useAuth';
 

const Auth = () => {
  const { setUser } = useAuth();
  return (
    <div className='auth_contaner'>
        <Login setUser={setUser} />
    </div>
  )
}

export default Auth
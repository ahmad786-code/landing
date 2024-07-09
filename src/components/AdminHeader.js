import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import './adminHeader.css'
import useAuth from '../hooks/useAuth'
   
const AdminHeader = ({  admin, user }) => {
    const {  logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
      };
    return (
        <nav>
            <ul>
                <li>
                    <Link to="admin/emails">Emails</Link>
                </li>
                <li>
                    <Link to="admin/stories">Add Stories</Link>
                </li>

                {user && user.uid === admin && (
                    <li>
                        <Link to="admin/add-users">Add Users</Link>
                    </li>
                )}

                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>


            </ul>
        </nav>
    )
}

export default AdminHeader
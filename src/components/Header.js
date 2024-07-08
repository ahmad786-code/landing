import React, { useContext } from 'react'
import './header.css'
import Logo from '../logo.png'
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';


const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className={`header ${theme}`}>
            <div className='nav'>
                <div className='left'>

                    <Link  style={{ textDecoration: 'none' }} className='link'>Thermoplae.</Link>
                </div>
                <div className='center'>
                    <div className='header__logo'>
                        <Link to='/'>
                            <img src={Logo} className='logo' alt="Logo" />
                        </Link>
                    </div>
                </div>
                <div className='right'>
                    <button className='btn_blub' onClick={toggleTheme}>

                        <i className="fa-solid fa-lightbulb icon_blub"></i>

                    </button>

                </div>
                <div className="social_link">
                    <a className="typewriter-override top-brand">Social Link.</a>
                </div>

            </div>
        </header>
    )
}

export default Header


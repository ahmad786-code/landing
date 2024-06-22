import React from 'react'
import './header.css'
import Logo from '../logo.png'


const Header = () => {
    return (
        <header className='header'>
            <div className='nav'>
                <div className='left'>
                    <i class="fa fa-bars bars"></i>
                    <a className='link'>Post</a>
                </div>
                <div className='center'>
                    <div className='header__logo'>
                        <img src={Logo} className='logo' alt="Logo" />
                    </div>
                </div>
                <div className='right'>
                    <button className='btn_blub'>
                        <i class="fa-solid fa-lightbulb icon_blub"></i>
                    </button>
                    <button className='btn_sign'>
                        <i class="fa fa-user"></i>
                        Sign In
                    </button>
                </div>
                <div  class="social_link">
                    <a class="typewriter-override top-brand">Social Link.</a>
                </div>

            </div>
        </header>
    )
}

export default Header


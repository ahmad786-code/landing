import React from 'react'
import './subscribe.css'
const Subscriber = () => {
    return (
        <form className='subscribe'>
            <input type="text" placeholder='Subscribe' className='subscribe_input' />
            <input type="button" value="Subscribe" className='subscribe_button' />
        </form>
    )
}

export default Subscriber
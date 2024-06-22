import React, { useState, useEffect } from 'react'
import './subscribe.css'
const Subscriber = () => {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(validateEmail(email));
      }, [email]);

      
    const handleChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsValid(validateEmail(emailValue));
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    return (
        <form className='subscribe'>
            <input type="email" placeholder='example@gmail.com' className='subscribe_input' value={email}
                onChange={handleChange} />
            <input type="button" value="Subscribe" className='subscribe_button' disabled={!isValid} />
        </form>
    )
}

export default Subscriber
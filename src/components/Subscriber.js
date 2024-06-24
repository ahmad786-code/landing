
import React, { useState, useEffect, useContext } from 'react';
import './subscribe.css';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import Popup from './Popup';
import { ThemeContext } from '../ThemeContext';

const Subscriber = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      await addDoc(collection(db, 'subscribers'), {
        email: email,
        subscribedAt: new Date(),
      });
      alert('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <div>
      <div className='popup'>
      <button className={`popup_btn ${theme}`}   onClick={() => setIsPopupOpen(true)}>Subscribe</button>
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <form className='subscribe' onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder='example@gmail.com'
            className='subscribe_input'
            value={email}
            onChange={handleChange}
          />
          <button
            type="submit"
            className='subscribe_button'
            disabled={!isValid}
          >
            Subscribe
          </button>
        </form>
      </Popup>
    </div>
  );
}

export default Subscriber;

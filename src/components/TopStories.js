import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import './topStoreis.css'; // Ensure this imports your CSS file
import { ThemeContext } from '../ThemeContext';

const TopStories = () => {
  const { theme } = useContext(ThemeContext);
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'top_stories'), orderBy('timestamp', 'desc'), limit(1));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const storiesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStory(storiesList[0]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="top_stories">
      <h4 className={`top_story_title ${theme}`}>Top Story</h4>
      {story && (
        <div className={`story-link ${theme}`} onClick={() => navigate(`/topDetails/${story.id}`)}>
          <div className="story-content">
            <img src={story.imgSrc} alt={story.title} className="story-image" />
            <h1 className="story-title">{story.title}</h1>
            <div className="top_story_info">
              <span className={`top_story_author ${theme}`}>{story.author}</span>
              <span className="top_story_date">{story.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopStories;

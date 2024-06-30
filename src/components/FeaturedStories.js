import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import './featuredStories.css'; // Ensure this imports your CSS file
import { ThemeContext } from '../ThemeContext';

const FeaturedStories = () => {
  const { theme } = useContext(ThemeContext);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = () => {
      try {
        const q = query(
          collection(db, 'featured_stories'), 
          orderBy('date', 'desc'),
          limit(3)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedStories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setStories(fetchedStories);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="featured_stories">
      <h4 className={`featured_stories_title ${theme}`}>Featured Stories</h4>
      {stories.map((story) => (
        <div key={story.id} className={`story-link ${theme}`} onClick={() => navigate(`/featureDetails/${story.id}`)}>
          <img src={story.imgSrc} alt={story.title} />
          <h1>{story.title}</h1>
          <div className="top_story_info">
            <span className={`top_story_author ${theme}`}>{story.author}</span>
            <span className="top_story_date">{story.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedStories;

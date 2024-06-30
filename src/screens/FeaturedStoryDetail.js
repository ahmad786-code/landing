

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './storyDetail.css';
import { ThemeContext } from '../ThemeContext';

const FeaturedStoryDetail = () => {
    const { theme } = useContext(ThemeContext);
    const { id } = useParams();
    const [story, setStory] = useState(null);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const docRef = doc(db, 'featured_stories', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setStory(docSnap.data());
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching story:', error);
            }
        };

        fetchStory();
    }, [id]);

    if (!story) {
        return <div>Loading...</div>;
    }

    return (
        <section className='story_detail_section'>
            <div className={`story_detail ${theme}`}>
                <h1>{story.title}</h1>
                <img src={story.imgSrc} alt={story.title} />
                <div className="top_story_info">
                    <span className={`top_story_author ${theme}`}>{story.author}</span>
                    <span className="top_story_date">{story.date}</span>
                </div>
                <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm]}>
                    {story.content}
                </ReactMarkdown>
            </div>
        </section>
    );
};

export default FeaturedStoryDetail;

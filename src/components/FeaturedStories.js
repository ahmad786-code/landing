

import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './featuredStories.css'; // Ensure this imports your CSS file
import { ThemeContext } from '../ThemeContext';

const FeaturedStories = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const storage = getStorage();
        const markdownRef = ref(storage, 'markdown/featured_story.md');
        const url = await getDownloadURL(markdownRef);
        const response = await fetch(url);
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    // Initial fetch
    fetchMarkdown();

    // Polling interval (e.g., every 30 seconds)
    const interval = setInterval(fetchMarkdown, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const parseMarkdownContent = (content) => {
    const storyDelimiter = '###'; // Assuming each story is separated by a markdown header
    const rawStories = content.split(storyDelimiter).slice(1); // Skip the first split as it will be empty
    return rawStories.map((rawStory, index) => {
      const imgMatch = rawStory.match(/!\[.*?\]\((.*?)\)/);
      const titleMatch = rawStory.match(/# (.*?)(\n|$)/);
      const authorDateMatch = rawStory.match(/\*\*(.*?)\*\* \| (.*?)(\n|$)/);
      return {
        id: index + 1,
        imgSrc: imgMatch ? imgMatch[1] : '',
        title: titleMatch ? titleMatch[1] : '',
        author: authorDateMatch ? authorDateMatch[1] : '',
        date: authorDateMatch ? authorDateMatch[2] : '',
        content: rawStory
      };
    }).slice(0, 3); // Limit to 3 stories
  };

  return (
    <article className='featured_stories'>
      <div>
        <h4 className={`featured_stories_title ${theme}`}>Featured Stories</h4>
      </div>
      <ReactMarkdown
        className="markdown-content"
        remarkPlugins={[remarkGfm]}
        children={markdownContent}
        components={{
          img: ({ node, ...props }) => <img {...props} />,
          h1: ({ node, ...props }) => <h1 {...props} />,
          p: ({ node, ...props }) => {
            if (props.children.length && typeof props.children[0] === 'string' && props.children[0].includes('|')) {
              const [author, date] = props.children[0].split('|');
              return (
                <div className="top_story_info">
                  <span className="top_story_author">{author.trim()}</span>
                  <span className="top_story_date">{date.trim()}</span>
                </div>
              );
            }
            return <p {...props} />;
          },
          a: ({ node, ...props }) => <a {...props} className="custom-link" target="_blank" rel="noopener noreferrer" />
        }}
      />
 
    </article >
  );
};

export default FeaturedStories;

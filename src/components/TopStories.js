import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './topStoreis.css';  // Ensure this imports your CSS file
import { ThemeContext } from '../ThemeContext';
 
 

const TopStories = () => {
  const { theme } = useContext(ThemeContext);
  const [markdownContent, setMarkdownContent] = useState('');
  

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const storage = getStorage();
        const markdownRef = ref(storage, 'markdown/top_story.md');
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


  return (
    <div className="top_stories">
      <h4 className={`top_story_title ${theme}`}>Top Story</h4>
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
                  <span className={`top_story_author ${theme}`}>{author.trim()}</span>
                  <span className="top_story_date">{date.trim()}</span>
                </div>
              );
            }
            return <p {...props} />;
          },
          a: ({ node, ...props }) => <a {...props} className={`custom-link ${theme}`} target="_blank" rel="noopener noreferrer" />
        }}
      />
    </div>
  );
};

export default TopStories;
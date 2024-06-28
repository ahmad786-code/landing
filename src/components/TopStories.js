 
import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './topStoreis.css';  // Ensure this imports your CSS file
import { ThemeContext } from '../ThemeContext';

const TopStories = () => {
  const { theme } = useContext(ThemeContext);
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const storage = getStorage();
        const markdownRef = ref(storage, 'markdown/top_story.md');
        const url = await getDownloadURL(markdownRef);
        const response = await fetch(url);
        const text = await response.text();
        const parsedStory = parseMarkdownContent(text);
        setStory(parsedStory);
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

  // Function to parse markdown content and extract the first story
  const parseMarkdownContent = (content) => {
    const storyDelimiter = '###'; // Assuming each story is separated by a markdown header
    const rawStories = content.split(storyDelimiter).slice(1); // Skip the first split as it will be empty
    if (rawStories.length > 0) {
      const rawStory = rawStories[0]; // Get only the first story
      const imgMatch = rawStory.match(/!\[.*?\]\((.*?)\)/);
      const titleMatch = rawStory.match(/# (.*?)(\n|$)/);
      const authorDateMatch = rawStory.match(/\*\*(.*?)\*\* \| (.*?)(\n|$)/);
      const urlMatch = rawStory.match(/\[external story\]\((.*?)\)/); // Match external URL link with specific text "external story"

      // Clean up content to remove the external link from display
      const contentWithoutLink = rawStory.replace(urlMatch ? urlMatch[0] : '', '').trim(); // Remove the link markdown from content

      return {
        imgSrc: imgMatch ? imgMatch[1] : '',
        title: titleMatch ? titleMatch[1] : '',
        author: authorDateMatch ? authorDateMatch[1] : '',
        date: authorDateMatch ? authorDateMatch[2] : '',
        url: urlMatch ? urlMatch[1] : '#', // External URL
        content: contentWithoutLink
      };
    }
    return null;
  };

  return (
    <div className="top_stories">
      <h4 className={`top_story_title ${theme}`}>Top Story</h4>
      {story && (
        <a href={story.url} target="_blank" rel="noopener noreferrer" className={`story-link ${theme}`}>
          <div>
            
            <ReactMarkdown
              className="markdown-content"
              remarkPlugins={[remarkGfm]}
              children={story.content}
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
        </a>
      )}
    </div>
  );
};

export default TopStories;

 

import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './featuredStories.css'; // Ensure this imports your CSS file
import { ThemeContext } from '../ThemeContext';

const FeaturedStories = () => {
  const { theme } = useContext(ThemeContext);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const storage = getStorage();
        const markdownRef = ref(storage, 'markdown/featured_story.md');
        const url = await getDownloadURL(markdownRef);
        const response = await fetch(url);
        const text = await response.text();
        const parsedStories = parseMarkdownContent(text);
        setStories(parsedStories.slice(0, 3)); // Limit to 3 stories
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchMarkdown();

    const interval = setInterval(fetchMarkdown, 30000);
    return () => clearInterval(interval);
  }, []);

  const parseMarkdownContent = (content) => {
    const storyDelimiter = '###';
    const rawStories = content.split(storyDelimiter).slice(1);
    return rawStories.map((rawStory) => {
      const imgMatch = rawStory.match(/!\[.*?\]\((.*?)\)/);
      const titleMatch = rawStory.match(/# (.*?)(\n|$)/);
      const authorDateMatch = rawStory.match(/\*\*(.*?)\*\* \| (.*?)(\n|$)/);
      const urlMatch = rawStory.match(/\[external story\]\((.*?)\)/);

      const contentWithoutLink = rawStory.replace(urlMatch ? urlMatch[0] : '', '').trim();

      return {
        imgSrc: imgMatch ? imgMatch[1] : '',
        title: titleMatch ? titleMatch[1] : '',
        author: authorDateMatch ? authorDateMatch[1] : '',
        date: authorDateMatch ? authorDateMatch[2] : '',
        url: urlMatch ? urlMatch[1] : '#',
        content: contentWithoutLink
      };
    });
  };

  return (
    <div className="featured_stories">
      <h4 className={`featured_stories_title ${theme}`}>Featured Stories</h4>
      {stories.map((story, index) => (
        <a key={index} href={story.url} target="_blank" rel="noopener noreferrer" className={`story-link ${theme}`}>
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
      ))}
    </div>
  );
};

export default FeaturedStories;

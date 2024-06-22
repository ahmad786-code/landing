import React from 'react'
import './featuredStories.css'

const articles = [
    {
      id: 1,
      imgSrc: 'https://images.squarespace-cdn.com/content/v1/631c7306be6a0b02522b9edc/1662808838987-MQD4W30D1YQY2XIO2H0S/np_file_173577-2.jpg?format=2500w',
      title: 'What Americans Don’t Understand About Physical Well-Being',
      author: 'Arthur de Bondeville',
      date: '06/17/2024',
      link: '#'
    },
    {
      id: 2,
      imgSrc: 'https://images.squarespace-cdn.com/content/v1/631c7306be6a0b02522b9edc/1662808838987-MQD4W30D1YQY2XIO2H0S/np_file_173577-2.jpg?format=2500w',
      title: 'The Future of Health and Wellness in America',
      author: 'Jane Doe',
      date: '07/18/2024',
      link: '#'
    },
    {
      id: 3,
      imgSrc: 'https://images.squarespace-cdn.com/content/v1/631c7306be6a0b02522b9edc/1662808838987-MQD4W30D1YQY2XIO2H0S/np_file_173577-2.jpg?format=2500w',
      title: 'How to Stay Fit and Healthy During a Pandemic',
      author: 'John Smith',
      date: '08/19/2024',
      link: '#'
    }
  ];

const FeaturedStories = () => {
    return (
        <article className='featured_stories'>
        {articles.map(article => (
        <div key={article.id} className='featured'>
          <img className='featured_img' src={article.imgSrc} alt={article.title} />
          <div className='featured_stories_content'>
            <h5 className='featured_title'>{article.title}</h5>
            <p className='featured_stories_author'>
              By: <a href={article.link} className='featured_link'> {article.author} </a> | {article.date}
            </p>
          </div>
        </div>
      ))}
    </article>
    )
}

export default FeaturedStories
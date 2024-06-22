import React from 'react'
import './topStoreis.css'

const TopStories = () => {
    return (
        <article className='top_stories'>
            <img className='top_img' src="https://images.squarespace-cdn.com/content/v1/631c7306be6a0b02522b9edc/1662808838987-MQD4W30D1YQY2XIO2H0S/np_file_173577-2.jpg?format=2500w" alt="" />
            <div className='top_author'>
                <h5 className='top_title'>Europe’s Bold Rebirth</h5>
                <p className='top_date'>
                By: <a href="" className='top_link'> Arthur de Bondeville </a> | 06/17/2024
                </p>
            </div>
        </article>
    )
}

export default TopStories
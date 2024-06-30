import React from 'react'
import TopStories from '../components/TopStories'
import FeaturedStories from '../components/FeaturedStories'
import Subscriber from '../components/Subscriber'

const Home = () => {
    return (
        <main>
            <section className="stories_section">
                <div className="stories">
                    <div className="top">
                        <TopStories />
                    </div>
                    <div className="featured">
                        <FeaturedStories />
                    </div>
                </div>
                <Subscriber />
            </section>
        </main>
    )
}

export default Home

import './App.css';
import Header from './components/Header';
import TopStories from './components/TopStories';
import FeaturedStories from './components/FeaturedStories';
import Subscriber from './components/Subscriber';

function App() {
  return (
    <div>
      <Header />
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
          <Subscriber/>
        </section>
      </main>
    </div>
  );
}

export default App;

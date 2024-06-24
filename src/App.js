
import './App.css';
import Header from './components/Header';
import TopStories from './components/TopStories';
import FeaturedStories from './components/FeaturedStories';
import Subscriber from './components/Subscriber';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <>
      <ThemeProvider>
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
            <Subscriber />
          </section>
        </main>
      </ThemeProvider >
    </>
  );
}

export default App;

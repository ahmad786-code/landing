
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import { ThemeProvider } from './ThemeContext';
import TopStoryDetail from './screens/TopStoryDetail';
import FeaturedStoryDetail from './screens/FeaturedStoryDetail';

function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <div>
          <Header />
            <Routes>
              
              <Route path="/" element={<Home />} />
              <Route path="/topDetails/:id" element={<TopStoryDetail />}/>
              <Route path="/featureDetails/:id" element={<FeaturedStoryDetail />}/>
           
            </Routes>
          </div>
        </Router>

      </ThemeProvider >
    </>
  );
}

export default App;

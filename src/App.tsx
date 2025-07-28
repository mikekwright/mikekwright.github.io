import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BlogHome from './components/BlogHome'
import BlogPost from './components/BlogPost'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<BlogHome />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/post/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

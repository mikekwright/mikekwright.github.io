import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Desktop from './components/Desktop'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Base</h1>
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="/blog" element={<Desktop />} />
          <Route path="/post/:slug" element={<Desktop />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

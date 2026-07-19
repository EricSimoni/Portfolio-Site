import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Placeholder from './pages/Placeholder.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          {/* Swap each placeholder out as the real page gets built */}
          <Route path="blackjack" element={<Placeholder title="Blackjack" />} />
          <Route path="projects" element={<Placeholder title="Projects" />} />
          <Route path="about" element={<Placeholder title="About" />} />
          <Route path="resume" element={<Placeholder title="Resume" />} />
          <Route path="contact" element={<Placeholder title="Contact" />} />
          <Route path="*" element={<Placeholder title="Not found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

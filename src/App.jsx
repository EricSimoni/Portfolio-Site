import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="shell">
      <div className="grid-backdrop" aria-hidden="true" />
      <Outlet />
    </div>
  )
}

export default App

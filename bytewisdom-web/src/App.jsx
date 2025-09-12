import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',           // <-- changed from 100vw
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'      // <-- prevents accidental horizontal scroll
      }}
    >
      <Header />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import logo from '../assets/bytewisdom-logo.png' // Adjust path if needed

export default function Header() {
  return (
    <header style={{
      width: '100%',
      background: '#F8FAFF',
      borderBottom: '1px solid #E6E8EC',
      boxShadow: '0 2px 8px rgba(44, 62, 80, 0.06)',
      borderRadius: '0 0 16px 16px',
      height: 80,
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 99
    }}>
      <div style={{
        width: '100%',
        maxWidth: 960,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 32px',
        height: 80
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img
            src={logo}
            alt="ByteWisdom logo"
            style={{
              height: 48, width: 48,
              objectFit: 'contain',
              display: 'block',
              borderRadius: 12,
              background: '#fff',
              border: '1px solid #F0F1F6',
              boxShadow: '0 2px 6px rgba(44,62,80,0.04)'
            }}
          />
          <h2 style={{
            margin: 0,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: '-1px',
            color: '#22223B'
          }}>
            ByteWisdom
          </h2>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              fontWeight: 600,
              color: '#4361EE', // ByteWisdom blue
              fontSize: 17,
              padding: '6px 0',
              borderBottom: '2px solid transparent',
              transition: 'border 0.18s, color 0.18s'
            }}
            onMouseOver={e => e.target.style.borderBottom = '2px solid #4361EE'}
            onMouseOut={e => e.target.style.borderBottom = '2px solid transparent'}
          >Home</Link>
          <Link
            to="/about"
            style={{
              textDecoration: 'none',
              fontWeight: 600,
              color: '#4361EE',
              fontSize: 17,
              padding: '6px 0',
              borderBottom: '2px solid transparent',
              transition: 'border 0.18s, color 0.18s'
            }}
            onMouseOver={e => e.target.style.borderBottom = '2px solid #4361EE'}
            onMouseOut={e => e.target.style.borderBottom = '2px solid transparent'}
          >About</Link>
        </nav>
      </div>
    </header>
  )
}

import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{
      width: '100%',
      background: '#fff',
      borderBottom: '1px solid #eee',
      boxShadow: '0 1px 8px rgba(0,0,0,0.03)',
      height: 60,
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 960,             // Limit width of header content
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 32px',
        height: 60
      }}>
        <h2 style={{ margin: 0 }}>ByteWisdom</h2>
        <nav>
          <Link to="/" style={{
            marginRight: 16,
            textDecoration: 'none',
            fontWeight: 500,
            color: '#6C63FF'
          }}>Home</Link>
          <Link to="/about" style={{
            textDecoration: 'none',
            fontWeight: 500,
            color: '#6C63FF'
          }}>About</Link>
        </nav>
      </div>
    </header>
  )
}

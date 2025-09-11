import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #eee',
      marginBottom: 32
    }}>
      <h2 style={{ margin: 0 }}>ByteWisdom</h2>
      <nav>
        <Link to="/" style={{ marginRight: 16, textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ textDecoration: 'none' }}>About</Link>
      </nav>
    </header>
  )
}

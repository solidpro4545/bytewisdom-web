// Footer.jsx
export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: '#F8FAFF',
      borderTop: '1px solid #E6E8EC',
      borderRadius: '16px 16px 0 0',
      boxShadow: '0 -2px 8px rgba(44, 62, 80, 0.04)',
      fontSize: 13,
      textAlign: 'center',
      padding: '18px 0 14px 0',
      marginTop: 32,
      position: 'relative',
      zIndex: 10,
      letterSpacing: '0.02em'
    }}>
      <div style={{
        maxWidth: 960,
        margin: '0 auto',
        opacity: 0.68,
        color: '#22223B'
      }}>
        Quotes from{' '}
        <a
          href="https://zenquotes.io/"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#4361EE', fontWeight: 500, textDecoration: 'none' }}
          onMouseOver={e => e.target.style.textDecoration = 'underline'}
          onMouseOut={e => e.target.style.textDecoration = 'none'}
        >
          ZenQuotes.io
        </a>
        <br />
        Follow us on{' '}
        <a
          href="https://www.instagram.com/bytewisdom_motivation/"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#4361EE', fontWeight: 500, textDecoration: 'none' }}
          onMouseOver={e => e.target.style.textDecoration = 'underline'}
          onMouseOut={e => e.target.style.textDecoration = 'none'}
        >
          Instagram
        </a>
        {' '}|{' '}
        <a
          href="https://github.com/solidpro4545"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#4361EE', fontWeight: 500, textDecoration: 'none' }}
          onMouseOver={e => e.target.style.textDecoration = 'underline'}
          onMouseOut={e => e.target.style.textDecoration = 'none'}
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

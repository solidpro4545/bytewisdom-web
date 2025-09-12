// Footer.jsx
export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      borderTop: '1px solid #eee',
      background: '#fff',
      fontSize: 12,
      textAlign: 'center',
      padding: '16px 0',
      marginTop: 24,
    }}>
      <div style={{
        maxWidth: 960,
        margin: '0 auto',
        opacity: 0.6,
      }}>
        Quotes from <a href="https://zenquotes.io/" target="_blank" rel="noreferrer">ZenQuotes.io</a>
        <br />
        Follow us on <a href="https://www.instagram.com/bytewisdom_motivation/" target="_blank" rel="noreferrer">Instagram</a>
        {' '}|{' '}
        <a href="https://github.com/solidpro4545" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </footer>
  )
}

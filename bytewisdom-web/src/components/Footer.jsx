export default function Footer() {
  return (
    <footer style={{ marginTop: 32, opacity: .6, fontSize: 12, textAlign: 'center' }}>
      Quotes from{' '}
      <a href="https://zenquotes.io/" target="_blank" rel="noreferrer">ZenQuotes.io</a>
      <br />
      Follow us on{' '}
      <a
        href="https://www.instagram.com/bytewisdom_motivation/"
        target="_blank"
        rel="noreferrer"
        style={{ fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', marginRight: 12 }}
      >
        {/* Instagram SVG icon */}
        {/* ...SVG here... */}
        Instagram
      </a>
      <a
        href="https://github.com/solidpro4545"
        target="_blank"
        rel="noreferrer"
        style={{ fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}
      >
        {/* GitHub SVG icon */}
        {/* ...SVG here... */}
        GitHub
      </a>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import Header from './components/Header'

function QuoteCard({ quote, author }) {
  return (
    <div style={{ padding: 24, border: '1px solid #eee', borderRadius: 12 }}>
      <p style={{ fontSize: 22, lineHeight: 1.4 }}>{quote || '— — —'}</p>
      <p style={{ opacity: .7, marginTop: 10 }}>— {author || 'Unknown'}</p>
    </div>
  )
}

export default function App() {
  const [q, setQ] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown(c => (c > 0 ? c - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  async function fetchRandom() {
    try {
      setLoading(true); setError(null)
      const res = await fetch(`/api/quote?ts=${Date.now()}`)
      const data = await res.json()
      const item = data?.[0]
      if (!item?.q) {
        setCooldown(30)
        setError('Rate limit reached. Try again shortly.')
        return
      }
      setQ({ text: item.q, author: item.a })
    } catch {
      setError('Could not load quote.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRandom() }, [])

  const displayAuthor =
    q?.author ||
    (cooldown > 0 ? `Try again in ${cooldown}s (limit resets ~30s)` : undefined)

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', padding: '0 20px' }}>
      <Header />

      <h1 style={{ marginBottom: 8 }}>Welcome</h1>
      <p style={{ marginTop: 0, opacity: .8 }}>Words to help you slow down & think deeper.</p>

      <div style={{ margin: '24px 0' }}>
        {loading && <p>Loading…</p>}
        {error && <p>{error}</p>}
        {q && <QuoteCard quote={q.text} author={displayAuthor} />}
      </div>

      <button onClick={fetchRandom} disabled={loading || cooldown > 0}>
        {cooldown > 0 ? `Wait ${cooldown}s` : 'New quote'}
      </button>

      <footer style={{ marginTop: 32, opacity: .6, fontSize: 12 }}>
        Quotes from{' '}
        <a href="https://zenquotes.io/" target="_blank" rel="noreferrer">
          ZenQuotes.io
        </a>
        <br />
        Follow us on{' '}
        <a
          href="https://www.instagram.com/bytewisdom_motivation/"
          target="_blank"
          rel="noreferrer"
          style={{ fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}
        >
          {/* Instagram SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
            style={{ marginRight: 6 }}
          >
            <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.25 1.25a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6z"/>
          </svg>
          Instagram
        </a>
      </footer>
    </main>
  )
}

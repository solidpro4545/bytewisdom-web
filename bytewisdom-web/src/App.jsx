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
    style={{ fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', marginRight: 12 }}
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
  <a
    href="https://github.com/solidpro4545"
    target="_blank"
    rel="noreferrer"
    style={{ fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}
  >
    {/* GitHub SVG icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 24 24"
      style={{ marginRight: 6 }}
    >
      <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.857 10.93c.574.106.785-.249.785-.555v-2.018c-3.194.695-3.87-1.54-3.87-1.54-.523-1.328-1.278-1.68-1.278-1.68-1.044-.714.079-.699.079-.699 1.155.082 1.762 1.187 1.762 1.187 1.027 1.76 2.693 1.251 3.35.956.104-.744.402-1.251.732-1.539-2.55-.291-5.231-1.275-5.231-5.674 0-1.253.449-2.278 1.186-3.08-.119-.29-.513-1.462.113-3.048 0 0 .967-.31 3.17 1.177a10.98 10.98 0 0 1 2.884-.388c.978.004 1.963.132 2.884.388 2.202-1.487 3.168-1.177 3.168-1.177.628 1.586.233 2.758.115 3.048.739.802 1.186 1.827 1.186 3.08 0 4.41-2.685 5.38-5.244 5.666.413.356.781 1.063.781 2.143v3.176c0 .308.208.665.791.553A11.5 11.5 0 0 0 23.5 12c0-6.352-5.148-11.5-11.5-11.5z"/>
    </svg>
    GitHub
  </a>
</footer>

    </main>
  )
}

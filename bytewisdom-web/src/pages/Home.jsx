import { useEffect, useState } from 'react'
import QuoteCard from '../components/QuoteCard'
import Footer from '../components/Footer'

export default function Home() {
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
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/quote?ts=${Date.now()}`)
      const data = await res.json()
      const item = data?.[0]
      if (!item?.q) {
        setCooldown(30)
        setError('Rate limit reached. Try again shortly.')
        return
      }
      setQ({ text: item.q, author: item.a })
    } catch (e) {
      setError('Could not load quote.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRandom() }, [])

  const displayAuthor =
    q?.author || (cooldown > 0 ? `Try again in ${cooldown}s` : 'Unknown')

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <main style={{
        maxWidth: 720,
        width: '100%',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{ marginBottom: 8, textAlign: 'center', fontSize: 48 }}>Welcome</h1>
        <p style={{ marginTop: 0, opacity: .8, textAlign: 'center', fontSize: 20 }}>
          Words to help you slow down & think deeper.
        </p>
        <div style={{ margin: '24px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
          {loading && <p>Loading…</p>}
          {error && <p>{error}</p>}
          {q && <QuoteCard quote={q.text} author={displayAuthor} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button onClick={fetchRandom} disabled={loading || cooldown > 0} style={{
            marginTop: 16,
            padding: '10px 28px',
            fontSize: 18,
            borderRadius: 8,
            border: 'none',
            background: '#f7f7f7',
            fontWeight: 600,
            cursor: loading || cooldown > 0 ? 'not-allowed' : 'pointer',
            boxShadow: '0 1px 5px rgba(0,0,0,0.06)'
          }}>
            {cooldown > 0 ? `Wait ${cooldown}s` : 'New quote'}
          </button>
        </div>
        <Footer />
      </main>
    </div>
  )
}

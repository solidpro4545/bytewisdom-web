import { useEffect, useState } from 'react'
import QuoteCard from '../components/QuoteCard'
import Footer from '../components/Footer'

const KEY = 'bw_cooldown_until';

function secondsLeft(until) {
  const ms = (until ?? 0) - Date.now();
  return ms > 0 ? Math.ceil(ms / 1000) : 0;
}

export default function Home() {
  const [q, setQ] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cooldown, setCooldown] = useState(0)

  // Initialize cooldown from localStorage on mount
  useEffect(() => {
    const saved = Number(localStorage.getItem(KEY) || 0);
    setCooldown(secondsLeft(saved));
  }, []);

  // Tick every second while cooling down
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      const saved = Number(localStorage.getItem(KEY) || 0);
      setCooldown(secondsLeft(saved));
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // Keep in sync when user switches tabs or navigates quickly
  useEffect(() => {
    const onVis = () => {
      const saved = Number(localStorage.getItem(KEY) || 0);
      setCooldown(secondsLeft(saved));
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  async function fetchRandom() {
    // guard: if still cooling down, don't call server
    if (cooldown > 0) return;

    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/quote?ts=${Date.now()}`)
      const data = await res.json()

      // Prefer explicit 429 handling from your API, but this keeps your current shape
      const item = data?.[0]
      if (!item?.q) {
        const until = Date.now() + 30_000; // 30s window
        localStorage.setItem(KEY, String(until));
        setCooldown(secondsLeft(until));
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
          <button
            onClick={fetchRandom}
            disabled={loading || cooldown > 0}
            style={{
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
      </main>
    </div>
  )
}

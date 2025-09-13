import { useEffect, useState } from 'react'
import QuoteCard from '../components/QuoteCard'
import Footer from '../components/Footer'

const KEY = 'bw_cooldown_until';

function secondsLeft(until) {
  const ms = (until ?? 0) - Date.now();
  return ms > 0 ? Math.ceil(ms / 1000) : 0;
}

function getSavedUntil() {
  return Number(localStorage.getItem(KEY) || 0);
}

export default function Home() {
  const [q, setQ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  // Initialize from storage and only auto-fetch if not cooling down
  useEffect(() => {
    const saved = getSavedUntil();
    const left = secondsLeft(saved);
    setCooldown(left);
    if (left === 0) fetchRandom(); // don't auto-hit API if we're still cooling down
  }, []);

  // Tick every second while cooling down, based on saved timestamp
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown(secondsLeft(getSavedUntil()));
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // Resync when tab visibility changes
  useEffect(() => {
    const onVis = () => setCooldown(secondsLeft(getSavedUntil()));
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  async function fetchRandom() {
    // Guard: if still cooling down, don't call server
    if (cooldown > 0) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/quote?ts=${Date.now()}`);

      // Prefer explicit 429 handling if your API supports it
      if (!res.ok && res.status === 429) {
        let retryAfter;
        try {
          const body = await res.json();
          retryAfter = body?.retryAfter; // seconds
        } catch {
          // ignore parse errors; fallback to 30s
        }
        const suggested = Date.now() + (retryAfter ?? 30) * 1000;
        const until = Math.max(getSavedUntil(), suggested); // don't shorten/extend incorrectly
        localStorage.setItem(KEY, String(until));
        setCooldown(secondsLeft(until));
        setError('Rate limit reached. Try again shortly.');
        return;
      }

      const data = await res.json();
      const item = data?.[0];

      // Back-compat with your current shape when rate-limited (no q present)
      if (!item?.q) {
        const suggested = Date.now() + 30_000; // 30s window
        const until = Math.max(getSavedUntil(), suggested);
        localStorage.setItem(KEY, String(until));
        setCooldown(secondsLeft(until));
        setError('Rate limit reached. Try again shortly.');
        return;
      }

      // Success
      setQ({ text: item.q, author: item.a });
      // Optional: clear any stale cooldown
      if (getSavedUntil() && secondsLeft(getSavedUntil()) > 0) {
        localStorage.setItem(KEY, '0');
        setCooldown(0);
      }
    } catch (e) {
      setError('Could not load quote.');
    } finally {
      setLoading(false);
    }
  }

  const displayAuthor =
    q?.author || (cooldown > 0 ? `Try again in ${cooldown}s` : 'Unknown');

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

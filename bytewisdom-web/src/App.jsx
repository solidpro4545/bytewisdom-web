import { useEffect, useState } from 'react'

function QuoteCard({ quote, author }) {
  return (
    <div style={{padding:24, border:'1px solid #eee', borderRadius:12}}>
      <p style={{fontSize:22, lineHeight:1.4}}>{quote}</p>
      <p style={{opacity:.7, marginTop:10}}>— {author || 'Unknown'}</p>
    </div>
  )
}

export default function App() {
  const [q, setQ] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchRandom() {
    try {
      setLoading(true); setError(null)
      const res = await fetch('/api/quote');
      const data = await res.json()
      setQ({ text: data[0]?.q, author: data[0]?.a })
    } catch (e) {
      setError('Could not load quote.')
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchRandom() }, [])

  return (
    <main style={{maxWidth:720, margin:'60px auto', padding:'0 20px'}}>
      <h1 style={{marginBottom:8}}>ByteWisdom</h1>
      <p style={{marginTop:0, opacity:.8}}>Words to help you slow down & think deeper.</p>

      <div style={{margin:'24px 0'}}>
        {loading && <p>Loading…</p>}
        {error && <p>{error}</p>}
        {q && <QuoteCard quote={q.text} author={q.author} />}
      </div>

      <button onClick={fetchRandom}>New quote</button>
    </main>
  )
}

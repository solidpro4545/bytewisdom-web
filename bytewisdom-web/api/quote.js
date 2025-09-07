export default async function handler(req, res) {
  try {
    const r = await fetch('https://zenquotes.io/api/random', {
      headers: { Accept: 'application/json' }
    });
    if (!r.ok) {
      const text = await r.text();
      return res.status(502).json({ error: 'ZenQuotes error', detail: text });
    }
    const data = await r.json();
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Server error', detail: String(e) });
  }
}

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
    // Disable caching so every click can be fresh
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Server error', detail: String(e) });
  }
}

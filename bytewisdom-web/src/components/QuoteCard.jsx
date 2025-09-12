export default function QuoteCard({ quote, author }) {
  return (
    <div style={{ padding: 24, border: '1px solid #eee', borderRadius: 12 }}>
      <p style={{ fontSize: 22, lineHeight: 1.4 }}>{quote || '— — —'}</p>
      <p style={{ opacity: .7, marginTop: 10 }}>— {author || 'Unknown'}</p>
    </div>
  )
}

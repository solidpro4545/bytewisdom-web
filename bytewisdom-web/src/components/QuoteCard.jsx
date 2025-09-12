export default function QuoteCard({ quote, author }) {
  return (
    <div style={{
      padding: 24,
      border: '1px solid #eee',
      borderRadius: 12,
      maxWidth: '100%',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      <p style={{ fontSize: 22, lineHeight: 1.4, margin: 0 }}>
        {quote || '— — —'}
      </p>
      <p style={{ opacity: 0.7, marginTop: 10, textAlign: 'right' }}>
        — {author || 'Unknown'}
      </p>
    </div>
  )
}

export default function About() {
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
        padding: '0 20px'
      }}>
        <h1>About ByteWisdom</h1>
        <p>
          ByteWisdom is a simple project with a big goal, to give you one quote at a time
          that helps you pause, reflect, and reset your mindset. In the noise of daily life,
          even a single line of wisdom can make a difference.
        </p>

        <h2 style={{ marginTop: 32 }}>Our Mission</h2>
        <p>
          We believe growth starts with perspective. By surfacing thoughtful quotes,
          ByteWisdom aims to help you slow down and focus on what really matters,
          your values, your mindset, and your progress one day at a time.
        </p>

        <h2 style={{ marginTop: 32 }}>How It Works</h2>
        <ul>
          <li>✨ Click <strong>New Quote</strong> to fetch a fresh piece of wisdom.</li>
          <li>📅 Or choose “Today’s Quote” for a stable, once‑a‑day reminder.</li>
          <li>🔄 Quotes come from trusted public APIs and rotate frequently.</li>
        </ul>

        <h2 style={{ marginTop: 32 }}>Why ByteWisdom?</h2>
        <p>
          This project started as a way to combine coding practice with daily reflection.
          It’s intentionally lightweight — fast to load, easy to use, and free forever.
          The hope is that these little “bytes” of wisdom can spark big changes over time.
        </p>
        
      </main>
    </div>
  )
}

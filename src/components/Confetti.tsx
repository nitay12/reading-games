const COLORS = ['#6b4cff', '#ff6b9d', '#2ec4b6', '#ffd166', '#ef476f', '#3a86ff']

export function Confetti({ count = 40 }: { count?: number }) {
  const pieces = Array.from({ length: count }, (_, i) => i)
  return (
    <div className="confetti" aria-hidden>
      {pieces.map((i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 0.4
        const dur = 1.2 + Math.random() * 1.1
        const color = COLORS[i % COLORS.length]
        return (
          <i
            key={i}
            style={{
              left: `${left}%`,
              background: color,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}

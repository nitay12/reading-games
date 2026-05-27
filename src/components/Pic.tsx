const PALETTE = [
  '#6b4cff',
  '#ff6b9d',
  '#2ec4b6',
  '#ffb703',
  '#ef476f',
  '#118ab2',
  '#06d6a0',
  '#f4845f',
  '#9b5de5',
  '#3a86ff',
]

export function colorFor(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]
}

export function iconUrl(file: string): string {
  return `${import.meta.env.BASE_URL}images/icons/${file}`
}

export function Pic({
  file,
  color,
  size = 64,
}: {
  file: string
  color?: string
  size?: number
}) {
  if (file.startsWith('http')) {
    return (
      <img
        src={file}
        width={size}
        height={size}
        alt=""
        draggable={false}
        style={{ objectFit: 'contain', display: 'inline-block' }}
      />
    )
  }

  const c = color ?? colorFor(file)
  const url = iconUrl(file)
  return (
    <span
      className="pic"
      aria-hidden
      style={{
        width: size,
        height: size,
        backgroundColor: c,
        maskImage: `url("${url}")`,
        WebkitMaskImage: `url("${url}")`,
      }}
    />
  )
}

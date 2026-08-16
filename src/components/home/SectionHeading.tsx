const HIGHLIGHT_COLOR: Record<string, string> = {
  mint: 'text-mint',
  purple: 'text-purple',
  yellow: 'text-lime',
  cyan: 'text-cyan',
  pink: 'text-pink',
  white: 'text-white',
}

export function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3.5 w-px bg-white/60" aria-hidden />
      <p className="text-[13px] font-medium uppercase tracking-[1.04px] text-white">{label}</p>
    </div>
  )
}

/** Renders a heading, italicizing/coloring the `highlight` substring when it's found in `heading`. */
export function HighlightedHeading({
  heading,
  highlight,
  color = 'mint',
  as: Tag = 'h2',
  className = '',
}: {
  heading: string
  highlight?: string | null
  color?: string
  as?: 'h1' | 'h2'
  className?: string
}) {
  const colorClass = HIGHLIGHT_COLOR[color] || HIGHLIGHT_COLOR.mint
  const index = highlight ? heading.indexOf(highlight) : -1

  if (!highlight || index === -1) {
    return (
      <Tag className={`font-medium leading-[1.15] text-white ${className}`}>{heading}</Tag>
    )
  }

  const before = heading.slice(0, index)
  const after = heading.slice(index + highlight.length)

  return (
    <Tag className={`font-medium leading-[1.15] text-white ${className}`}>
      {before}
      <span className={`font-serif italic ${colorClass}`}>{highlight}</span>
      {after}
    </Tag>
  )
}

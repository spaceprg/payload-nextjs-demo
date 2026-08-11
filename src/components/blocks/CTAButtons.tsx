import LinkButton from './LinkButton'
import type { LinkField } from '@/lib/payload'

export default function CTAButtons({
  buttons,
  align = 'left',
  invert = false,
}: {
  buttons?: LinkField[] | null
  align?: 'left' | 'center'
  invert?: boolean
}) {
  if (!buttons || buttons.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
      {buttons.map((button, index) => (
        <LinkButton
          key={button.label + index}
          link={button}
          variant={index === 0 ? 'primary' : 'secondary'}
          invert={invert}
        />
      ))}
    </div>
  )
}

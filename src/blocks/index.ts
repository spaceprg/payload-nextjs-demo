import type { Block } from 'payload'
import { ContentBlock } from './Content/config'
import { ImageBlock } from './ImageBlock/config'
import { CTABlock } from './CTA/config'
import { ColumnsBlock } from './Columns/config'
import { ImageContentBlock } from './ImageContent/config'

/**
 * Every block registered here becomes selectable in any `layout` blocks field
 * that spreads this array. To add a new section type: create `src/blocks/<Name>/config.ts`,
 * a matching renderer in `src/components/blocks/<Name>Block.tsx`, register the config below
 * and the renderer's `blockType` case in `PageBuilder` — no page config needs to change.
 */
export const layoutBlocks: Block[] = [
  ContentBlock,
  ImageBlock,
  CTABlock,
  ColumnsBlock,
  ImageContentBlock,
]

export { ContentBlock, ImageBlock, CTABlock, ColumnsBlock, ImageContentBlock }

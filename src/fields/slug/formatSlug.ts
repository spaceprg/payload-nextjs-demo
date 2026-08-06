export const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const formatSlugHook =
  (fieldToUse: string) =>
  ({ data, operation, originalDoc, value }: { data?: Record<string, unknown>; operation: string; originalDoc?: Record<string, unknown>; value: unknown }) => {
    if (typeof value === 'string' && value.trim().length > 0) {
      return formatSlug(value)
    }

    if (operation === 'create' || !value) {
      const fallback = (data?.[fieldToUse] as string) || (originalDoc?.[fieldToUse] as string)
      if (fallback) return formatSlug(fallback)
    }

    return value
  }

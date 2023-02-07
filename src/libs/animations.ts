import type { Variants } from 'framer-motion'

export const slideVariant: Variants = {
  enter: (custom: number | string) => ({
    x: custom,
    opacity: 0.5,
    transition: { duration: 0 },
  }),
  exit: {
    x: 0,
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.15 },
  },
}

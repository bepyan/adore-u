import type { Variants } from 'framer-motion'

export const slideVariant: Variants = {
  leftEnter: {
    x: '-70%',
    opacity: 0.5,
    transition: { duration: 0 },
  },
  rightEnter: {
    x: '70%',
    opacity: 0.5,
    transition: { duration: 0 },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.15 },
  },
}

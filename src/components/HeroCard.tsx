import { motion } from 'framer-motion'

import { cn } from '~/libs/utils'

export interface HeroCardProps {
  show: boolean
  className?: string
  children?: React.ReactNode
}

export default function HeroCard({ show, children, className }: HeroCardProps) {
  return <motion.div
    layout
    className={cn(
      'container h-40 overflow-hidden rounded-xl bg-white p-4 shadow-sm',
      show && 'fixed inset-0 z-40 h-full overflow-scroll p-8',
    )}
  >
    <motion.div layout className={className}>
      {children}
    </motion.div>
  </motion.div>
}

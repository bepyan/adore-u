import { motion } from 'framer-motion'

import { cn } from '~/libs/utils'

export interface HeroCardProps {
  show: boolean
  children?: React.ReactNode
}

export default function HeroCard({ show, children }: HeroCardProps) {
  return <motion.div
    layout
    className={cn(
      'container h-40 overflow-hidden rounded-xl bg-white p-4 shadow-sm',
      show && 'fixed inset-0 z-40 h-full overflow-scroll py-8',
    )}
  >
    <motion.div layout="position" className=''>
      {children}
    </motion.div>
  </motion.div>
}

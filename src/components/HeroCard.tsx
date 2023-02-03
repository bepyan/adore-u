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
      'container rounded-xl bg-white p-4 h-40 overflow-hidden shadow-sm',
      show && 'z-40 fixed py-8 inset-0 overflow-scroll h-full',
    )}
  >
    <motion.div layout="position" className=''>
      {children}
    </motion.div>
  </motion.div>
}

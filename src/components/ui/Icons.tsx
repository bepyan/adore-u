import type {
  LucideIcon,
  LucideProps,
} from 'lucide-react'
import * as Lucide from 'lucide-react'

export type Icon = LucideIcon

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  ),
  ...Lucide,
}

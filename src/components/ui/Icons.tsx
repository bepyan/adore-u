import type {
  LucideIcon,
  LucideProps,
} from 'lucide-react'
import * as Lucide from 'lucide-react'
// https://lucide.dev/

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
  caretLeft: (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m14 17l-6-5l6-5v10z"></path></svg>
    )
  },
  caretRight: (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m10 7l6 5l-6 5V7z"></path></svg>
    )
  },
}

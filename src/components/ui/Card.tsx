import { cn } from '~/libs/utils'

export default function Card({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLDivElement>) {
  return <section {...props} className={cn('rounded-xl bg-white p-4 shadow-md', className)}>
    {children}
  </section>
}

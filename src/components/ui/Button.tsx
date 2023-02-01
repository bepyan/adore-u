import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '~/libs/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100',
  {
    variants: {
      variant: {
        default:
          'bg-rose-600 text-white active:bg-rose-700',
        outline:
          'bg-transparent border border-rose-200 active:bg-rose-100',
        subtle:
          'bg-rose-100 text-slate-900 active:bg-rose-200',
        ghost:
          'bg-transparent active:bg-rose-100 data-[state=open]:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {}

export default React.forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line prefer-arrow-callback
  function Button({ className, variant, size, ...props }, ref) {
    return (
      <button
        className={cn(buttonVariants({ className, variant, size }))}
        ref={ref}
        {...props}
      />
    )
  },
)

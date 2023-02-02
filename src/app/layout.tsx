import '~/styles/global.css'

import { fontSpoqa } from '~/libs/fonts'
import { cn } from '~/libs/utils'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head />
      <body
        className={cn(
          fontSpoqa.variable,
          'min-h-screen w-full font-sans bg-zinc-100 text-slate-900 antialiased',
        )}
      >
        {children}
      </body>
    </html>
  )
}

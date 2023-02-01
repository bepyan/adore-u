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
          'min-h-screen bg-gradient-to-b from-slate-50 to-rose-50 font-sans text-slate-900 antialiased',
        )}
      >
        <div className='flex min-h-screen flex-col'>
          {/* <SiteHeader /> */}
          <div className='container flex-1'>{children}</div>
          {/* <SiteFooter /> */}
        </div>
      </body>
    </html>
  )
}

import '~/styles/global.css'

import { PageHeader } from '~/components/PageHeader'
import { fontSpoqa } from '~/libs/fonts'
import { cn } from '~/libs/utils'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head />
      <body
        className={cn(
          fontSpoqa.variable,
          'w-full bg-zinc-50 font-sans text-slate-900 antialiased',
        )}
      >
        <header className="fixed inset-0 z-10 h-11 pt-safe-top backdrop-blur standalone:h-20">
          <PageHeader />
        </header>
        <main className='mt-11 pt-safe-top standalone:mt-20'>
          {children}
        </main>
      </body>
    </html>
  )
}

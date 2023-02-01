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
          'min-h-screen w-full font-sans bg-slate-50 text-slate-900 antialiased',
        )}
      >
        <div className='flex min-h-screen flex-col'>
          <PageHeader />
          {children}
        </div>
      </body>
    </html>
  )
}

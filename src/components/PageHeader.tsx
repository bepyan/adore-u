import { Icons } from './ui/Icons'

export function PageHeader() {
  return (
    <header className="fixed top-0 z-40 w-full">
      <div className="container flex h-16 items-center bg-slate-50">
        <Icons.logo className='h-5 w-5' />
      </div>
    </header>
  )
}

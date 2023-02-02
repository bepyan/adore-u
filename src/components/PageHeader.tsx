import { Icons } from './ui/Icons'

export function PageHeader() {
  return (
    <header className="z-10 w-full">
      <div className="container flex items-end pt-8 pb-3">
        <div>
          <h1 className='text-2xl font-extrabold'>추앙</h1>
        </div>
        <div className='ml-auto'>
          <Icons.logo className='h-8 w-8' />
        </div>
      </div>
    </header>
  )
}

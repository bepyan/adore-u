import { Icons } from './ui/Icons'

export function PageHeader() {
  return (
    <div className="container flex h-full items-center">
      <div>
        <h1 className='text-2xl font-extrabold'>추앙</h1>
      </div>
      <div className='ml-auto'>
        <Icons.logo className='h-8 w-8' />
      </div>
    </div>
  )
}

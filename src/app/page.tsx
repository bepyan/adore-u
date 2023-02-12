'use client'

import { useState } from 'react'

import HeroCard from '~/components/HeroCard'
import Button from '~/components/ui/Button'
import dayjs from '~/libs/dayjs'

export default function Home() {
  const [fullLanding, setFullLanding] = useState(false)
  const [fullCalender, setFullCalender] = useState(false)

  const toggleFullCalender = () => {
    document.body.style.overflow = fullCalender ? '' : 'hidden'
    setFullCalender(!fullCalender)
  }

  const toggleLanding = () => {
    document.body.style.overflow = fullLanding ? '' : 'hidden'
    setFullLanding(!fullLanding)
  }

  return (
    <div className='min-h-min'>
      <div className='container flex flex-col gap-4'>
        <HeroCard show={fullLanding}>
          <h2 className='sticky top-0 text-lg font-bold'>추앙하다</h2>
        </HeroCard>

        <HeroCard show={fullCalender}>
          <div className='flex items-center justify-center'>
            {dayjs().localeData().monthsShort(dayjs())}
          </div>

          <div className='grid grid-cols-7 text-center text-sm'>
            {dayjs.weekdaysShort().map(day => (
              <div key={day} className='text-zinc-700'>{day}</div>
            ))}
          </div>
        </HeroCard>
      </div>

      <div className='fixed inset-x-0 bottom-14 z-50 h-8 bg-gradient-to-b from-transparent to-white' />
      <div className='fixed inset-x-0 bottom-0 z-50 bg-white pb-4'>
        <div className='flex items-center justify-center gap-2'>
          <Button variant="ghost" onClick={toggleLanding}>
            오늘
          </Button>
          <Button variant="ghost" onClick={toggleFullCalender}>
            전체 달력 보기
          </Button>
        </div>
      </div>
    </div>
  )
}

'use client'

import React from 'react'

import { Icons } from '~/components/ui/Icons'
import dayjs from '~/libs/day'
import { cn } from '~/libs/utils'

export default function CalenderPage() {
  const currentDate = dayjs()
  const [showingDate, setShowingDate] = React.useState<dayjs.Dayjs>(currentDate)
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs>(currentDate)

  const monthStartBlankCnt = (dayjs(showingDate).date(0).day() + 1) % 7

  const goToday = () => {
    setShowingDate(currentDate)
  }

  const goPrevMonth = () => {
    const prevDate = showingDate.month(showingDate.month() - 1)
    setShowingDate(prevDate)
    setSelectedDate(prevDate.date(prevDate.isBefore(currentDate) ? prevDate.daysInMonth() : 1))
  }

  const goNextMonth = () => {
    const nextDate = showingDate.month(showingDate.month() + 1)
    setShowingDate(nextDate)
    setSelectedDate(nextDate.date(nextDate.isBefore(currentDate) ? nextDate.daysInMonth() : 1))
  }

  return (
    <main className="min-h-min">
      <div className='sticky top-0'>
        <div className='h-8'></div>

        <div className='flex w-full items-end justify-center py-4'>
          <div className='flex items-center gap-2'>
            <Icons.caretLeft
              className='h-6 w-6 text-zinc-500'
              onClick={goPrevMonth}
            />
            <span>
              {showingDate.isSame(currentDate, 'year')
                ? showingDate.format('MM월')
                : showingDate.format('YY년 MM월')}
            </span>
            <Icons.caretRight
              className='h-6 w-6 text-zinc-500 active:text-zinc-700'
              onClick={goNextMonth}
            />
          </div>

          <div className='absolute right-4 text-xs' onClick={goToday}>
            오늘
          </div>
        </div>

        <div className='grid grid-cols-7 text-center text-sm'>
          {dayjs.weekdaysShort().map(day => (
            <div key={day} className='py-2 text-zinc-600'>{day}</div>
          ))}
          {[...Array(monthStartBlankCnt)].map((_, i) => (
            <div key={i} className="flex h-16 items-center justify-center text-zinc-700">
              { }
            </div>
          ))}
          {[...Array(showingDate.daysInMonth())].map((_, i) => {
            const itemDate = showingDate.date(i + 1)
            const isCurrentDate = itemDate.isSame(currentDate, 'D')
            const isSelectedDate = itemDate.isSame(selectedDate, 'D')

            return (
              <div
                key={i}
                className={cn(
                  'flex h-16 items-center justify-center text-zinc-700',
                )}
                onClick={() => setSelectedDate(itemDate)}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center',
                    isCurrentDate && 'rounded-full bg-zinc-300',
                    isSelectedDate && 'rounded-full bg-rose-100',
                  )}
                >
                  {itemDate.date()}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className='container mt-8 flex flex-col'>
        <div className='text-sm text-zinc-700'>
          {selectedDate.format('YYYY년 MM월 DD일 dddd')}
        </div>
      </div>
    </main>
  )
}

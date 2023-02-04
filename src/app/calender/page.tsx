'use client'

import React, { useEffect } from 'react'

import { Icons } from '~/components/ui/Icons'
import dayjs, { renderDateDuration } from '~/libs/day'
import { allEventDayList } from '~/libs/holiday'
import { cn } from '~/libs/utils'

export default function CalenderPage() {
  const today = dayjs()
  const [showingMonth, setShowingMonth] = React.useState<dayjs.Dayjs>(today)
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs>(today)

  const monthStartBlankCnt = (dayjs(showingMonth).date(0).day() + 1) % 7
  const monthDateList = [...Array(showingMonth.daysInMonth())].map((_, i) => showingMonth.date(i + 1))

  const targetEventList = monthDateList.map((_, i) => {
    const itemDate = showingMonth.date(i + 1) as dayjs.Dayjs

    const eventList = allEventDayList.filter(({ targetDate }) => targetDate.isSame(itemDate, 'date'))

    return {
      itemDate,
      eventList,
    }
  })
  const activeTargetEventList = targetEventList.filter(({ eventList }) => eventList.length)

  useEffect(() => {
    const isBeforeToday = showingMonth.isBefore(today)
    setSelectedDate(isBeforeToday ? activeTargetEventList.at(-1)!.itemDate : activeTargetEventList.at(0)!.itemDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showingMonth])

  const goTargetMonth = (targetDate: dayjs.Dayjs) => {
    setShowingMonth(targetDate)
  }

  const goToday = () => goTargetMonth(today)
  const goPrevMonth = () => goTargetMonth(showingMonth.month(showingMonth.month() - 1))
  const goNextMonth = () => goTargetMonth(showingMonth.month(showingMonth.month() + 1))

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
              {showingMonth.isSame(today, 'year')
                ? showingMonth.format('MM월')
                : showingMonth.format('YY년 MM월')}
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
          {targetEventList.map(({ itemDate, eventList }) => {
            const isCurrentDate = itemDate.isSame(today, 'D')
            const isSelectedDate = itemDate.isSame(selectedDate, 'D')
            const hasEvent = Boolean(eventList.length)

            return (
              <div
                key={itemDate.toString()}
                className={'flex h-16 flex-col items-center justify-center gap-1 text-zinc-700'}
                onClick={() => hasEvent && setSelectedDate(itemDate)}
              >
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-zinc-400',
                    isCurrentDate && 'bg-zinc-300 text-zinc-700',
                    hasEvent && 'text-zinc-700',
                    isSelectedDate && 'bg-rose-100 text-zinc-700',
                  )}
                >
                  {itemDate.date()}
                </span>
                <div className='flex flex-col gap-0.5'>
                  {eventList.map(event => (
                    <div key={event.name} className="h-1 w-4 rounded-lg bg-rose-300">
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='container mt-8 flex flex-col gap-4'>
        {activeTargetEventList.map(({ itemDate, eventList }) => {
          return (
            <div key={itemDate.toString()}>
              <div className='mb-2 text-sm text-zinc-600'>
                {itemDate.format('D일 dddd')}
              </div>
              {eventList.map(event => (
                <div key={event.name} className="flex h-20 items-center py-2">
                  <span className='mr-2 text-sm text-zinc-600'>
                    {renderDateDuration(event.date, event.targetDate)}
                  </span>
                  <span className='text-zinc-900'>
                    {event.name}
                  </span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </main>
  )
}

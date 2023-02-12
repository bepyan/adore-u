'use client'

import { motion } from 'framer-motion'

import { Icons } from '~/components/ui/Icons'
import { slideVariant } from '~/libs/animations'
import dayjs from '~/libs/dayjs'
import { cn } from '~/libs/utils'

import { useAnimateCalender } from './useAnimation'
import { useSelectedDateStore, useSelectedMonthStore } from './useCalenderStore'

export default function Calender() {
  const {
    selectedMonth,
    computed: {
      monthStartBlankCnt,
      targetEventList,
    },
  } = useSelectedMonthStore()
  const { selectedDate, setSelectedDate } = useSelectedDateStore()

  const { calenderControls, animateToday, animateNextMonth, animatePrevMonth } = useAnimateCalender()

  return (<>
    {/* calender header */}
    <div className='flex w-full items-end justify-center py-4'>
      <div className='flex items-center gap-2'>
        <Icons.caretLeft
          className='h-6 w-6 text-zinc-500'
          onClick={animatePrevMonth}
        />
        <motion.span animate={calenderControls} variants={slideVariant}>
          {selectedMonth.isSame(dayjs(), 'year')
            ? selectedMonth.format('MM월')
            : selectedMonth.format('YY년 MM월')}
        </motion.span>
        <Icons.caretRight
          className='h-6 w-6 text-zinc-500 active:text-zinc-700'
          onClick={animateNextMonth}
        />
      </div>
      <div className='absolute right-4 text-xs' onClick={animateToday}>
        오늘
      </div>
    </div>
    {/* calender content */}
    <motion.div
      onPanEnd={(_, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) * velocity.x

        if (swipe <= -30)
          animateNextMonth()
        else if (swipe >= 30)
          animatePrevMonth()
      }}
    >
      <motion.div
        className='z-10 grid grid-cols-7 text-center text-sm'
        custom="70%"
        animate={calenderControls}
        variants={slideVariant}
      >
        {dayjs.weekdaysShort().map(day => (
          <div key={day} className='py-2 text-zinc-600'>{day}</div>
        ))}
        {[...Array(monthStartBlankCnt)].map((_, i) => (
          <div key={i} className="flex h-16 items-center justify-center text-zinc-700">
            { }
          </div>
        ))}
        {targetEventList.map(({ itemDate, eventList }) => {
          const isCurrentDate = itemDate.isSame(dayjs(), 'D')
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
                  'flex h-6 w-6 items-center justify-center rounded-full text-zinc-300',
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
      </motion.div>
    </motion.div>
  </>
  )
}

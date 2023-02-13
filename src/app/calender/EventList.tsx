'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useMount } from 'react-use'

import Button from '~/components/ui/Button'
import { renderDateDuration } from '~/libs/dayjs'

import { useAnimateCalender, useAnimateEventList } from './useAnimation'
import { useSelectedMonthStore } from './useCalenderStore'

let prevMonth = -1

export default function EventList() {
  const selectedMonth = useSelectedMonthStore(state => state.selectedMonth)
  const activeTargetEventList = useSelectedMonthStore(state => state.computed.activeTargetEventList)

  const { animateNextMonth } = useAnimateCalender()
  const { eventListControls, animateEventList } = useAnimateEventList()

  useMount(() => {
    animateEventList()
  })

  useEffect(() => {
    if (selectedMonth.month() !== prevMonth) {
      animateEventList()
      prevMonth = selectedMonth.month()
    }
  }, [selectedMonth])

  return (
    <div className='flex flex-col gap-4'>
      {activeTargetEventList.map(({ itemDate, eventList }, i) => {
        return (
          <motion.div
            key={itemDate.format('YYYYMMDD')}
            id={itemDate.format('YYYYMMDD')}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="date-item scroll-mt-8"
            custom={i}
            animate={eventListControls}
          >
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
          </motion.div>
        )
      })}
      <div className='mx-auto'>
        <Button variant='subtle' onClick={animateNextMonth}>
          {selectedMonth.add(1, 'month').month() + 1}월 더보기
        </Button>
      </div>
    </div>
  )
}

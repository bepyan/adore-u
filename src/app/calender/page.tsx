'use client'

import { motion, useAnimationControls } from 'framer-motion'
import React, { useEffect } from 'react'
import { useMeasure } from 'react-use'

import Button from '~/components/ui/Button'
import { Icons } from '~/components/ui/Icons'
import dayjs, { renderDateDuration } from '~/libs/day'
import { cn } from '~/libs/utils'

import { useCalender } from './useCalender'

export default function CalenderPage() {
  const {
    today,
    showingMonth,
    selectedDate,
    monthStartBlankCnt,
    targetEventList,
    activeTargetEventList,
    setSelectedDate,
    goToday,
    goPrevMonth,
    goNextMonth,
  } = useCalender()

  const [calenderRef, { height: calenderHeight }] = useMeasure<HTMLDivElement>()
  const eventListHeight = window.innerHeight - calenderHeight

  const controls = useAnimationControls()

  const handleNext = async () => {
    goNextMonth()

    await controls.start({
      x: '70%',
      opacity: 0.5,
      transition: { duration: 0 },
    })

    await controls.start({
      x: 0,
      opacity: 1,
      transition: { ease: 'easeInOut', duration: 0.15 },
    })
  }

  const handlePrev = async () => {
    goPrevMonth()

    await controls.start({
      x: '-70%',
      opacity: 0.5,
      transition: { duration: 0 },
    })

    await controls.start({
      x: 0,
      opacity: 1,
      transition: { ease: 'easeInOut', duration: 0.15 },
    })
  }

  useEffect(() => {
    if (selectedDate)
      document.getElementById(selectedDate.format('YYYYMMDD'))?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedDate])

  return (
    <>
      {/* calender */}
      <div ref={calenderRef} className='fixed inset-x-0 top-0 z-10 mx-auto mt-11 max-w-screen-sm bg-zinc-50 standalone:mt-20'>
        {/* calender header */}
        <div className='flex w-full items-end justify-center py-4'>
          <div className='flex items-center gap-2'>
            <Icons.caretLeft
              className='h-6 w-6 text-zinc-500'
              onClick={handlePrev}
            />
            <motion.span animate={controls}>
              {showingMonth.isSame(today, 'year')
                ? showingMonth.format('MM월')
                : showingMonth.format('YY년 MM월')}
            </motion.span>
            <Icons.caretRight
              className='h-6 w-6 text-zinc-500 active:text-zinc-700'
              onClick={handleNext}
            />
          </div>
          <div className='absolute right-4 text-xs' onClick={goToday}>
            오늘
          </div>
        </div>
        {/* calender content */}
        <motion.div
          className='grid grid-cols-7 text-center text-sm'
          animate={controls}
        // drag="x"
        // dragConstraints={{ left: -50, right: 50 }}
        // style={{ touchAction: 'none' }}
        // dragElastic={0.1}
        // onDrag={(e, info) => {
        //   if (info.offset.x > 45)
        //     goNextMonth()
        //   else if (info.offset.x <= -45)
        //     goPrevMonth()
        // }}
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
      </div>

      {calenderHeight && <div
        className='fixed inset-x-0 z-50 mt-11 h-8 bg-gradient-to-b from-zinc-50 to-transparent standalone:mt-20'
        style={{ top: calenderHeight }}
      />}
      {/* events */}
      <div
        className='fixed-div container inset-x-0 mt-11 overflow-auto pt-8 pb-24 standalone:mt-20 '
        style={{ top: calenderHeight, height: eventListHeight }}
      >
        <motion.div animate={{ transition: { staggerChildren: 0.1 } }}>
          {calenderHeight && (
            <motion.div className='flex flex-col gap-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {activeTargetEventList.map(({ itemDate, eventList }) => {
                return (
                  <div key={itemDate.toString()} id={itemDate.format('YYYYMMDD')} className="scroll-mt-8">
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
              <div className='mx-auto'>
                <Button variant='subtle' onClick={handleNext}>
                  {selectedDate.add(1, 'month').month() + 1}월 더보기
                </Button>
              </div>
            </motion.div>)}
        </motion.div>
      </div>
    </>
  )
}

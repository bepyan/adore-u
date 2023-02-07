'use client'

import { motion, useAnimationControls } from 'framer-motion'
import React, { useEffect } from 'react'
import { useMeasure } from 'react-use'

import Button from '~/components/ui/Button'
import { Icons } from '~/components/ui/Icons'
import { slideVariant } from '~/libs/animations'
import dayjs, { renderDateDuration } from '~/libs/day'
import { cn } from '~/libs/utils'

import { useCalender } from './useCalender'

let prevMonth = -1

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

  const contentControls = useAnimationControls()
  const animateContent = async () => {
    await contentControls.start((i: number) => ({
      opacity: 0,
      x: 50 + i * 5,
      transition: { duration: 0 },
    }))

    contentControls.start((i: number) => ({
      x: 0,
      transition: {
        ease: 'easeOut',
        duration: Math.max(0.5 - i * 0.05, 0.2),
        delay: i * 0.05,
      },
    }))

    contentControls.start((i: number) => ({
      opacity: 1,
      transition: {
        ease: 'easeOut',
        duration: Math.max(0.5 - i * 0.1, 0),
        delay: i * 0.1,
      },
    }))
  }

  const calenderControls = useAnimationControls()
  const animateToday = async () => {
    const isBeforeToday = goToday()
    await calenderControls.start(isBeforeToday ? 'rightEnter' : 'leftEnter')
    await calenderControls.start('animate')
  }
  const animatePrevMonth = async () => {
    goPrevMonth()
    await calenderControls.start('leftEnter')
    await calenderControls.start('animate')
  }
  const animateNextMonth = async () => {
    goNextMonth()
    await calenderControls.start('rightEnter')
    await calenderControls.start('animate')
  }

  useEffect(() => {
    if (selectedDate) {
      document.getElementById(selectedDate.format('YYYYMMDD'))?.scrollIntoView({ behavior: 'smooth' })

      if (selectedDate.month() !== prevMonth)
        animateContent()
      prevMonth = selectedDate.month()
    }
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
              onClick={animatePrevMonth}
            />
            <motion.span custom="70%" animate={calenderControls} variants={slideVariant}>
              {showingMonth.isSame(today, 'year')
                ? showingMonth.format('MM월')
                : showingMonth.format('YY년 MM월')}
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
        {calenderHeight && (
          <motion.div
            className='flex flex-col gap-4'
            animate={{ transition: { staggerChildren: 1 } }}
          >
            {activeTargetEventList.map(({ itemDate, eventList }, i) => {
              return (
                <motion.div
                  key={itemDate.format('YYYYMMDD')}
                  id={itemDate.format('YYYYMMDD')}
                  className="scroll-mt-8"
                  custom={i}
                  animate={contentControls}
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
                {selectedDate.add(1, 'month').month() + 1}월 더보기
              </Button>
            </div>
          </motion.div>)}
      </div>

      <style jsx global>{`
        html,
        body {
          position: fixed;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

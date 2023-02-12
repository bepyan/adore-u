'use client'

import React, { useEffect, useRef } from 'react'
import { useMeasure, useWindowSize } from 'react-use'

import dayjs from '~/libs/dayjs'

import Calender from './Calender'
import EventList from './EventList'
import { useSelectedDateStore } from './useCalenderStore'

export default function CalenderPage() {
  const { height } = useWindowSize()
  const [calenderRef, { height: calenderHeight }] = useMeasure<HTMLDivElement>()

  const eventListRef = useRef<HTMLDivElement>(null)

  const setSelectedDate = useSelectedDateStore(state => state.setSelectedDate)

  useEffect(() => {
    // if (selectedDate.month() === prevMonth || !contentRef.current)
    //   return

    let dateList: { id: string; top: number }[]

    function onResize() {
      dateList = Array.from(
        document.querySelectorAll<HTMLElement>('.date-item'),
      ).map(element => ({ id: element.id, top: element.offsetTop }))
    }

    function onScroll() {
      if (!dateList || !eventListRef.current)
        return

      const SCROLL_MARGIN_TOP = 16
      const top = eventListRef.current?.scrollTop + SCROLL_MARGIN_TOP + 1

      let current = ''

      for (let i = 0; i < dateList.length; i++) {
        if (top >= dateList[i].top)
          current = dateList[i].id
      }

      if (current)
        setSelectedDate(dayjs(current))
    }

    onResize()
    onScroll()
    eventListRef.current?.addEventListener('scroll', onScroll)
    eventListRef.current?.addEventListener('resize', onResize)
    return () => {
      eventListRef.current?.removeEventListener('scroll', onScroll)
      eventListRef.current?.removeEventListener('resize', onResize)
    }
  }, [calenderHeight])

  return (
    <>
      <div ref={calenderRef} className='fixed inset-x-0 top-0 z-10 mx-auto mt-11 max-w-screen-sm bg-zinc-50 standalone:mt-20'>
        <Calender />
      </div>

      {calenderHeight && <div
        className='fixed inset-x-0 z-50 mt-11 h-8 bg-gradient-to-b from-zinc-50 to-transparent standalone:mt-20'
        style={{ top: calenderHeight }}
      />}
      {calenderHeight && <div
        className='container fixed inset-x-0 mt-11 overflow-auto pt-8 pb-24 standalone:mt-20'
        style={{ top: calenderHeight, height: height - calenderHeight }}
        ref={eventListRef}
      >
        <EventList />
      </div>}

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

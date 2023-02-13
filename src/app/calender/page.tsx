'use client'

import React from 'react'
import { useMeasure, useWindowSize } from 'react-use'

import Calender from './Calender'
import EventList from './EventList'
import { useEffectDateMonth, useEffectEventListScroll, useInitSelectedDate } from './useCalenderStore'

export default function CalenderPage() {
  const { height } = useWindowSize()
  const [calenderRef, { height: calenderHeight }] = useMeasure<HTMLDivElement>()
  const eventListHeight = height - calenderHeight
  const eventListPaddingBottom = eventListHeight - 196

  useInitSelectedDate()
  useEffectDateMonth()
  useEffectEventListScroll(calenderHeight)

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
        id="eventList"
        className='container fixed inset-x-0 mt-11 overflow-auto pt-8 pb-24 standalone:mt-20'
        style={{ top: calenderHeight, height: eventListHeight, paddingBottom: eventListPaddingBottom }}
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

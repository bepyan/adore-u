import React from 'react'

import dayjs from '~/libs/day'
import { allEventDayList } from '~/libs/holiday'

export const useCalender = () => {
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

  React.useEffect(() => {
    const isBeforeToday = showingMonth.isBefore(today)
    setSelectedDate(isBeforeToday ? activeTargetEventList.at(-1)!.itemDate : activeTargetEventList.at(0)!.itemDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showingMonth])

  const goTargetMonth = (targetDate: dayjs.Dayjs) => {
    setShowingMonth(targetDate)
  }

  return {
    today,
    showingMonth,
    selectedDate,
    monthStartBlankCnt,
    targetEventList,
    activeTargetEventList,
    setSelectedDate,
    goToday: () => goTargetMonth(today),
    goPrevMonth: () => goTargetMonth(showingMonth.month(showingMonth.month() - 1)),
    goNextMonth: () => goTargetMonth(showingMonth.month(showingMonth.month() + 1)),
  }
}
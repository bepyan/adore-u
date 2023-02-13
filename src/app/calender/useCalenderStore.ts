import { useEffect } from 'react'
import { useMount } from 'react-use'
import { create } from 'zustand'

import dayjs from '~/libs/dayjs'
import type { EventDay } from '~/libs/holiday'
import { allEventDayList } from '~/libs/holiday'

interface TargetEventDay {
  itemDate: dayjs.Dayjs
  eventList: EventDay[]
}

/* 달력 날짜 상태 */

interface SelectedMonthStore {
  selectedMonth: dayjs.Dayjs
  computed: {
    monthStartBlankCnt: number
    monthDateList: dayjs.Dayjs[]
    targetEventList: TargetEventDay[]
    activeTargetEventList: TargetEventDay[]
  }
  goToday: () => void
  goNextMonth: () => void
  goPrevMonth: () => void
}

export const useSelectedMonthStore = create<SelectedMonthStore>((set, get) => ({
  selectedDate: dayjs(),
  selectedMonth: dayjs(),
  computed: {
    get monthStartBlankCnt() {
      return (get().selectedMonth.date(0).day() + 1) % 7
    },
    get monthDateList() {
      const { selectedMonth } = get()
      return [...Array(selectedMonth.daysInMonth())].map((_, i) => selectedMonth.date(i + 1))
    },
    get targetEventList() {
      return get().computed.monthDateList.map((_, i) => {
        const itemDate = get().selectedMonth.date(i + 1) as dayjs.Dayjs
        const eventList = allEventDayList.filter(({ targetDate }) => targetDate.isSame(itemDate, 'date'))

        return {
          itemDate,
          eventList,
        }
      })
    },
    get activeTargetEventList() {
      return get().computed.targetEventList.filter(({ eventList }) => eventList.length)
    },
  },
  goToday: () => set(state => ({
    ...state,
    selectedMonth: dayjs(),
  })),
  goNextMonth: () => set(state => ({
    ...state,
    selectedMonth: get().selectedMonth.month(get().selectedMonth.month() + 1),
  }
  )),
  goPrevMonth: () => set(state => ({
    ...state,
    selectedMonth: get().selectedMonth.month(get().selectedMonth.month() - 1),
  })),
}))

/* 달력 선택된 날짜 상태 */

interface SelectedDateStore {
  selectedDate: dayjs.Dayjs
  setSelectedDate: (date: dayjs.Dayjs) => void
  setSelectedDateWithScroll: (date: dayjs.Dayjs) => void
}

let isListenScroll = true

export const useSelectedDateStore = create<SelectedDateStore>((set, get) => ({
  selectedDate: dayjs('1900-01-01'),
  setSelectedDate: (date: dayjs.Dayjs) => set(state => ({
    ...state,
    selectedDate: dayjs(date),
  })),
  setSelectedDateWithScroll: (date: dayjs.Dayjs) => {
    get().setSelectedDate(date)

    // 스크롤 중 selectedDate가 변하지 않도록 해야 함
    // 임시처방 https://github.com/w3c/csswg-drafts/issues/3744
    isListenScroll = false
    document.getElementById(date.format('YYYYMMDD'))?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      isListenScroll = true
    }, 500)
  },
}))

/* hooks */
// useSelectedMonthStore.subscribe(state => console.log(state.selectedMonth.format('YY-MM')))
// useSelectedDateStore.subscribe(state => console.log(state.selectedDate.format('YY-MM-DD')))

export const useInitSelectedDate = () => {
  const today = dayjs()
  const activeTargetEventList = useSelectedMonthStore(state => state.computed.activeTargetEventList)
  const setSelectedDate = useSelectedDateStore(state => state.setSelectedDate)

  useMount(() => {
    const targetDate = activeTargetEventList.find(({ itemDate }) => itemDate.isAfter(today))?.itemDate

    if (targetDate)
      setSelectedDate(targetDate)
  })
}

export const useEffectDateMonth = () => {
  const setSelectedDate = useSelectedDateStore(state => state.setSelectedDate)

  useEffect(() => {
    const unSubscribe = useSelectedMonthStore.subscribe((state) => {
      const firstEventDate = state.computed.activeTargetEventList.at(0)!.itemDate.date()
      const lastEventDate = state.computed.activeTargetEventList.at(-1)!.itemDate.date()

      const $eventList = document.getElementById('eventList')
      if (state.selectedMonth.isBefore(dayjs(), 'month')) {
        setSelectedDate(state.selectedMonth.date(lastEventDate))
        $eventList?.scrollTo({ top: $eventList?.scrollHeight })
      }
      else {
        setSelectedDate(state.selectedMonth.date(firstEventDate))
        $eventList?.scrollTo({ top: 0 })
      }
    })
    return () => {
      unSubscribe()
    }
  }, [])
}

export const useEffectEventListScroll = (calenderHeight: number) => {
  const selectedMonth = useSelectedMonthStore(state => state.selectedMonth)
  const setSelectedDate = useSelectedDateStore(state => state.setSelectedDate)

  useEffect(() => {
    const $eventList = document.getElementById('eventList')
    const dateList = Array.from(document.querySelectorAll<HTMLElement>('.date-item'))
      .map(element => ({
        id: element.id,
        top: element.offsetTop,
      }))

    function onScroll() {
      if (!dateList || !$eventList)
        return

      const SCROLL_MARGIN_TOP = 32
      const top = $eventList.scrollTop + SCROLL_MARGIN_TOP + 1

      let current = ''

      for (let i = 0; i < dateList.length; i++) {
        if (top >= dateList[i].top)
          current = dateList[i].id
      }

      if (isListenScroll && current)
        setSelectedDate(dayjs(current))
    }

    $eventList?.addEventListener('scroll', onScroll)
    return () => {
      $eventList?.removeEventListener('scroll', onScroll)
    }
  }, [calenderHeight, selectedMonth])
}

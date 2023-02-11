import { create } from 'zustand'

import dayjs from '~/libs/day'
import type { EventDay } from '~/libs/holiday'
import { allEventDayList } from '~/libs/holiday'

interface TargetEventDay {
  itemDate: dayjs.Dayjs
  eventList: EventDay[]
}

interface CalenderStore {
  today: dayjs.Dayjs
  selectedDate: dayjs.Dayjs
  computed: {
    monthStartBlankCnt: number
    monthDateList: dayjs.Dayjs[]
    targetEventList: TargetEventDay[]
    activeTargetEventList: TargetEventDay[]
  }
  setSelectedDate: (date: dayjs.Dayjs) => void
  goToday: () => void
  goNextMonth: () => void
  goPrevMonth: () => void
}

const useCalenderStore = create<CalenderStore>((set, get) => ({
  today: dayjs(),
  selectedDate: dayjs(),
  computed: {
    get monthStartBlankCnt() {
      return (get().selectedDate.date(0).day() + 1) % 7
    },
    get monthDateList() {
      const { selectedDate } = get()
      return [...Array(selectedDate.daysInMonth())].map((_, i) => selectedDate.date(i + 1))
    },
    get targetEventList() {
      return get().computed.monthDateList.map((_, i) => {
        const itemDate = get().selectedDate.date(i + 1) as dayjs.Dayjs
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
  setSelectedDate: (date: dayjs.Dayjs) => set(state => ({
    ...state,
    selectedDate: date,
  })),
  goToday: () => set(state => ({
    ...state,
    selectedDate: get().today,
  })),
  goNextMonth: () => set(state => ({
    ...state,
    selectedDate: get().selectedDate.month(get().selectedDate.month() + 1),
  })),
  goPrevMonth: () => set(state => ({
    ...state,
    selectedDate: get().selectedDate.month(get().selectedDate.month() - 1),
  })),
}))

export default useCalenderStore

import { create } from 'zustand'

import dayjs from '~/libs/dayjs'
import type { EventDay } from '~/libs/holiday'
import { allEventDayList } from '~/libs/holiday'

interface TargetEventDay {
  itemDate: dayjs.Dayjs
  eventList: EventDay[]
}

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
    selectedDate: dayjs(),
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

interface SelectedDateStore {

  selectedDate: dayjs.Dayjs
  setSelectedDate: (date: dayjs.Dayjs) => void
}

export const useSelectedDateStore = create<SelectedDateStore>((set, get) => ({
  selectedDate: dayjs(),
  setSelectedDate: (date: dayjs.Dayjs) => set(state => ({
    ...state,
    selectedDate: get().selectedDate.date(date.date()),
  })),
}))

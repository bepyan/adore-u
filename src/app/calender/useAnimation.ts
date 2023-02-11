import { useAnimationControls } from 'framer-motion'

import useCalenderStore from './useStore'

export const useAnimateCalender = () => {
  const today = useCalenderStore(state => state.today)
  const selectedDate = useCalenderStore(state => state.selectedDate)
  const goToday = useCalenderStore(state => state.goToday)
  const goNextMonth = useCalenderStore(state => state.goNextMonth)
  const goPrevMonth = useCalenderStore(state => state.goPrevMonth)

  const calenderControls = useAnimationControls()

  return {
    calenderControls,
    animateToday: async () => {
      goToday()
      await calenderControls.start(selectedDate.isBefore(today) ? 'rightEnter' : 'leftEnter')
      await calenderControls.start('animate')
    },
    animatePrevMonth: async () => {
      goPrevMonth()
      await calenderControls.start('leftEnter')
      await calenderControls.start('animate')
    },
    animateNextMonth: async () => {
      goNextMonth()
      await calenderControls.start('rightEnter')
      await calenderControls.start('animate')
    },
  }
}

export const useAnimateEventList = () => {
  const eventListControls = useAnimationControls()

  return {
    eventListControls,
    animateEventList: async () => {
      await eventListControls.start((i: number) => ({
        opacity: 0,
        x: 50 + i * 5,
        transition: { duration: 0 },
      }))

      eventListControls.start((i: number) => ({
        x: 0,
        transition: {
          ease: 'easeOut',
          duration: Math.max(0.3 - i * 0.05, 0.2),
          delay: i * 0.05,
        },
      }))

      await eventListControls.start((i: number) => ({
        opacity: 1,
        transition: {
          ease: 'easeOut',
          duration: Math.max(0.3 - i * 0.1, 0),
          delay: i * 0.1,
        },
      }))
    },
  }
}

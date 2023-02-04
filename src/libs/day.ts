import 'dayjs/locale/ko'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import localeData from 'dayjs/plugin/localeData'

dayjs.locale('ko')
dayjs.extend(localeData)
dayjs.extend(duration)

export default dayjs

export const renderDateDuration = (from: dayjs.Dayjs, to: dayjs.Dayjs) => {
  // 기준일부터 1일이기 때문
  const dateDiff = from.diff(to, 'day') + 1

  if (dateDiff === 1)
    return '오늘'

  return `${dateDiff}일 후`
}

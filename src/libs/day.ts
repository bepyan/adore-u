import 'dayjs/locale/ko'

import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

dayjs.locale('ko')
dayjs.extend(localeData)

export default dayjs

export const getHolidays = async () => {
  const url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo'

  const params = {
    serviceKey: 'eXLVxCgguez%2BklJZ2A%2FaFsTSRukOlVxpwxC%2BTMb74BHU9OCDQXfg%2BIVtP2AEivgxDM9Jve5j6si%2FjcPgETHHJQ%3D%3D',
    pageNo: '1',
    numOfRows: '100',
    solYear: '2023',
  }

  try {
    const res = await fetch(`${url}?${new URLSearchParams(params)}`)
    const data = await res.json()
    // eslint-disable-next-line no-console
    console.log(data)
    return data
  }
  catch (e) {
    console.error(e)
  }
}

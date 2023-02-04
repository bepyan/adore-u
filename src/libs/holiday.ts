import dayjs from './day'

export const holidayList = []

export const eventList = [
  {
    name: '1월 1일',
    date: dayjs().month(0).date(1),
    description: 'Happy New Years!',
  },
  {
    name: '발렌타인데이',
    date: dayjs().month(1).date(14),
    description: '연인들이 서로의 사랑을 확인하는 날로 서로 초콜릿을 보내줍니다.',
  },
  {
    name: '화이트데이',
    date: dayjs().month(2).date(14),
    description: '한국에서는 남성이 여성에게 초콜릿, 젤리를 주는 날입니다.',
  },
  {
    name: '로즈데이',
    date: dayjs().month(4).date(14),
    description: '연인들이 사랑의 표현으로 장미를 주고받는 날입니다.',
  },
  {
    name: '키스데이',
    date: dayjs().month(5).date(14),
    description: '연인들이 서로의 마음을 다시 한번 확인하는 뜻에서 키스를 나누는 날입니다.',
  },
  {
    name: '빼빼로데이',
    date: dayjs().month(10).date(11),
    description: '소중한 사람에게 빼뺴로를 선물해주는 날입니다.',
  },
  {
    name: '크리스마스',
    date: dayjs().month(11).date(25),
    description: 'Marry Merry Christmas!',
  },
]

export const allEventDayList = eventList
  .flatMap((event) => {
    return [0, 1, 2, 3].map(year => ({
      ...event,
      date: event.date.add(year, 'year'),
    }))
  })
  .flatMap((event) => {
    return [99, 199, 299, 999].map(diff => ({
      ...event,
      targetDate: event.date.subtract(diff, 'day'),
    }))
  })

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

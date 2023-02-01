import Button from '~/components/ui/Button'
import Card from '~/components/ui/Card'

export default function Home() {
  return (
    <main>
      <div className='container fixed inset-x-0 top-16 bg-slate-50'>
        <Card className=''>
          <h2>달력</h2>
          <div className="h-48 overflow-scroll">
          </div>
        </Card>
      </div>

      <div className='container mt-4 pt-80 pb-24'>
        <h2>다가오는 날짜</h2>
        <div className='mt-2 space-y-2'>
          <Card ><div>1000일 후 크리스마스</div></Card>
          <Card ><div>1년 후 주말</div></Card>
          <Card ><div>1000일 후 크리스마스</div></Card>
          <Card ><div>1년 후 주말</div></Card>
          <Card ><div>1000일 후 크리스마스</div></Card>
          <Card ><div>1년 후 주말</div></Card>
          <Card ><div>1000일 후 크리스마스</div></Card>
          <Card ><div>1년 후 주말</div></Card>
          <Card ><div>1000일 후 크리스마스</div></Card>
          <Card ><div>1년 후 주말</div></Card>
        </div>
      </div>

      <div className='fixed inset-x-0 bottom-14 h-8 bg-gradient-to-b from-transparent to-white' />
      <div className='fixed inset-x-0 bottom-0 bg-white pb-4'>
        <div className='flex items-center justify-center gap-2'>
          <Button variant="ghost">
            오늘
          </Button>
          <Button variant="ghost">
            전체 달력 보기
          </Button>
        </div>
      </div>
    </main>
  )
}

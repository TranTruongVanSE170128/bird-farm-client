import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import CircleChart from '@/components/ui/circle-chart'
import { formatPrice } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { TruckIcon, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import processIcon from '@/assets/process.svg'
import orderSuccessIcon from '@/assets/order-success.svg'
import orderCanceledIcon from '@/assets/order-canceled.svg'
import revenueIcon from '@/assets/revenue.svg'
import Spinner from '@/components/ui/spinner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LineChart from '@/components/ui/line-chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Statistical = {
  numberCustomer: number
  numberSuccessOrder: number
  numberCanceledOrder: number
  totalRevenue: number
  numberDeliveringOrder: number
  numberProcessingOrder: number
  totalRevenueSpecie: { _id: string; value: number; imageUrl: string }[]
  totalRevenueByDay: { _id: string; value: number; imageUrl: string }[]
}

function Dashboard() {
  const [statistical, setStatistical] = useState<Statistical | null>(null)
  const [isLoadingStatistical, setIsLoadingStatistical] = useState(true)
  const [loadingLineChart, setLoadingLineChart] = useState(false)
  const [searchParams] = useSearchParams()
  const days = searchParams.get('days') || '7'
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStatistical = async () => {
      setLoadingLineChart(true)
      const { data } = await birdFarmApi.get(`/api/statistical?days=${days}`)
      setStatistical(data)
      setIsLoadingStatistical(false)
      setLoadingLineChart(false)
    }

    fetchStatistical()
  }, [days])

  if (isLoadingStatistical) {
    return (
      <>
        <div className='text-3xl font-bold mb-4'>Dashboard</div>
        <Spinner className='w-12 h-12' />
      </>
    )
  }

  return (
    <div>
      <div className='text-3xl font-bold mb-4'>Dashboard</div>

      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-8 flex flex-col gap-4'>
          <div className='bg-accent flex items-center justify-between p-4 rounded-lg '>
            {/* ----- */}
            <div className='flex-1 flex flex-col gap-2 items-center'>
              <div className={buttonVariants({ size: 'icon' })}>
                <User />
              </div>
              <div className='font-medium'>Số khách hàng</div>
              <div className='font-medium text-2xl'>{statistical?.numberCustomer}</div>
            </div>
            {/* ----- */}
            <div className='flex-1 flex flex-col gap-2 items-center'>
              <div className={buttonVariants({ size: 'icon' })}>
                <img src={orderSuccessIcon} className='w-6 h-6 filter invert' />
              </div>
              <div className='font-medium'>Số đơn hàng thành công</div>
              <div className='font-medium text-2xl'>{statistical?.numberSuccessOrder}</div>
            </div>
            {/* ----- */}
            <div className='flex-1 flex flex-col gap-2 items-center'>
              <div className={buttonVariants({ size: 'icon' })}>
                <img src={orderCanceledIcon} className='w-6 h-6 filter invert' />
              </div>
              <div className='font-medium'>Số đơn hàng bi hủy</div>
              <div className='font-medium text-2xl'>{statistical?.numberCanceledOrder}</div>
            </div>
            {/* ----- */}
            <div className='flex-1 flex flex-col gap-2 items-center'>
              <div className={buttonVariants({ size: 'icon' })}>
                <img src={revenueIcon} className='w-6 h-6 filter invert' />
              </div>
              <div className='font-medium'>Tổng doanh thu</div>
              <div className='font-medium text-2xl'>{formatPrice(statistical?.totalRevenue || 0)}</div>
            </div>
            {/* ----- */}
          </div>

          <div>
            <Select
              value={String(days)}
              onValueChange={(val) => {
                navigate(`/manager?days=${val}`)
              }}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='ngày' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='7'>1 Tuần</SelectItem>
                <SelectItem value='30'>1 Tháng</SelectItem>
                <SelectItem value='90'>3 Tháng</SelectItem>
                <SelectItem value='180'>6 Tháng</SelectItem>
                <SelectItem value='365'>1 Năm</SelectItem>
              </SelectContent>
            </Select>
            <LineChart
              loadingLineChart={loadingLineChart}
              chartData={statistical?.totalRevenueByDay || []}
              days={Number(days)}
            />
          </div>

          <div className='bg-accent flex p-4 rounded-lg flex-col gap-4'>
            <div className='font-medium text-lg '>Top 4 loài chim có doanh thu cao</div>
            <div className='grid grid-cols-4 gap-4'>
              {statistical?.totalRevenueSpecie.slice(0, 4).map((x) => {
                return (
                  <Card className='overflow-hidden rounded-2xl col-span-1'>
                    <CardHeader className='p-0 mb-2'>
                      <div className='aspect-square'>
                        <img
                          src={x.imageUrl || 'https://github.com/shadcn.png'}
                          alt=''
                          className='object-fill w-full h-full transition-all duration-300 hover:scale-105'
                        />
                      </div>
                    </CardHeader>
                    <CardContent className='font-medium text-center line-clamp-1 p-0'>{x._id}</CardContent>
                    <CardFooter className='text-xs flex items-center gap-1'>
                      Doanh thu: <span className='text-sm text-primary'>{formatPrice(x.value)}</span>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        <div className='col-span-4 flex flex-col gap-4'>
          <div className='p-4 rounded-lg bg-accent'>
            <CircleChart
              title='Tỉ lệ doanh thu theo loài'
              items={{
                labels: statistical?.totalRevenueSpecie.map((x) => x._id) || [],
                values: statistical?.totalRevenueSpecie.map((x) => x.value) || []
              }}
            />
          </div>

          <div className='flex flex-col gap-4 p-4 rounded-lg bg-accent'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center justify-center p-3 rounded-full bg-yellow-400'>
                <img src={processIcon} className='w-9 h-9' />
              </div>
              <div>
                <div className='flex flex-col'>
                  <div className='text-xl font-semibold'>Số đơn chờ duyệt</div>
                  <div className='text-3xl font-bold text-warning'>{statistical?.numberProcessingOrder}</div>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center justify-center p-3 rounded-full bg-blue-400'>
                <TruckIcon className='w-9 h-9' />
              </div>
              <div>
                <div className='flex flex-col'>
                  <div className='text-xl font-semibold'>Số đơn đang giao</div>
                  <div className='text-3xl font-bold text-info'>{statistical?.numberDeliveringOrder}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

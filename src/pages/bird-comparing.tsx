import Container from '@/components/ui/container'
import { useSearchParams } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Bird } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import BirdCard from '@/components/bird-card'
import Spinner from '@/components/ui/spinner'
import versusIcon from '@/assets/versus.png'

function BirdComparing() {
  const [searchParams] = useSearchParams()
  const [firstBird, setFirstBird] = useState<Bird | null>(null)
  const [secondBird, setSecondBird] = useState<Bird | null>(null)

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const { data } = await birdFarmApi.post('/api/birds/get-by-ids', {
          birds: [searchParams.get('firstBird'), searchParams.get('secondBird')]
        })

        if (data.birds.length === 2) {
          setFirstBird(data.birds[0])
          setSecondBird(data.birds[1])
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchBirds()
  }, [searchParams])

  if (!firstBird || !secondBird) {
    return <Spinner />
  }

  return (
    <main className='mt-12'>
      <Container>
        <h1 className='text-3xl font-bold'>So sánh chim kiểng</h1>
        <div className='flex mt-4'>
          <div className='flex flex-col border justify-center items-center basis-1/3'>
            <div className='text-center text-xl font-medium'>{firstBird?.name}</div>
            <img src={versusIcon} className='w-32 h-32' />
            <div className='text-center text-xl font-medium'>{firstBird?.name}</div>
          </div>

          <div className='basis-1/3 flex justify-center border'>
            <BirdCard className='max-w-[350px]' bird={firstBird} />
          </div>

          <div className='basis-1/3 flex justify-center border'>
            <BirdCard className='max-w-[350px]' bird={secondBird} />
          </div>
        </div>

        <Table className=''>
          <TableHeader>
            <TableRow className='grid grid-cols-12'>
              <TableHead className='border col-span-4 text-base'>Thông tin so sánh</TableHead>
              <TableHead className='border col-span-4 text-base'>Chim chào mào huế, mã SE170112</TableHead>
              <TableHead className='border col-span-4 text-base'>Chim chào mào huế, mã SE170112</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='border col-span-4'>Bố</TableCell>
              <TableCell className='border col-span-4'>Trương Văn(xem thông tin chi tiết)</TableCell>
              <TableCell className='border col-span-4'>Trương Văn(xem thông tin chi tiết)</TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='border col-span-4'>Mẹ</TableCell>
              <TableCell className='border col-span-4'>Trương Văn(xem thông tin chi tiết)</TableCell>
              <TableCell className='border col-span-4'>Trương Văn(xem thông tin chi tiết)</TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='border col-span-4'>Ngày sinh</TableCell>
              <TableCell className='border col-span-4'>30/12/2015</TableCell>
              <TableCell className='border col-span-4'>30/12/0201</TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='border col-span-4'>Giới tính</TableCell>
              <TableCell className='border col-span-4'>Chim đực</TableCell>
              <TableCell className='border col-span-4'>Chim đực</TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='border col-span-4'>Sức khỏe</TableCell>
              <TableCell className='border col-span-4'>Ăn uống tốt, khỏe mạnh, nhanh nhẹn</TableCell>
              <TableCell className='border col-span-4'>Ăn uống tốt, khỏe mạnh, nhanh nhẹn</TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='border col-span-4'>Thành tích thi đấu</TableCell>
              <TableCell className='border col-span-4'>Huy chương vàng cấp QG</TableCell>
              <TableCell className='border col-span-4'>Huy chương vàng cấp QG</TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='border col-span-4'>Giá</TableCell>
              <TableCell className='border col-span-4'>5.500.000 đ</TableCell>
              <TableCell className='border col-span-4'>5.500.000 đ</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </main>
  )
}

export default BirdComparing

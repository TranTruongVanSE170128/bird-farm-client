import Container from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Bird } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Props = {
  className?: string
  bird?: Bird
}
function BirdComparing({ className, bird }: Props) {
  const [isListVisible, setListVisible] = useState(false)
  const toggleList = () => {
    setListVisible(!isListVisible)
  }

  return (
    <main>
      <Container>
        <div className='flex flex-col md:flex-row md:items-center justify-start'>
          <p className='uppercase font-semibold text-2xl pt-3'>So sánh sản phẩm</p>
        </div>
        <div className='w-full h-[1px] bg-black mt-3'></div>
        <div className='flex flex-col md:flex-row md:justify-between items-center'>
          <div className='md:flex-1 mx-10'>
            <Input className='mt-3 mb-3 text-center' placeholder='Tìm kiếm chim để so sánh...' />
            <Link
              to={`/birds/${bird?._id}`}
              className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}
            >
              <div>
                <img
                  className='rounded'
                  src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
                  alt=''
                />
              </div>
              <p className='underline text-cyan-400 text-center pt-3'>Xem chi tiết</p>
            </Link>
          </div>
          <div className=' mx-10'>
            <img src='src/assets/compare.png' alt='compare' className='mx-auto w-[60px]' />
          </div>
          <div className='md:flex-1 mx-10'>
            <Input className='mt-3 mb-3 text-center' placeholder='Tìm kiếm chim để so sánh...' />
            <Link
              to={`/birds/${bird?._id}`}
              className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}
            >
              <div>
                <img
                  className='rounded'
                  src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
                  alt=''
                />
              </div>
              <p className='underline text-cyan-400 text-center pt-3'>Xem chi tiết</p>
            </Link>
          </div>
        </div>
        <div className='mt-3'>
          <p
            className='uppercase text-xl font-bold bg-primary py-2 mb-3  text-white cursor-pointer'
            onClick={toggleList}
          >
            <div className='flex gap-4 px-3 items-center'>
              {isListVisible ? <ChevronUp></ChevronUp> : <ChevronDown></ChevronDown>}
              Thông tin so sánh
            </div>
          </p>
          {!isListVisible && (
            <div className='flex justify-center'>
              <Table className='w-full leading-normal'>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-center text-xl'>Chim chào mã SE170112</TableHead>
                    <TableHead className='text-center text-xl'>Thông tin</TableHead>
                    <TableHead className='text-center text-xl'>Chim yến mã SE170128</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className='text-center'>
                    <TableCell>Alex</TableCell>
                    <TableCell className='font-bold'>Bố</TableCell>
                    <TableCell>Wilson</TableCell>
                  </TableRow>
                  <TableRow className='text-center'>
                    <TableCell>Alison</TableCell>
                    <TableCell className='font-bold'>Mẹ</TableCell>
                    <TableCell>Jenny</TableCell>
                  </TableRow>
                  <TableRow className='text-center'>
                    <TableCell>20/12/2022</TableCell>
                    <TableCell className='font-bold'>Ngày sinh</TableCell>
                    <TableCell>19/3/2015</TableCell>
                  </TableRow>
                  <TableRow className='text-center'>
                    <TableCell>Đực</TableCell>
                    <TableCell className='font-bold'>Giới tính</TableCell>
                    <TableCell>Cái</TableCell>
                  </TableRow>
                  <TableRow className='text-center'>
                    <TableCell>Tốt, nhanh nhẹn</TableCell>
                    <TableCell className='font-bold'>Sức khỏe</TableCell>
                    <TableCell>Cần được chăm sóc</TableCell>
                  </TableRow>
                  <TableRow className='text-center'>
                    <TableCell>Không có thành tích</TableCell>
                    <TableCell className='font-bold'>Thành tích thi đấu</TableCell>
                    <TableCell>3 lần huy chương vàng quốc gia</TableCell>
                  </TableRow>
                  <TableRow className='text-center'>
                    <TableCell>15.000.000đ</TableCell>
                    <TableCell className='font-bold'>Giá</TableCell>
                    <TableCell>19.780.000đ</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}

export default BirdComparing

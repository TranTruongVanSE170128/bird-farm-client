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
          <div className='md:flex-1'>
            <Input />
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
          <div className='md:flex-1 '>
            <img src='src/assets/compare.png' alt='compare' className='mx-auto  w-[80px]' />
          </div>
          <div className='md:flex-1'>
            <Input />
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
              <Table className='min-w-full leading-normal'>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chim chào mào mã SE170112</TableHead>
                    <TableHead>Thông tin</TableHead>
                    <TableHead>Chim yến mã SE170128</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Alex</TableCell>
                    <TableCell>Bố</TableCell>
                    <TableCell>Wilson</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Alison</TableCell>
                    <TableCell>Mẹ</TableCell>
                    <TableCell>Jenny</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>20/12/2022</TableCell>
                    <TableCell>Ngày sinh</TableCell>
                    <TableCell>19/3/2015</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Đực</TableCell>
                    <TableCell>Giới tính</TableCell>
                    <TableCell>Cái</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tốt, nhanh nhẹn</TableCell>
                    <TableCell>Sức khỏe</TableCell>
                    <TableCell>Cần được chăm sóc</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Không có thành tích</TableCell>
                    <TableCell>Thành tích thi đấu</TableCell>
                    <TableCell>3 lần huy chương vàng quốc gia</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>15.000.000đ</TableCell>
                    <TableCell>Giá</TableCell>
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

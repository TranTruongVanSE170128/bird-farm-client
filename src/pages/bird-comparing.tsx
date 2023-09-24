import Container from '@/components/ui/container'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SelectContent, SelectGroup, SelectTrigger, SelectValue, Select, SelectItem } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function BirdComparing() {
  const [isListVisible, setListVisible] = useState(false)
  const toggleList = () => {
    setListVisible(!isListVisible)
  }

  return (
    <main>
      <Container>
        <section className='container mt-5'>
          <div className='flex gap-5'>
            <div className='basis-1/3 my-auto'>
              <div>
                <h3 className='text-2xl uppercase font-bold text-center'>So sánh chim trưởng thành</h3>
              </div>
              <div className='flex flex-col gap-7 items-center mt-11'>
                <div className='text-center'>
                  <h2 className='text-3xl'>Chim Chào Mào Huế </h2>
                  <h2 className='text-3xl'>Mã(SE170112)</h2>
                </div>
                <h3 className='text-3xl'>&</h3>
                <div className='text-center'>
                  <h2 className='text-3xl'>Chim Chào Mào Huế</h2>
                  <h2 className='text-3xl'>Mã(SE170112)</h2>
                </div>
              </div>
            </div>
            <div className='basis-1/3 container'>
              <Select>
                <SelectTrigger className='w-full p-6'>
                  <SelectValue className='font-semibold' placeholder={` Chọn chim muốn so sánh`} />
                </SelectTrigger>
                <SelectContent className='max-h-[300px] overflow-y-auto'>
                  <SelectGroup>
                    {new Array(10).fill(null).map((i, index) => (
                      <SelectItem value={index.toString()} key={index}>
                        <div className='flex p-2 justify-between items-center gap-3  rounded-lg  '>
                          <img
                            src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
                            alt=''
                            className='aspect-auto object-cover w-[50px] rounded-lg'
                          />
                          <p>Chim Chào Mào Huế mã SE170112</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Card className='mt-5 p-3 bg-gray-200'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
                  alt=''
                />
                <p className='mt-2'>Chim chào mào huế, mã SE170112</p>
                <p className='mt-2'>Loài: chim Chào mào </p>
                <p className='text-2xl text-red-300 mt-2'>5.500.000 đ </p>
                <Link to='#' className='underline underline-offset-3 mt-2'>
                  {' '}
                  Xem chi tiết
                </Link>
              </Card>
            </div>
            <div className='basis-1/3 container'>
              <Select>
                <SelectTrigger className='w-full p-6'>
                  <SelectValue className='font-semibold ' placeholder={` Chọn chim muốn so sánh`} />
                </SelectTrigger>
                <SelectContent className='max-h-[300px] overflow-y-auto'>
                  <SelectGroup>
                    {new Array(15).fill(null).map((i, index) => (
                      <SelectItem value={index.toString()} key={index}>
                        <div className='flex p-2 justify-between items-center gap-3  rounded-lg  '>
                          <img
                            src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
                            alt=''
                            className='aspect-auto object-cover w-[50px] rounded-lg'
                          />
                          <p>Chim Chào Mào Huế mã SE170112</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Card className='mt-5 p-3 bg-gray-200'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
                  alt=''
                />
                <p className='mt-2'>Chim chào mào huế, mã SE170112</p>
                <p className='mt-2'>Loài: chim Chào mào </p>
                <p className='text-2xl text-red-300 mt-2'>5.500.000 đ </p>
                <Link to='#' className='underline underline-offset-3 mt-2'>
                  {' '}
                  Xem chi tiết
                </Link>
              </Card>
            </div>
          </div>

          <div className='mt-3'>
            <div className='mt-3 p-3 transition-all'>
              <p
                className='uppercase text-xl font-bold bg-primary py-2 mb-3  px-4 text-white cursor-pointer'
                onClick={toggleList}
              >
                <div className='flex gap-4 px-3 items-center'>
                  {isListVisible ? <ChevronUp></ChevronUp> : <ChevronDown></ChevronDown>}
                  Mô tả chi tiết
                </div>
              </p>
              {isListVisible && (
                <Table>
                  <TableCaption>A list of bird information.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b  border-collapse'>
                        Thông tin so sánh
                      </TableHead>
                      <TableHead className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b border-x-2 border-collapse'>
                        Chim chào mào huế, mã SE170112
                      </TableHead>
                      <TableHead className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b'>
                        Chim chào mào huế, mã SE170112
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b  border-collapse'>
                        Bố
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b border-x-2 border-collapse'>
                        Trương Văn(xem thông tin chi tiết)
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b'>
                        Trương Văn(xem thông tin chi tiết)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b  border-collapse'>
                        Mẹ
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b border-x-2 border-collapse'>
                        Trương Văn(xem thông tin chi tiết)
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b'>
                        Trương Văn(xem thông tin chi tiết)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b  border-collapse'>
                        Ngày sinh
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b border-x-2 border-collapse'>
                        30/12/2015
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b'>
                        30/12/0201
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b  border-collapse'>
                        Giới tính
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b border-x-2 border-collapse'>
                        Chim đực
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b'>
                        Chim đực
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b  border-collapse'>
                        Sức khỏe
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b border-x-2 border-collapse'>
                        Ăn uống tốt, khỏe mạnh, nhanh nhẹn
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b'>
                        Ăn uống tốt, khỏe mạnh, nhanh nhẹn
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b  border-collapse'>
                        Thành tích thi đấu
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b border-x-2 border-collapse'>
                        Huy chương vàng cấp QG
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b'>
                        Huy chương vàng cấp QG
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b  border-collapse'>
                        Giá
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b border-x-2 border-collapse'>
                        5.500.000 đ
                      </TableCell>
                      <TableCell className='text-left basis-1/3 border-spacing-3  px-4 py-2 border-b'>
                        5.500.000 đ
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default BirdComparing

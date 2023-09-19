import Container from '@/components/ui/container'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

function NestListItem() {
  return (
    <main>
      <Container>
        <div className='flex justify-center'>
          <p className='underline pt-5 font-medium text-4xl uppercase'>Tổ chim non có sẵn</p>
        </div>
        <div className=''>
          <div className='flex justify-end'>
            <p className='pt-5 font-medium text-2xl'>Loài Chim</p>
          </div>
          <div className='flex justify-end mt-3'>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue className='font-semibold' placeholder='Chọn loài chim' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Loài chim</SelectLabel>
                  <SelectItem value='Chim sẻ'>Chim sẻ</SelectItem>
                  <SelectItem value='Chim vành khuyên'>Chim vành khuyên</SelectItem>
                  <SelectItem value='Chim sáo'>Chim sáo</SelectItem>
                  <SelectItem value='Chim mật'>Chim mật</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
          <NestCard />
          <NestCard />
          <NestCard />
          <NestCard />
          <NestCard />
          <NestCard />
          <NestCard />
          <NestCard />
        </div>
        <Button className='mx-auto block mt-6' size='lg'>
          Xem tất cả
        </Button>
      </Container>
    </main>
  )
}

export default NestListItem

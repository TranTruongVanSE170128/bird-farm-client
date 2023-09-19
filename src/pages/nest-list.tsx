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
import NestCard from '@/components/nest-card'

function NestListItem() {
  return (
    <main>
      <Container>
        <div className='flex justify-between items-center mt-10 mb-6'>
          <h1 className='text-3xl font-bold'>Các loài chim đang bán tại cửa hàng</h1>
        </div>

        <div className='pt-5 font-medium text-2xl'>Bộ Lọc</div>

        <Select>
          <SelectTrigger className='w-[180px] mt-3'>
            <SelectValue className='font-semibold' placeholder='Lọc loài chim' />
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
      </Container>
    </main>
  )
}

export default NestListItem

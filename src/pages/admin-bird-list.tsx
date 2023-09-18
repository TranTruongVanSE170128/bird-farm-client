import Paginate from '@/components/paginate'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bird, getSpecie } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import axios from 'axios'
import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const pageSize = 12

function AdminBirdList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const specie = searchParams.get('specie') || ''
  const [birds, setBirds] = useState<Bird[]>([])
  const [isLoadingBirds, setIsLoadingBirds] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/admin/birds?pageSize=${pageSize}&pageNumber=${pageNumber}searchQuery=${searchQuery}&specie=${specie}`
        )
        setBirds(data?.birds || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBirds()
  }, [pageNumber, searchQuery, specie])

  if (!birds) {
    return <div>Loading</div>
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Loài</TableHead>
            <TableHead className='text-center'>Tên</TableHead>
            <TableHead className='text-center'>Ảnh</TableHead>
            <TableHead className='text-center'>Giá</TableHead>
            {/* <TableHead className='text-center'>Đã Bán</TableHead> */}
            <TableHead className='text-center'>Đang Bán</TableHead>
            <TableHead className='text-center'>Giới Tính</TableHead>
            <TableHead className='text-end'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {birds.map((bird) => {
            return (
              <TableRow key={bird._id}>
                <TableCell className='line-clamp-1'>{getSpecie(bird).name}</TableCell>
                <TableCell className='text-center'>{bird.name}</TableCell>
                <TableCell className='text-center'>
                  <img src={bird.imageUrls?.[0]} alt='bird' />
                </TableCell>
                <TableCell className='text-center'>{formatPrice(bird.price)}</TableCell>
                {/* <TableCell className='text-center'>Đã Bán</TableCell> */}
                <TableCell className='text-center flex justify-center'>
                  {bird.onSale ? <Check color='green' /> : <X color='red' />}
                </TableCell>
                <TableCell className='text-center'>{bird.gender === 'male' ? 'Đực' : 'Cái'}</TableCell>
                <TableCell className='text-center'>{bird.gender === 'male' ? 'Đực' : 'Cái'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={`/birds?searchQuery=${searchQuery}`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default AdminBirdList

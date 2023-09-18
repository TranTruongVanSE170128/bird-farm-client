import Paginate from '@/components/paginate'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bird } from '@/lib/types'
import axios from 'axios'
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
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/admin/birds?pageSize=${pageSize}&pageNumber=${pageNumber}searchQuery=${searchQuery}&specie=${specie}`
      )
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
            <TableHead className='w-[100px]'>Loài</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead>Giá</TableHead>
            {/* <TableHead>Đã Bán</TableHead> */}
            <TableHead>Đang Bán</TableHead>
            <TableHead>Giới Tính</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {birds.map((bird) => {
            return (
              <TableRow>
                <TableCell className='w-[100px]'>{getSpecie}</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Giá</TableCell>
                {/* <TableCell>Đã Bán</TableCell> */}
                <TableCell>Đang Bán</TableCell>
                <TableCell>Giới Tính</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell className='text-right'>Amount</TableCell>
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

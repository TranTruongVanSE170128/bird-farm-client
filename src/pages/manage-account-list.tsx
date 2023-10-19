import Paginate from '@/components/paginate'
import { User } from '@/lib/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { addSearchParams } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Spinner from '@/components/ui/spinner'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const pageSize = 12

function ManageAccountList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const [accounts, setAccounts] = useState<User[]>([])
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoadingAccounts(true)
      try {
        const { data } = await birdFarmApi.get(addSearchParams('/api/users/pagination', { pageNumber, pageSize }))
        setAccounts(data?.users || null)
        setIsLoadingAccounts(false)
        setTotalPages(data?.totalPages || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAccounts()
  }, [pageNumber])

  if (!accounts) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách tài khoản</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Ảnh đại diên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead className='text-center'>Xác minh</TableHead>
            <TableHead className='text-center'>Vai trò</TableHead>
            <TableHead className='text-end'></TableHead>
          </TableRow>
        </TableHeader>

        {!isLoadingAccounts && (
          <TableBody>
            {accounts.map((account) => {
              return (
                <TableRow key={account._id}>
                  <TableCell className='text-center flex justify-center'>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage src={account.imageUrl || 'https://github.com/shadcn.png'} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className='font-medium'>{account.email}</TableCell>
                  <TableCell className='font-medium'>{account.name}</TableCell>
                  <TableCell className='text-center flex justify-center'>
                    {account.verified ? (
                      <Check className='text-primary w-8 h-8' />
                    ) : (
                      <X className='text-destructive w-8 h-8' />
                    )}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Select
                      defaultValue={(() => {
                        console.log(account.role)
                        return account.role.toString()
                      })()}
                    >
                      <SelectTrigger className='w-fit mx-auto'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className='w-fit'>
                        <SelectItem value='customer'>
                          <Badge variant='breed'>Khách hàng</Badge>
                        </SelectItem>
                        <SelectItem value='staff'>
                          <Badge variant='success'>Nhân viên</Badge>
                        </SelectItem>
                        <SelectItem value='manager'>
                          <Badge variant='warning'>Quản lý</Badge>
                        </SelectItem>
                        <SelectItem value='admin'>
                          <Badge variant='info'>Quản trị viên</Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        )}
      </Table>
      {isLoadingAccounts && <Spinner className='mt-5' />}
      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={addSearchParams('/manager/accounts', {})}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default ManageAccountList

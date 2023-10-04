import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

type PaginateProps = {
  pageSize: number
  totalPages: number
  path: string
  pageNumber: number
  className?: string
}

const Paginate = ({ totalPages, path, pageSize, className, pageNumber }: PaginateProps) => {
  const navigate = useNavigate()

  const paginate = ({ selected }: { selected: number }) => {
    const pathWithPaginate = `${path}${path.indexOf('?') === -1 ? '?' : '&'}pageNumber=${
      selected + 1
    }&pageSize=${pageSize}`
    window.scrollTo(0, 0)
    navigate(pathWithPaginate)
  }

  return (
    <ReactPaginate
      forcePage={pageNumber - 1}
      onPageChange={paginate}
      pageCount={totalPages}
      breakClassName={buttonVariants({ variant: 'ghost' })}
      previousLabel={'Trước'}
      nextLabel={'Sau'}
      containerClassName={cn('flex justify-center gap-2 join', className)}
      pageLinkClassName={buttonVariants({ variant: 'outline' })}
      previousLinkClassName={buttonVariants({ variant: 'link' })}
      nextLinkClassName={buttonVariants({ variant: 'link' })}
      activeLinkClassName={buttonVariants()}
    />
  )
}

export default Paginate

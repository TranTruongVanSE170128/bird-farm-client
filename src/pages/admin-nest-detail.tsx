import { Button, buttonVariants } from '@/components/ui/button'
import { Nest, getSpecie } from '@/lib/types'
import { cn, formatPrice } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft, Edit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import noImage from '@/assets/no-image.avif'
import NestForm from '@/components/forms/nest-form'
import Spinner from '@/components/ui/spinner'

function AdminNestDetail() {
  const { id } = useParams()
  const [nest, setNest] = useState<Nest | null>(null)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    const fetchNest = async () => {
      try {
        const { data } = await birdFarmApi.get(`/api/nests/${id}`)
        setNest(data?.nest || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchNest()
  }, [id])

  if (!nest) {
    return <Spinner />
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex gap-2'>
          <div className='text-3xl font-bold'>{!edit ? 'Chi tiết tổ chim' : 'Chỉnh sửa tổ chim'}</div>
        </div>

        <div className='flex gap-2'>
          {!edit && (
            <Button
              onClick={() => {
                setEdit(true)
              }}
              className='mb-6 flex items-center gap-1 my-auto'
            >
              <span>Chỉnh sửa</span>
              <Edit className='w-5 h-5' />
            </Button>
          )}
          <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/admin/nests'>
            <span>Quay lại</span>
            <ArrowLeft className='w-5 h-5' />
          </Link>
        </div>
      </div>
      {!edit ? (
        <>
          <div className='flex gap-12'>
            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Loài chim:</div> {getSpecie(nest).name}
            </div>
            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Tên tổ chim:</div> {nest?.name}
            </div>
          </div>

          <div className='flex gap-12'>
            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Bố:</div>{' '}
              {nest.dad ? (
                <Link className='hover:underline hover:text-primary' to={`/admin/birds/${nest.dad._id}`}>
                  {nest.dad.name}
                </Link>
              ) : (
                'Không có thông tin'
              )}
            </div>

            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Mẹ:</div>{' '}
              {nest.mom?._id ? (
                <Link className='hover:underline hover:text-primary' to={`/admin/birds/${nest.mom._id}`}>
                  {nest.mom.name}
                </Link>
              ) : (
                'Không có thông tin'
              )}
            </div>

            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Giá:</div> {formatPrice(nest?.price)}
            </div>
          </div>

          <div className='text-lg font-bold mb-2'>Ảnh</div>
          <div>
            {!nest?.imageUrls?.length ? (
              <img src={noImage} alt='' width={240} height={240} className='object-contain rounded-md' />
            ) : (
              <div className='flex gap-2 flex-wrap'>
                {nest?.imageUrls.map((imageUrl) => {
                  return <img src={imageUrl} alt='' width={240} height={240} className='rounded-md object-contain' />
                })}
              </div>
            )}
          </div>

          <div className='mt-6 text-xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold mb-3'>
            Mô tả
          </div>
          {nest?.description ? (
            <div dangerouslySetInnerHTML={{ __html: nest.description }} />
          ) : (
            <div>Chưa có mô tả</div>
          )}
        </>
      ) : (
        <NestForm setEdit={setEdit} action='update' btnTitle='Lưu' nest={nest} />
      )}
    </div>
  )
}

export default AdminNestDetail

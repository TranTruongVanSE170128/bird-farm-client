import { Button, buttonVariants } from '@/components/ui/button'
import { Nest, getSpecie } from '@/lib/types'
import { cn, formatPrice } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft, Edit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import noImage from '@/assets/no-image.webp'
import NestForm from '@/components/forms/nest-form'
import Spinner from '@/components/ui/spinner'

function ManageNestDetail() {
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
              className='flex items-center gap-1 my-auto'
            >
              <span>Chỉnh sửa</span>
              <Edit className='w-5 h-5' />
            </Button>
          )}
          <Link className={cn(buttonVariants(), 'flex items-center gap-1 my-auto')} to='/manager/nests'>
            <span>Quay lại</span>
            <ArrowLeft className='w-5 h-5' />
          </Link>
        </div>
      </div>
      {!edit ? (
        <>
          <div className='flex gap-12'>
            <div className='flex items-center gap-2 mb-4 text-lg'>
              <div className='font-bold'>Loài chim:</div> {getSpecie(nest).name}
            </div>
            <div className='flex items-center gap-2 mb-4 text-lg'>
              <div className='font-bold'>Tên tổ chim:</div> {nest?.name}
            </div>
          </div>

          <div className='flex gap-12'>
            <div className='flex items-center gap-2 mb-4 text-lg'>
              <div className='font-bold'>Bố:</div>{' '}
              {nest.dad ? (
                <Link className='hover:underline hover:text-primary' to={`/manager/birds/${nest.dad._id}`}>
                  {nest.dad.name}
                </Link>
              ) : (
                'Không có thông tin'
              )}
            </div>

            <div className='flex items-center gap-2 mb-4 text-lg'>
              <div className='font-bold'>Mẹ:</div>{' '}
              {nest.mom?._id ? (
                <Link className='hover:underline hover:text-primary' to={`/manager/birds/${nest.mom._id}`}>
                  {nest.mom.name}
                </Link>
              ) : (
                'Không có thông tin'
              )}
            </div>

            <div className='flex items-center gap-2 mb-4 text-lg'>
              <div className='font-bold'>Giá:</div> {formatPrice(nest?.price)}
            </div>
          </div>

          <div className='mb-2 text-lg font-bold'>Ảnh</div>
          <div>
            {!nest?.imageUrls?.length ? (
              <img src={noImage} alt='' width={240} height={240} className='object-contain rounded-md' />
            ) : (
              <div className='flex flex-wrap gap-2'>
                {nest?.imageUrls.map((imageUrl) => {
                  return <img src={imageUrl} alt='' width={240} height={240} className='object-contain rounded-md' />
                })}
              </div>
            )}
          </div>

          <div className='mt-6 mb-3 text-xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
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

export default ManageNestDetail

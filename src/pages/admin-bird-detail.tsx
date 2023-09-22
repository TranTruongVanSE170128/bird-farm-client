import { Button, buttonVariants } from '@/components/ui/button'
import { Bird, getSpecie } from '@/lib/types'
import { cn } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft, Edit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import noImage from '@/assets/no-image.avif'
import BirdForm from '@/components/forms/bird-form'
import Spinner from '@/components/ui/spinner'

function AdminBirdDetail() {
  const { id } = useParams()
  const [bird, setBird] = useState<Bird | null>(null)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    const fetchBird = async () => {
      try {
        const { data } = await birdFarmApi.get(`/api/birds/${id}`)
        setBird(data?.bird || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBird()
  }, [id])

  if (!bird) {
    return <Spinner />
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex gap-2'>
          <div className='text-3xl font-bold'>{!edit ? 'Chi tiết chim' : 'Chỉnh sửa chim'}</div>
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
          <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/admin/birds'>
            <span>Quay lại</span>
            <ArrowLeft className='w-5 h-5' />
          </Link>
        </div>
      </div>
      {!edit ? (
        <>
          <div className='flex items-center gap-2 text-lg mb-4'>
            <div className='font-bold'>Tên chim:</div> {bird?.name}
          </div>
          <div className='flex items-center gap-2 text-lg mb-4'>
            <div className='font-bold'>Loài chim:</div> {getSpecie(bird).name}
          </div>
          <div className='flex items-center gap-2 text-lg mb-4'>
            <div className='font-bold'>Giới tính:</div> {bird.gender}
          </div>
          <div className='text-lg font-bold mb-2'>Ảnh</div>
          <div>
            {!bird?.imageUrls?.length ? (
              <img src={noImage} alt='' width={240} height={240} className='object-contain rounded-md' />
            ) : (
              <div className='flex gap-2 flex-wrap'>
                {bird?.imageUrls.map((imageUrl) => {
                  return <img src={imageUrl} alt='' width={240} height={240} className='rounded-md object-contain' />
                })}
              </div>
            )}
          </div>

          <div className='mt-6 text-xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold mb-3'>
            Mô tả
          </div>
          {bird?.description ? (
            <div dangerouslySetInnerHTML={{ __html: bird.description }} />
          ) : (
            <div>Chưa có mô tả</div>
          )}
        </>
      ) : (
        <BirdForm setEdit={setEdit} action='update' btnTitle='Lưu' bird={bird} />
      )}
      {/* <BirdForm setEdit={setEdit} action='update' btnTitle='Lưu' bird={bird} /> */}
    </div>
  )
}

export default AdminBirdDetail

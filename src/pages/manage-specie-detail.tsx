import { Button, buttonVariants } from '@/components/ui/button'
import { Specie } from '@/lib/types'
import { cn } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft, Edit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import noImage from '@/assets/no-image.avif'
import SpecieForm from '@/components/forms/specie-form'
import Spinner from '@/components/ui/spinner'

function ManageSpecieDetail() {
  const { id } = useParams()
  const [specie, setSpecie] = useState<Specie | null>(null)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    const fetchSpecie = async () => {
      try {
        const { data } = await birdFarmApi.get(`/api/species/${id}`)
        setSpecie(data?.specie || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSpecie()
  }, [id])

  if (!specie) {
    return <Spinner />
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex gap-2'>
          <div className='text-3xl font-bold'>{!edit ? 'Chi tiết loài chim' : 'Chỉnh sửa loài chim'}</div>
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
          <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/admin/species'>
            <span>Quay lại</span>
            <ArrowLeft className='w-5 h-5' />
          </Link>
        </div>
      </div>
      {!edit ? (
        <>
          <div className='text-xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold text-light-2'>
            Tên Loài: {specie?.name}
          </div>
          <div className='mt-6 text-xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold text-light-2 mb-3'>
            Ảnh
          </div>
          <div>
            {specie?.imageUrl ? (
              <img
                src={specie.imageUrl}
                alt='imageUrl'
                width={240}
                height={240}
                className='rounded-md object-contain'
              />
            ) : (
              <img src={noImage} alt='imageUrl' width={240} height={240} className='object-contain rounded-md' />
            )}
          </div>

          <div className='mt-6 text-xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold text-light-2 mb-3'>
            Mô tả
          </div>
          {specie?.description ? (
            <div dangerouslySetInnerHTML={{ __html: specie.description }} />
          ) : (
            <div>Chưa có mô tả</div>
          )}
        </>
      ) : (
        <SpecieForm setEdit={setEdit} action='update' btnTitle='Lưu' specie={specie || undefined} />
      )}
    </div>
  )
}

export default ManageSpecieDetail

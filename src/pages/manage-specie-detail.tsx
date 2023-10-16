import { Button, buttonVariants } from '@/components/ui/button'
import { Specie } from '@/lib/types'
import { cn } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft, Edit, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import noImage from '@/assets/no-image.webp'
import SpecieForm from '@/components/forms/specie-form'
import Spinner from '@/components/ui/spinner'
import { toast } from '@/components/ui/use-toast'

function ManageSpecieDetail() {
  const { id } = useParams()
  const [specie, setSpecie] = useState<Specie | null>(null)
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()

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

  const handleDeleteSpecie = async () => {
    try {
      await birdFarmApi.delete(`/api/species/${id}`)
      toast({
        variant: 'success',
        title: 'Xóa loài thành công'
      })
      navigate('/manager/species')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: 'Không thể xóa loài',
        description: messageError || 'Không rõ nguyễn nhân'
      })
    }
  }

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
              className='flex items-center gap-1 my-auto'
            >
              <span>Chỉnh sửa</span>
              <Edit className='w-5 h-5' />
            </Button>
          )}
          <Button onClick={handleDeleteSpecie} className='flex items-center gap-1 my-auto'>
            <span>Xóa</span>
            <Trash className='w-5 h-5' />
          </Button>
          <Link className={cn(buttonVariants(), 'flex items-center gap-1 my-auto')} to='/manager/species'>
            <span>Quay lại</span>
            <ArrowLeft className='w-5 h-5' />
          </Link>
        </div>
      </div>
      {!edit ? (
        <>
          <div className='text-xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light-2'>
            Tên Loài: {specie?.name}
          </div>
          <div className='mt-6 mb-3 text-xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light-2'>
            Ảnh
          </div>
          <div>
            <img
              src={specie.imageUrl || noImage}
              alt='imageUrl'
              width={240}
              height={240}
              className='object-contain border rounded-md'
            />
          </div>

          <div className='mt-6 mb-3 text-xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light-2'>
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

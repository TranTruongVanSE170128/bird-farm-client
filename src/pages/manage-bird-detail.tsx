import { Button, buttonVariants } from '@/components/ui/button'
import { Bird, getDad, getMom, getSpecie } from '@/lib/types'
import { calculateAge, cn, formatPrice } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft, Edit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import noImage from '@/assets/no-image.avif'
import BirdForm from '@/components/forms/bird-form'
import Spinner from '@/components/ui/spinner'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import sellIcon from '@/assets/sell.svg'
import breedIcon from '@/assets/breed.svg'

function ManageBirdDetail() {
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
          <div className='flex gap-12'>
            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Loài chim:</div> {getSpecie(bird).name}
            </div>
            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Tên chim:</div> {bird?.name}
            </div>
          </div>

          <div className='flex gap-12'>
            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Giới tính:</div>{' '}
              {bird.gender === 'male' ? (
                <div className='flex items-center'>
                  <img className='w-6 h-6 mr-1' src={maleIcon} alt='' />
                  Đực
                </div>
              ) : (
                <div className='flex items-center'>
                  <img className='w-6 h-6 mr-1' src={femaleIcon} alt='' />
                  Cái
                </div>
              )}
            </div>

            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Loại chim:</div>{' '}
              {bird.type === 'sell' ? (
                <div className='flex items-center'>
                  <img className='w-6 h-6 mr-1' src={sellIcon} alt='' />
                  Chim để bán
                </div>
              ) : (
                <div className='flex items-center'>
                  <img className='w-6 h-6 mr-1' src={breedIcon} alt='' />
                  Chim phối giống
                </div>
              )}
            </div>

            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>{bird.type === 'sell' ? 'Giá bán:' : 'Giá phối giống:'}</div>{' '}
              {formatPrice(bird.type === 'sell' ? bird.sellPrice : bird.breedPrice)}
            </div>
          </div>

          <div className='flex gap-12'>
            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Bố:</div>{' '}
              {getDad(bird)?._id ? (
                <Link className='hover:underline hover:text-primary' to={`/admin/birds/${getDad(bird)._id}`}>
                  {getDad(bird).name}
                </Link>
              ) : (
                'Không có thông tin'
              )}
            </div>

            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Mẹ:</div>{' '}
              {getMom(bird)?._id ? (
                <Link className='hover:underline hover:text-primary' to={`/admin/birds/${getMom(bird)._id}`}>
                  {getMom(bird).name}
                </Link>
              ) : (
                'Không có thông tin'
              )}
            </div>

            <div className='flex items-center gap-2 text-lg mb-4'>
              <div className='font-bold'>Tuổi:</div> {calculateAge(bird.birth)}
            </div>
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

          <div>
            <div className='font-bold text-lg mt-4'>Thành Tích Thi Đấu</div>
            <div className='flex w-full'>
              <div className='grid grid-cols-2 gap-3 w-full'>
                <div className='col-span-1 text-sm flex items-end pb-3'>Tên Cuộc Thi</div>
                <div className='col-span-1 text-sm flex items-end pb-3'>Xếp Hạng</div>
              </div>
              <Button size='icon' variant='outline' className='invisible'></Button>
            </div>
            <div className='flex flex-col gap-3'>
              {bird?.achievements?.map((achievement) => {
                return (
                  <div key={achievement._id} className='flex w-full gap-3'>
                    <div className='grid grid-cols-2 gap-3 w-full'>
                      <div className='col-span-1 py-2 px-4 rounded-md border-border border'>
                        {achievement.competition}
                      </div>
                      <div className='col-span-1 py-2 px-4 rounded-md border-border border'>{achievement.rank}</div>
                    </div>
                  </div>
                )
              })}
            </div>
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

export default ManageBirdDetail
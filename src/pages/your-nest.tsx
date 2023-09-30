import Container from '@/components/ui/container'
import noImage from '@/assets/no-image.avif'
import { useState } from 'react'
import yourbird1 from '@/assets/yourbird1.jpg'
import yourbird2 from '@/assets/yourbird2.jpg'
import yourbird3 from '@/assets/yourbird3.jpg'
import { cn } from '@/lib/utils'

const ListNest = [
  {
    dad: {
      name: 'Chim chao mao Hue, ma SE170999',
      specie: 'Chim chao mao',
      type: 'chim phoi giong',
      gender: 'Duc',
      img: noImage
    },
    mom: {
      name: 'Chim chao mao Hue, ma SE170999',
      specie: 'Chim chao mao',
      type: 'chim phoi giong',
      gender: 'Cai',
      img: noImage
    },
    stage1: {
      status: 'Tốt',
      numberOfBird: 'chua xac dinh',
      img: yourbird1
    },
    stage2: {
      status: 'Tốt',
      numberOfBird: '15',
      img: yourbird2
    },
    stage3: {
      status: 'Tốt',
      numberOfBird: '15',
      img: yourbird3
    },
    stage4: {
      status: undefined,
      numberOfBird: undefined,
      img: undefined
    }
  }
]

function YourNest() {
  const [selectImage, setSelectImage] = useState<string | undefined>(undefined)
  const [indexButtonActive, setIndexButtonActive] = useState(-1)
  const [selectStatus, setSelectStatus] = useState<string | undefined>(undefined)
  const [selectNumberOfBird, setSelectNumberOfBird] = useState<string | undefined>(undefined)

  const handleStageClick = (
    image: string | undefined,
    index: number,
    status: string | undefined,
    numberOfBird: string | undefined
  ) => {
    setSelectImage(image)
    setIndexButtonActive(index)
    setSelectStatus(status)
    setSelectNumberOfBird(numberOfBird)
  }

  return (
    <main className='mt-8 container sm:flex-row transition-all'>
      <Container>
        <div className='w-full flex flex-col mx-2 gap-5'>
          {ListNest.length === 0 ? (
            <div className='h-80 justify-center flex flex-col items-center'>
              <div className='flex justify-center text-3xl text-foreground uppercase'>
                Hiện chưa có tổ chim non để theo dõi
              </div>
            </div>
          ) : (
            <div>
              <div className='font-bold uppercase my-5 text-2xl'>Theo dõi quá trình phát triển của tổ chim đã đặt</div>
              {ListNest.map((nest) => (
                <div className='flex flex-col gap-6 rounded-3xl border py-5 shadow-xl mb-10'>
                  <div className='flex'>
                    <div className='w-1/2 flex flex-col justify-center gap-5 mx-28'>
                      <div className='flex'>
                        <img className='w-24 aspect-square' src={nest.dad.img} />
                        <div className='flex flex-col justify-around mx-5'>
                          <div className='font-bold'>{nest.dad.name}</div>
                          <div className='flex gap-2'>
                            <div>Giong: {nest.dad.specie}</div> | <div>{nest.dad.gender}</div>
                          </div>
                          <div>Phan loai: {nest.dad.type}</div>
                        </div>
                      </div>
                      <div className='flex'>
                        <img className='w-24 aspect-square' src={nest.mom.img} />
                        <div className='flex flex-col justify-around mx-5'>
                          <div className='font-bold'>{nest.mom.name}</div>
                          <div className='flex gap-2'>
                            <div>Giong: {nest.mom.specie}</div> | <div>{nest.mom.gender}</div>
                          </div>
                          <div>Phan loai: {nest.mom.type}</div>
                        </div>
                      </div>
                    </div>
                    {selectImage && (
                      <div>
                        <img className='h-40 w-64 rounded-xl object-coverz' src={selectImage} alt='Selected Image' />
                        <div className='flex flex-col items-center gap-2 mt-2'>
                          <div className='flex'>
                            Trạng Thái: <div className='font-bold'>{selectStatus}</div>
                          </div>
                          <div className='flex'>
                            Số lượng: <div className='font-bold'>{selectNumberOfBird}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='flex flex-wrap justify-between mt-10 relative w-full'>
                    <div className='flex w-full justify-center border-t-2' />
                    <div className='flex flex-col w-1/4 justify-center items-center gap-2 -mt-3'>
                      <button
                        className={cn(
                          'h-5 aspect-square rounded-full',
                          indexButtonActive === 1 ? 'bg-primary' : 'bg-foreground'
                        )}
                        onClick={() =>
                          handleStageClick(nest.stage1.img, 1, nest.stage1.status, nest.stage1.numberOfBird)
                        }
                      />
                      <div>Thanh cong phoi giong</div>
                    </div>
                    <div className='flex flex-col w-1/4 justify-center items-center gap-2 -mt-3'>
                      <button
                        className={cn(
                          'h-5 aspect-square rounded-full',
                          indexButtonActive === 2 ? 'bg-primary' : 'bg-foreground'
                        )}
                        onClick={() =>
                          handleStageClick(nest.stage2.img, 2, nest.stage2.status, nest.stage2.numberOfBird)
                        }
                      />
                      <div>Chim da de</div>
                    </div>
                    <div className='flex flex-col w-1/4 justify-center items-center gap-2 -mt-3'>
                      <button
                        className={cn(
                          'h-5 aspect-square rounded-full',
                          indexButtonActive === 3 ? 'bg-primary' : 'bg-foreground'
                        )}
                        onClick={() =>
                          handleStageClick(nest.stage3.img, 3, nest.stage3.status, nest.stage3.numberOfBird)
                        }
                      />
                      <div>To chim da no</div>
                    </div>
                    <div className='flex flex-col w-1/4 justify-center items-center gap-2 -mt-3'>
                      <button
                        className={cn(
                          'h-5 aspect-square rounded-full',
                          indexButtonActive === 4 ? 'bg-primary' : 'bg-foreground'
                        )}
                        onClick={() =>
                          handleStageClick(nest.stage4.img, 4, nest.stage4.status, nest.stage4.numberOfBird)
                        }
                      />
                      <div>To chim sau 15 ngay</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}

export default YourNest

import Container from '@/components/ui/container'
import noImage from '@/assets/no-image.avif'
import { useState } from 'react'
import yourbird1 from '@/assets/yourbird1.jpg'
import yourbird2 from '@/assets/yourbird2.jpg'
import yourbird3 from '@/assets/yourbird3.jpg'
import yourbird4 from '@/assets/yourbird4.jpg'
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
      status: 'Trạng thái: Tốt',
      numberOfBird: 'So luong: chua xac dinh',
      img: yourbird1
    },
    stage2: {
      status: 'Trạng thái: Tốt',
      numberOfBird: 'So luong: 15',
      img: yourbird2
    },
    stage3: {
      status: 'Trạng thái: Tốt',
      numberOfBird: 'So luong: 15',
      img: yourbird3
    },
    stage4: {
      status: 'Trạng thái: Tốt',
      numberOfBird: 'So luong: 15',
      img: yourbird4
    }
  },
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
      status: 'Trạng thái: Tốt',
      numberOfBird: 'So luong: chua xac dinh',
      img: yourbird1
    },
    stage2: {
      status: 'Trạng thái: Tốt',
      numberOfBird: 'So luong: 15',
      img: yourbird2
    },
    stage3: {
      status: 'Trạng thái: Tốt',
      numberOfBird: 'So luong: 15',
      img: yourbird3
    },
    stage4: {
      status: 'Trạng thái: Tốt',
      numberOfBird: 'So luong: 15',
      img: yourbird4
    }
  }
]

function YourNest() {
  const [selectImage, setSelectImage] = useState<string | undefined>(undefined)
  const [indexButtonActive, setIndexButtonActive] = useState(-1)
  
  for (let i = 1; i <= ListNest.length; i++) {
    const [selectImage, setSelectImage] = useState<string | undefined>(undefined)
    const [indexButtonActive, setIndexButtonActive] = useState(-1)
  }

  const handleStageClick = (image: string | undefined, index: number) => {
    setSelectImage(image)
    setIndexButtonActive(index)
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
            ListNest.map((nest) => (
              <div className='flex flex-col gap-5 rounded-3xl border py-5 shadow-xl mb-10'>
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
                  {selectImage && <img className='h-40 w-64' src={selectImage} alt='Selected Image' />}
                </div>

                <div className='flex flex-wrap justify-between mt-10 relative w-full'>
                  <div className='flex w-full justify-center border-t-2' />
                  <div className='flex flex-col w-1/4 justify-center items-center gap-2 -mt-3'>
                    <button
                      className={cn(
                        'h-5 aspect-square rounded-full',
                        indexButtonActive === 1 ? 'bg-primary' : 'bg-foreground'
                      )}
                      onClick={() => handleStageClick(nest.stage1.img, 1)}
                    />
                    <div>Thanh cong phoi giong</div>
                  </div>
                  <div className='flex flex-col w-1/4 justify-center items-center gap-2 -mt-3'>
                    <button
                      className={cn(
                        'h-5 aspect-square rounded-full',
                        indexButtonActive === 2 ? 'bg-primary' : 'bg-foreground'
                      )}
                      onClick={() => handleStageClick(nest.stage2.img, 2)}
                    />
                    <div>Chim da de</div>
                  </div>
                  <div className='flex flex-col w-1/4 justify-center items-center gap-2 -mt-3'>
                    <button
                      className={cn(
                        'h-5 aspect-square rounded-full',
                        indexButtonActive === 3 ? 'bg-primary' : 'bg-foreground'
                      )}
                      onClick={() => handleStageClick(nest.stage3.img, 3)}
                    />
                    <div>To chim da no</div>
                  </div>
                  <div className='flex flex-col w-1/4 justify-center items-center gap-2 -mt-3'>
                    <button
                      className={cn(
                        'h-5 aspect-square rounded-full',
                        indexButtonActive === 4 ? 'bg-primary' : 'bg-foreground'
                      )}
                      onClick={() => handleStageClick(nest.stage4.img, 4)}
                    />
                    <div>To chim sau 15 ngay</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </main>
  )
}

export default YourNest

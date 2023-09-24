import Container from '@/components/ui/container'
import noImage from '@/assets/no-image.avif'
import { useState } from 'react';



const ListNest = [
    {
        dad: {
            name: 'Chim chao mao Hue',
            specie: 'Chim chao mao',
            type: 'chim phoi giong',
            img: noImage
        },
        mom: {
            name: 'Chim chao mao Hue',
            specie: 'Chim chao mao',
            type: 'chim phoi giong',
            img: noImage
        },
        stage1: noImage,
        stage2: noImage,
        stage3: noImage,
        stage4: noImage,
    },
    // {
    //     dad: {
    //         name: 'Chim chao mao Hue',
    //         specie: 'Chim chao mao',
    //         type: 'chim phoi giong'
    //     },
    //     mom: {
    //         name: 'Chim chao mao Hue',
    //         specie: 'Chim chao mao',
    //         type: 'chim phoi giong'
    //     },
    //     stage1: noImage,
    //     stage2: noImage,
    //     stage3: noImage,
    //     stage4: noImage,
    // }
]


function YourNest() {

  const [checkStage, setcheckStage] = useState();



  return (
    <main className='mt-8 container sm:flex-row transition-all'>
        <Container>
            <div className='w-full flex flex-col mx-2 gap-5'>
                {ListNest.length === 0 ? (
                    <div className='h-80 justify-center flex flex-col items-center'>
                        <div className='flex justify-center text-3xl text-foreground uppercase'>Hiện chưa có tổ chim non để theo dõi</div>
                    </div>
                ) : (
                    ListNest.map((nest) => (
                        <div className='flex flex-col gap-5'>
                            <div className='w-full border-t border-foreground'></div>
                            <div className='w-1/2 flex flex-col justify-center'>
                                <div className='flex'>
                                    <img className='w-40 aspect-square' src={nest.dad.img} />
                                </div>
                                <div></div>
                            </div>
                            <div className='w-full border-t border-foreground'></div>
                        </div>
                    ))
                    
                )}
            </div>
        </Container>
    </main>
  )
}

export default YourNest
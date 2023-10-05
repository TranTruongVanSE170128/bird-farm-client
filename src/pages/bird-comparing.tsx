import Container from '@/components/ui/container'
import { Link, useSearchParams } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Bird, getDad, getMom, getSpecie } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import BirdCard from '@/components/bird-card'
import Spinner from '@/components/ui/spinner'
import versusIcon from '@/assets/versus.png'
import { calculateAge, formatPrice } from '@/lib/utils'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import medalIcon from '@/assets/medal.svg'
import birdIcon from '@/assets/bird-color.svg'
import breedIcon from '@/assets/breed.svg'

function BirdComparing() {
  const [searchParams] = useSearchParams()
  const [firstBird, setFirstBird] = useState<Bird | null>(null)
  const [secondBird, setSecondBird] = useState<Bird | null>(null)

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const { data } = await birdFarmApi.post('/api/birds/get-by-ids', {
          birds: [searchParams.get('firstBird'), searchParams.get('secondBird')]
        })

        if (data.birds.length === 2) {
          setFirstBird(data.birds[0])
          setSecondBird(data.birds[1])
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchBirds()
  }, [searchParams])

  if (!firstBird || !secondBird) {
    return <Spinner className='mt-12' />
  }

  return (
    <main className='mt-12'>
      <Container>
        <h1 className='text-3xl font-bold'>So sánh chim</h1>
        <div className='flex mt-4'>
          <div className='flex flex-col items-center justify-center border basis-1/3'>
            <div className='text-xl font-medium text-center'>{firstBird?.name}</div>
            <img src={versusIcon} className='w-32 h-32' />
            <div className='text-xl font-medium text-center'>{firstBird?.name}</div>
          </div>

          <div className='flex justify-center border basis-1/3'>
            <BirdCard className='w-full h-full' bird={firstBird} />
          </div>

          <div className='flex justify-center border basis-1/3'>
            <BirdCard className='w-full h-full' bird={secondBird} />
          </div>
        </div>

        <Table className=''>
          <TableHeader>
            <TableRow className='grid grid-cols-12'>
              <TableHead className='col-span-4 pt-3 text-base font-medium border'>Tên</TableHead>
              <TableHead className='col-span-4 pt-3 text-base border'>{firstBird.name}</TableHead>
              <TableHead className='col-span-4 pt-3 text-base border'>{secondBird.name}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='col-span-4 text-base font-medium border'>Loài chim</TableCell>
              <TableCell className='col-span-4 border'>{getSpecie(firstBird).name}</TableCell>
              <TableCell className='col-span-4 border'>{getSpecie(secondBird).name}</TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='col-span-4 text-base font-medium border'>Bố</TableCell>
              <TableCell className='col-span-4 border'>
                {getDad(firstBird) ? (
                  <Link to={`/birds/${getDad(firstBird)._id}`}>{getDad(firstBird).name}</Link>
                ) : (
                  'Không có thông tin'
                )}
              </TableCell>
              <TableCell className='col-span-4 border'>
                {getDad(secondBird) ? (
                  <Link to={`/birds/${getDad(secondBird)._id}`}>{getDad(secondBird).name}</Link>
                ) : (
                  'Không có thông tin'
                )}
              </TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='col-span-4 text-base font-medium border'>Mẹ</TableCell>
              <TableCell className='col-span-4 border'>
                {getMom(firstBird) ? (
                  <Link to={`/birds/${getMom(firstBird)._id}`}>{getMom(firstBird).name}</Link>
                ) : (
                  'Không có thông tin'
                )}
              </TableCell>
              <TableCell className='col-span-4 border'>
                {getMom(secondBird) ? (
                  <Link to={`/birds/${getMom(secondBird)._id}`}>{getMom(secondBird).name}</Link>
                ) : (
                  'Không có thông tin'
                )}
              </TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='col-span-4 text-base font-medium border'>Tuổi</TableCell>
              <TableCell className='col-span-4 border'>
                {firstBird.birth ? calculateAge(firstBird.birth) : 'Không có thông tin'}
              </TableCell>
              <TableCell className='col-span-4 border'>
                {secondBird.birth ? calculateAge(secondBird.birth) : 'Không có thông tin'}
              </TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='col-span-4 text-base font-medium border'>Giới tính</TableCell>
              <TableCell className='col-span-4 border'>
                {firstBird.gender === 'male' ? (
                  <div className='flex items-center mt-[2px]'>
                    Đực
                    <img className='w-6 h-6 ml-1' src={maleIcon} alt='' />
                  </div>
                ) : (
                  <div className='flex items-center mt-[2px]'>
                    Cái
                    <img className='w-6 h-6 ml-1' src={femaleIcon} alt='' />
                  </div>
                )}
              </TableCell>
              <TableCell className='col-span-4 border'>
                {secondBird.gender === 'male' ? (
                  <div className='flex items-center mt-[2px]'>
                    Đực
                    <img className='w-6 h-6 ml-1' src={maleIcon} alt='' />
                  </div>
                ) : (
                  <div className='flex items-center mt-[2px]'>
                    Cái
                    <img className='w-6 h-6 ml-1' src={femaleIcon} alt='' />
                  </div>
                )}
              </TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='col-span-4 text-base font-medium border'>Loại chim</TableCell>
              <TableCell className='col-span-4 border'>
                {firstBird.type === 'sell' ? (
                  <div className='flex items-center gap-2'>
                    <img src={birdIcon} className='w-6 h-6' />
                    Chim kiểng
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <img src={breedIcon} className='w-6 h-6' />
                    Chim phối giống
                  </div>
                )}
              </TableCell>
              <TableCell className='col-span-4 border'>
                {secondBird.type === 'sell' ? (
                  <div className='flex items-center gap-2'>
                    <img src={birdIcon} className='w-6 h-6' />
                    Chim kiểng
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <img src={breedIcon} className='w-6 h-6' />
                    Chim phối giống
                  </div>
                )}
              </TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='col-span-4 text-base font-medium border'>Giá bán/Giá phối giống</TableCell>
              <TableCell className='col-span-4 text-lg font-medium border text-primary'>
                {firstBird.type === 'sell' ? formatPrice(firstBird.sellPrice) : formatPrice(firstBird.breedPrice)}
              </TableCell>
              <TableCell className='col-span-4 text-lg font-medium border text-primary'>
                {secondBird.type === 'sell' ? formatPrice(secondBird.sellPrice) : formatPrice(secondBird.breedPrice)}
              </TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='col-span-4 text-base font-medium border'>Thành tích thi đấu</TableCell>
              <TableCell className='flex flex-col col-span-4 gap-2 border'>
                {firstBird?.achievements?.map((achievement) => {
                  return (
                    <div className='flex items-center'>
                      <span className='pr-3'>
                        <img className='w-6' src={medalIcon}></img>
                      </span>
                      <span className='mr-1 font-medium'>Hạng {achievement.rank}</span>
                      <span> {achievement.competition}</span>
                    </div>
                  )
                })}
              </TableCell>
              <TableCell className='flex flex-col col-span-4 gap-2 border'>
                {secondBird?.achievements?.map((achievement) => {
                  return (
                    <div className='flex items-center'>
                      <span className='pr-3'>
                        <img className='w-6' src={medalIcon}></img>
                      </span>
                      <span className='mr-1 font-medium'>Hạng {achievement.rank}</span>
                      <span> {achievement.competition}</span>
                    </div>
                  )
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </main>
  )
}

export default BirdComparing

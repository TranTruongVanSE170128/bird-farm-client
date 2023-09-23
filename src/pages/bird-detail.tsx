import { Link } from 'react-router-dom'
import Ellipce from '@/assets/Ellipse2.png'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
// import { Bird, getSpecie } from '@/lib/types'
import Container from '@/components/ui/container'
import noImage from '@/assets/no-image.avif'
import { calculateAge, formatPrice } from '@/lib/utils'
import moment from 'moment'
import 'moment/locale/vi'
import achivementLogo from "@/assets/achivementLogo.png";
// import { birdFarmApi } from '@/services/bird-farm-api'

const bird = {
  _id: '6506a456d2122d7e8013d4d6',
  name: 'Chim Hoàng Anh mã 93acc6',
  birth: '2023-06-22T05:50:43+00:00',
  type: 'sell',
  sellPrice: 620000,
  specie: {
    _id: '6504043d9b7a586cad8a4b86',
    name: 'Chim Hoàng Anh'
  },
  imageUrls: [
    'https://daohieu.com/wp-content/uploads/2020/05/chim-vang-anh-917x1024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6f/Black-hooded_Oriole_%28Oriolus_xanthornus%29_in_Kolkata_I_IMG_2551.jpg',
    'https://chimcanhalau.com/wp-content/uploads/2019/10/VA.jpg',
    'https://suckhoecuocsong.vn/upload/Tri-thuc-song/chim-vang-anh1-suckhoecuocsong_com_vn.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkJlqAxBlhLwSrnGQ966QR_pPRXZtEiCwVbw&usqp=CAU'
  ],
  gender: 'female',
  achievements: [
    {
      competition: 'Cuộc thi chim bắt mồi',
      rank: 1
    },
    {
      competition: 'Chim Việt Nam',
      rank: 1
    },
    {
      competition: 'Cuộc thi chim biểu diễn',
      rank: 5
    }
  ],
  description: 'Chim to béo khẻo, năng động.'
}

// const bird = {
//   _id: '6506a456d2122d7e8013d4d6',
//   name: 'Chim Hoàng Anh mã 93acc6',
//   birth: '2023-06-22T05:50:43+00:00',
//   type: 'breed',
//   breedPrice: 620000,
//   specie: {
//     _id: '6504043d9b7a586cad8a4b86',
//     name: 'Chim Hoàng Anh'
//   },
//   imageUrls: [
//     'https://daohieu.com/wp-content/uploads/2020/05/chim-vang-anh-917x1024.jpg',
//     'https://upload.wikimedia.org/wikipedia/commons/6/6f/Black-hooded_Oriole_%28Oriolus_xanthornus%29_in_Kolkata_I_IMG_2551.jpg',
//     'https://chimcanhalau.com/wp-content/uploads/2019/10/VA.jpg',
//     'https://suckhoecuocsong.vn/upload/Tri-thuc-song/chim-vang-anh1-suckhoecuocsong_com_vn.jpg',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkJlqAxBlhLwSrnGQ966QR_pPRXZtEiCwVbw&usqp=CAU'
//   ],
//   gender: 'male',
//   achievements: [
//     {
//       competition: 'Cuộc thi chim bắt mồi',
//       rank: 1
//     },
//     {
//       competition: 'Chim Việt Nam',
//       rank: 1
//     },
//     {
//       competition: 'Cuộc thi chim biểu diễn',
//       rank: 5
//     }
//   ],
//   description: 'Chim to béo khẻo, năng động.'
// }

function BirdDetail() {
  moment.locale('vi')
  // const { id } = useParams()
  // const [bird, setBird] = useState<Bird | null>(null)
  // const navigate = useNavigate()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isListVisible, setListVisible] = useState(false)

  const handleMouseEnter = (imageUrl: string) => {
    if (imageRef.current) {
      imageRef.current.src = imageUrl
    }
  }

  const toggleList = () => {
    setListVisible(!isListVisible)
  }

  // useEffect(() => {
  //   const fetchBird = async () => {
  //     try {
  //       const { data } = await birdFarmApi.get(`/api/birds/${id}`)

  //       setBird(data?.bird || null)
  //     } catch (error) {
  //       navigate('/not-found')
  //     }
  //   }

  //   fetchBird()
  // }, [id, navigate])

  // if (!bird) {
  //   return <div>Loading</div>
  // }

  return (
    <main className=' mt-5 container sm:flex-row transition-all '>
      <Container>
        <section className='grid grid-cols-12 gap-8 '>
          <div className='col-span-5'>
            <div>
              <img
                ref={imageRef}
                className='w-full h-full aspect-square object-cover rounded cursor-pointer'
                // src={bird?.imageUrls?.[0] || noImage}
                src={bird.imageUrls[0] || noImage}
                alt='bird'
              />
            </div>
            <div className='grid grid-cols-5 mt-2 gap-2 flex-wrap w-full'>
              {/* {bird?.imageUrls?.map((imageUrl) => { */}
              {bird.imageUrls.map((imageUrl) => {
                return (
                  <img
                    onMouseEnter={() => {
                      handleMouseEnter(imageUrl)
                    }}
                    className='w-full h-full aspect-square object-cover rounded cursor-pointer'
                    src={imageUrl}
                    alt='bird'
                  />
                )
              })}
            </div>
          </div>

          <div className='col-span-7 text-lg'>
            <h3 className='text-4xl font-bold'>{bird.name}</h3>
            <p className='my-3'>
              <span className='font-semibol font-medium'>
                Danh mục:{' '} </span>
                <span>
                <Link
                  to={`/birds?specie=${bird.specie._id}`}
                  className='font-normal hover:text-primary hover:underline cursor-pointer ml-2'
                >
                  {bird.specie?.name}
                </Link>
              </span>
              <span className='mx-5 font-bold'>|</span>
              <span className='font-medium'>
                Giới tính: </span>
                <span>{bird.gender=== "female"? "Cái":"Đực"}
              </span>
            </p>

            <p className='text-3xl text-red-500 font-medium '>{formatPrice(bird.sellPrice)}</p>
            <p className='my-3 font-medium'>
            <span className='font-semibol mr-10'>
              <span className='pr-8'>Bố:{' '}</span>
                <Link
                  to={`/birds?specie=${bird.name}`}
                  className='font-normal text-primary hover:underline cursor-pointer'
                >
                  {bird.specie?.name}
                </Link>
              </span>
              <span className='font-semibol'>
                <span className=''>Mẹ:{' '}</span>
                <Link
                  to={`/birds?specie=${bird.specie._id}`}
                  className='font-normal text-primary hover:underline cursor-pointer'
                >
                  {bird.specie?.name}
                </Link>
              </span>
            </p>
            <div className='flex flex-col justify-center gap-3 mt-3'>
              <div className='flex-col'>
                <p>
                <span className='pr-4 font-medium'>Tuổi :</span> <span> {calculateAge(bird.birth)}</span>
                </p>
                <p className='my-3'>
                <span className='pr-1 font-medium'>Mô tả :</span> <span> {bird.description} </span>
                </p>
              </div>
              <div>
                {bird.achievements.map((achievement) => {
                  return (
                    <div className='flex my-4'>
                      <span className='pr-3'><img className='w-6' src={achivementLogo} ></img></span>
                      <span className='font-medium mr-1'>Hạng {achievement.rank}</span>
                      <span> {achievement.competition}</span>
                    </div>
                    
                  )
                })}
              </div>
            </div>
            <div className='flex-col my-10'>
              <div className='flex gap-4 my-5'>
              <button className='bg-white text-black font-medium rounded-md px-4 py-2 border-2 border-primary hover:bg-purple-600 hover:text-white transition-all'>
                Mua ngay
              </button>
              <button className='bg-white text-black font-medium rounded-md px-4 py-2 border-2 border-primary hover:bg-purple-600 hover:text-white transition-all'>So sánh</button>
              </div>
              <div>
                <button className='bg-primary text-white rounded-md px-10 py-2 hover:bg-purple-600 transition-all'>Thêm vào giỏ hàng</button>
              </div>
            </div>
            
          </div>
        </section>

        <div className='text-center flex flex-col gap-3 mt-7 items-center'>
          <h3 className='text-3xl uppercase font-bold'>gọi ngay cho trang trại</h3>
          <p>Để được tư vấn trực tiếp</p>
          <a
            href='tel:01201'
            className='flex justify-center items-center gap-3 px-5 py-3 text-black bg-yellow-300  rounded-full'
          >
            <img src={Ellipce} alt='' className='w-[40px] h-[40px]' /> Hotline: 033233005
          </a>
        </div>

        <div className='mt-3 p-3 transition-all'>
          <p
            className='uppercase text-xl font-bold bg-primary py-2 mb-3  text-white cursor-pointer'
            onClick={toggleList}
          >
            <div className='flex gap-4 px-3 items-center'>
              {isListVisible ? <ChevronUp></ChevronUp> : <ChevronDown></ChevronDown>}
              Mô tả chi tiết
            </div>
          </p>

          {!isListVisible && (
            <div>
              <p>
                Chim chào mào, còn được gọi là "Pycnonotus jocosus," là một loài chim thuộc họ Chim chào mào
                (Pycnonotidae). Chúng là những loài chim nhỏ có âm thanh đặc biệt và có ngoại hình rất đẹp và phong
                cách. Dưới đây là mô tả tổng quan về loài chim chào mào:
              </p>
              <ul className='list-decimal ml-6'>
                <li>
                  Ngoại hình:
                  <ul style={{ listStyle: 'disc' }} className='ml-6'>
                    <li>Chim chào mào thường có kích thước nhỏ, dài khoảng 20-25 cm.</li>
                    <li>
                      Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam
                      với các sọc đậm và họa tiết trên cánh và đuôi
                    </li>
                    <li>
                      Mỏ của chim chào mào thường ngắn và hình nón, phù hợp cho việc ăn các loại trái cây và quả mọng.
                    </li>
                  </ul>
                </li>
                <li>
                  Ngoại hình:
                  <ul style={{ listStyle: 'disc' }} className='ml-6'>
                    <li>Chim chào mào thường có kích thước nhỏ, dài khoảng 20-25 cm.</li>
                    <li>
                      Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam
                      với các sọc đậm và họa tiết trên cánh và đuôi
                    </li>
                    <li>
                      Mỏ của chim chào mào thường ngắn và hình nón, phù hợp cho việc ăn các loại trái cây và quả mọng.
                    </li>
                  </ul>
                </li>
                <li>
                  Ngoại hình:
                  <ul style={{ listStyle: 'disc' }} className='ml-6'>
                    <li>Chim chào mào thường có kích thước nhỏ, dài khoảng 20-25 cm.</li>
                    <li>
                      Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam
                      với các sọc đậm và họa tiết trên cánh và đuôi
                    </li>
                    <li>
                      Mỏ của chim chào mào thường ngắn và hình nón, phù hợp cho việc ăn các loại trái cây và quả mọng.
                    </li>
                  </ul>
                </li>
                <li>
                  Ngoại hình:
                  <ul style={{ listStyle: 'disc' }} className='ml-6'>
                    <li>Chim chào mào thường có kích thước nhỏ, dài khoảng 20-25 cm.</li>
                    <li>
                      Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam
                      với các sọc đậm và họa tiết trên cánh và đuôi
                    </li>
                    <li>
                      Mỏ của chim chào mào thường ngắn và hình nón, phù hợp cho việc ăn các loại trái cây và quả mọng.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className='mt-3 p-3'>
          <p className='uppercase text-xl font-bold bg-primary py-2 mb-3  text-white cursor-pointer'>
            <div className='flex gap-4 px-3'>Sản phẩm tương tự</div>
          </p>
        </div>
      </Container>
    </main>
  )
}

export default BirdDetail

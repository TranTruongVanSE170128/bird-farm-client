import { Link, useNavigate, useParams } from 'react-router-dom'
import Ellipce from '@/assets/Ellipse2.png'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Bird, getSpecie } from '@/lib/types'
import axios from 'axios'
import Container from '@/components/ui/container'
import noImage from '@/assets/no-image.avif'
import { calculateAge, formatPrice } from '@/lib/utils'
import moment from 'moment'
import 'moment/locale/vi'

const imageUrls = [
  'https://daohieu.com/wp-content/uploads/2020/05/chim-vang-anh-917x1024.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6f/Black-hooded_Oriole_%28Oriolus_xanthornus%29_in_Kolkata_I_IMG_2551.jpg',
  'https://chimcanhalau.com/wp-content/uploads/2019/10/VA.jpg',
  'https://suckhoecuocsong.vn/upload/Tri-thuc-song/chim-vang-anh1-suckhoecuocsong_com_vn.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkJlqAxBlhLwSrnGQ966QR_pPRXZtEiCwVbw&usqp=CAU'
]

function BirdDetail() {
  moment.locale('vi')
  const { id } = useParams()
  const [bird, setBird] = useState<Bird | null>(null)
  const navigate = useNavigate()
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

  useEffect(() => {
    const fetchBird = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/birds/${id}`)

        setBird(data?.bird || null)
      } catch (error) {
        navigate('/not-found')
      }
    }

    fetchBird()
  }, [id, navigate])

  useEffect(() => {
    console.log(bird)
  }, [bird])

  if (!bird) {
    return <div>Loading</div>
  }

  return (
    <main className=' mt-5 container sm:flex-row transition-all '>
      <Container>
        <section className='flex mt-5 gap-x-7 gap-auto flex-wrap w-full ml-2'>
          <div>
            <img
              ref={imageRef}
              className='w-full h-full aspect-square object-cover rounded cursor-pointer'
              // src={bird?.imageUrls?.[0] || noImage}
              src={imageUrls[0] || noImage}
              alt='bird'
            />
          </div>
          <div className='grid grid-cols-5 mt-2 gap-2 flex-wrap w-full'>
            {/* {bird?.imageUrls?.map((imageUrl) => { */}
            {imageUrls.map((imageUrl) => {
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
        </section>

        <div className='col-span-7'>
          <h3 className='text-2xl font-bold'>{bird.name}</h3>
          <p className='my-3'>
            <span className='font-semibold'>
              Danh mục:{' '}
              <Link
                to={`/birds?specie=${getSpecie(bird)._id}`}
                className='font-normal hover:text-primary hover:underline cursor-pointer'
              >
                {getSpecie(bird)?.name}
              </Link>
            </span>
          </p>

          <p className='text-3xl text-red-500 font-medium '>{formatPrice(bird.price)}</p>

          <div className='flex justify-center gap-10 mt-3'>
            <div>
              <p className='mt-3'>Tuổi : {calculateAge(bird.birth)}</p>
              <p className='mt-3'>Giới tính : {bird?.gender === 'male' ? 'Đực' : 'Cái'} </p>
              <p className='mt-3'>Màu xám</p>
              <p className='mt-3'>Sức khỏe : Ăn uống tốt , khỏe mạnh , nhanh nhẹn </p>
            </div>
            <div>
              <p className='mt-3'>Bố: Trương Văn(xem thông tin chim bố)</p>
              <p className='mt-3'>Bố: Trương Văn(xem thông tin chim bố)</p>
              <p className='mt-3'>Lịch sử sinh sản</p>
              <p className='mt-3'>Vận chuyển: Miễn phí</p>
              <p className='mt-3'>Thành tích thi đấu : Huy chương vàng cấp QG</p>
            </div>
          </div>
          <div className='flex gap-10 my-5'>
            <button className='bg-black/60 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-all'>
              Mua ngay
            </button>
            <button className='bg-white text-black rounded-md px-4 py-2 border'>Thêm vào giỏ hàng</button>
          </div>
          <div>
            <h3 className='mt-3 text-medium font-semibold'>
              Xem chim trực tiếp tại trang trại Bird 590 TRƯƠNG ĐỊNH(mặt bờ sông) Tuân mai hoàng mai hà nội
            </h3>
          </div>
        </div>

        <div className='text-center flex flex-col gap-3 mt-7 items-center'>
          <h3 className='text-3xl uppercase font-bold'>gọi ngay cho trang trại</h3>
          <p>Để được tư vấn trực tiếp</p>
          <a
            href='tel:01201'
            className='flex justify-center items-center gap-3 px-5 py-3 text-black bg-yellow-300  rounded-full'
          >
            <img src={Ellipce} alt='' className='w-[40px] h-[40px]' /> Hotline 033233005
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

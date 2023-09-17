
import { useNavigate, useParams } from 'react-router-dom'
import Ellipce from '@/assets/Ellipse2.png'

import { ChevronUp, ChevronDown, Container } from 'lucide-react'
import { useRef, useState } from 'react'

function BirdDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isListVisible, setListVisible] = useState(false);
  if (!id) {
    navigate('/')
  }

  const handleMouseEnter = (imageUrl: string) => {
    if (imageRef.current) {
      imageRef.current.src = imageUrl;
    }
  }

  const toggleList = () => {
    setListVisible(!isListVisible);
  }

  return (
    <main className=' mt-5 container sm:flex-row transition-all '>
      <div className='flex justify-center  gap-5'>
        <div>
          <div>
            <img
              ref={imageRef}
              className='w-[500px] h-[450px] sm:w-100% object-cover'
              src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
              alt='bird'
            />
          </div>
          <div className='flex mt-5 gap-x-7 gap-auto flex-wrap w-full ml-2'>
            <img
              onMouseEnter={() => {
                handleMouseEnter('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKAKHac56qa2ePV7jdG_NGG1ExlwG8tpdzPLHQeKJxnVdj62ZmAfevw0v0G_tXFxSdFA0&usqp=CAU');
              }}
              className='w-[100px]  object-cover'
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKAKHac56qa2ePV7jdG_NGG1ExlwG8tpdzPLHQeKJxnVdj62ZmAfevw0v0G_tXFxSdFA0&usqp=CAU'
              alt='bird'
            />
            <img
              onMouseEnter={() => {
                handleMouseEnter('https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI');
              }}
              className='w-[100px]  object-cover'
              src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
              alt='bird'
            />
            <img
              onMouseEnter={() => {
                handleMouseEnter('https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI');
              }}
              className='w-[100px]  object-cover'
              src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
              alt='bird'
            />
            <img
              onMouseEnter={() => {
                handleMouseEnter('https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI');
              }}
              className='w-[100px]  object-cover'
              src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
              alt='bird'
            />

          </div>
        </div>
        <div className='p-5'>
          <h3 className='text-2xl font-bold'>Chim chào mào Huế, mã SE170128</h3>
          <p className='my-3'>
            <span className='underline underline-offset-4 '>Danh mục chim chào mào </span>
          </p>
          <span className='text-3xl text-red-500 font-medium '>5.500.000 đ</span>
          <div className='flex  justify-center gap-10 mt-3'>
            <div>
              <p className='mt-3'>Ngày sinh : 20/09/2022</p>
              <p className='mt-3'>Giới tính : Đực </p>
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
            {(isListVisible) ? <ChevronUp></ChevronUp> : <ChevronDown></ChevronDown>}
            Mô tả chi tiết
          </div>
        </p>

        {!isListVisible && (
          <div>
            <p>
              Chim chào mào, còn được gọi là "Pycnonotus jocosus," là một loài chim thuộc họ Chim chào mào
              (Pycnonotidae). Chúng là những loài chim nhỏ có âm thanh đặc biệt và có ngoại hình rất đẹp và phong cách.
              Dưới đây là mô tả tổng quan về loài chim chào mào:
            </p>
            <ul className='list-decimal ml-6'>
              <li>
                Ngoại hình:
                <ul style={{ listStyle: 'disc' }} className='ml-6'>
                  <li>Chim chào mào thường có kích thước nhỏ, dài khoảng 20-25 cm.</li>
                  <li>
                    Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam với
                    các sọc đậm và họa tiết trên cánh và đuôi
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
                    Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam với
                    các sọc đậm và họa tiết trên cánh và đuôi
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
                    Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam với
                    các sọc đậm và họa tiết trên cánh và đuôi
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
                    Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam với
                    các sọc đậm và họa tiết trên cánh và đuôi
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

    </main>
  )
}

export default BirdDetail

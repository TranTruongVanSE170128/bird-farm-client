import Container from '@/components/ui/container'
import image from '@/assets/anhdaidien.jpg'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
function DisplayRating() {
  const [selectedButton, setSelectedButton] = useState('all');
  const buttons = [
    { label: 'Tất cả', value: 'all' },
    { label: '5 Sao', value: '5' },
    { label: '4 Sao', value: '4' },
    { label: '3 Sao', value: '3' },
    { label: '2 Sao', value: '2' },
    { label: '1 Sao', value: '1' },
    { label: 'Có Hình ảnh', value: '0' },
  ];

  const handleButtonClick = (value:string) => {
    setSelectedButton(value);
  };
  return (
    <main className=''>
      <Container>
        <section className=''>
          <div className='text-center p-6'>
            <h1 className=' text-4xl font-semibold'>Đánh giá và Nhận xét</h1>
          </div>
          <div className='flex justify-start items-center border mx-4 rounded-sm'>
            <div className='mx-10 '>
              <span className='font-medium text-6xl mx-4'>5</span>
              <span className='font-medium text-2xl'>/ 5</span>
              <div className='flex my-2'>
                <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                <Star fill='#ee4d2d' color='#ee4d2d'></Star>
              </div>
            </div>

            <div className=''>
              {buttons.map((button) => (
                <Button
                  key={button.value}
                  onClick={() => handleButtonClick(button.value)} variant='outline' className={cn('border border-primary mx-4 text-base',
                  selectedButton === button.value ? "text-secondary bg-primary" : "")}
                >
                  {button.label}
                </Button>
              ))}
              {/* <Button variant='outline' className='border border-primary mx-4'>
                Tất cả(5)
              </Button>
              <Button variant='outline' className='border border-primary mx-4'>
                5 Sao(1)
              </Button>
              <Button variant='outline' className='border border-primary mx-4'>
                4 Sao(0)
              </Button>
              <Button variant='outline' className='border border-primary mx-4'>
                3 Sao(0)
              </Button>
              <Button variant='outline' className='border border-primary mx-4'>
                2 Sao(0)
              </Button>
              <Button variant='outline' className='border border-primary mx-4'>
                1 Sao(0)
              </Button>
              <Button variant='outline' className='border border-primary mx-4 text-[#ee4d2d] border-[#ee4d2d]'>
                Có Hình Ảnh/Video(9)
              </Button> */}
            </div>
          </div>
          {/* Review 1 */}
          <div className=' flex justify-center '>
            <div className='bg-background shadow-2xl p-4 m-4 cursor-pointer w-full '>
              <div className='flex justify-between items-center mb-4 mx-10'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 rounded-full overflow-hidden mr-2'>
                    <img src={image} alt='Profile Image' />
                  </div>

                  <div className=''>
                    <strong className='text-gray-700 text-xl mr-2 '>thuongminhlsr</strong>
                    <span className='text-gray-500 text-lg'>Ngày 23-12-2023 | 20:09</span>
                  </div>
                </div>

                <div className='flex'>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                </div>
              </div>

              <div className='text-foreground text-xl mx-10'>
                <p>Sản phẩm tuyệt vời, shop tận tình chu đáo
                Sản phẩm tuyệt vời, shop tận tình chu đáo
                Sản phẩm tuyệt vời, shop tận tình chu đáo
                Sản phẩm tuyệt vời, shop tận tình chu đáo
                Sản phẩm tuyệt vời, shop tận tình chu đáo
                Giao hàng nhanh chóng
                </p>
              </div>

              <div className='flex mt-2 mx-10'>
                <img src={image} alt='Comment Image' className='w-24 mr-2' />
                <img src={image} alt='Comment Image' className='w-24 mr-2' />
                <img src={image} alt='Comment Image' className='w-24' />
              </div>
            </div>
          </div>
          {/* Review 2 */}
          <div className=' flex justify-center '>
            <div className='bg-background shadow-2xl p-4 m-4 cursor-pointer w-full '>
              <div className='flex justify-between items-center mb-4 mx-10'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 rounded-full overflow-hidden mr-2'>
                    <img src={image} alt='Profile Image' />
                  </div>

                  <div className=''>
                    <strong className='text-gray-700 text-xl mr-2 '>thuongminhlsr</strong>
                    <span className='text-gray-500 text-lg'>Ngày 23-12-2023 | 20:09</span>
                  </div>
                </div>

                <div className='flex'>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                </div>
              </div>

              <div className='text-foreground text-xl mx-10'>
                <p>Sản phẩm tuyệt vời, shop tận tình chu đáo
                  Phục vụ tận tình
                  Sản phẩm tuyệt vời, shop tận tình chu đáo
                  Sản phẩm tuyệt vời, shop tận tình chu đáo

                </p>
              </div>

              <div className='flex mt-2 mx-10'>
                <img src={image} alt='Comment Image' className='w-24 mr-2' />
                <img src={image} alt='Comment Image' className='w-24 mr-2' />
                <img src={image} alt='Comment Image' className='w-24' />
              </div>
            </div>
          </div>
          {/* Review 3 */}
          <div className=' flex justify-center '>
            <div className='bg-background shadow-2xl p-4 m-4 cursor-pointer w-full '>
              <div className='flex justify-between items-center mb-4 mx-10'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 rounded-full overflow-hidden mr-2'>
                    <img src={image} alt='Profile Image' />
                  </div>

                  <div className=''>
                    <strong className='text-gray-700 text-xl mr-2 '>thuongminhlsr</strong>
                    <span className='text-gray-500 text-lg'>Ngày 23-12-2023 | 20:09</span>
                  </div>
                </div>

                <div className='flex'>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                  <Star fill='#ee4d2d' color='#ee4d2d'></Star>
                </div>
              </div>

              <div className='text-foreground text-xl mx-10'>
                <p>Sản phẩm tuyệt vời, shop tận tình chu đáo
                Sản phẩm tuyệt vời, shop tận tình chu đáo
                Sản phẩm tuyệt vời, shop tận tình chu đáo
                Sản phẩm tuyệt vời, shop tận tình chu đáo
                </p>
              </div>

              <div className='flex mt-2 mx-10'>
                <img src={image} alt='Comment Image' className='w-24 mr-2' />
                <img src={image} alt='Comment Image' className='w-24 mr-2' />
                <img src={image} alt='Comment Image' className='w-24' />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default DisplayRating

import { PhoneCall } from 'lucide-react'
import { Mail } from 'lucide-react'
import Container from '../ui/container'
import { Button } from '../ui/button'

function Footer() {
  return (
    <footer className='border-t'>
      <Container>
        <div className='w-full h-full pt-5'>
          <div className='flex mt-6 gap-14'>
            <div className='flex flex-col flex-1 gap-1'>
              <div className='text-2xl font-bold'>Thông tin cửa hàng</div>
              <p className='text-xs sm:text-base'>
                Cửa hàng trại chim: Điểm đến duy nhất cho tất cả mọi thứ liên quan đến các loài chim! Chúng tôi cung cấp
                đa dạng sản phẩm liên quan đến chim, tổ chim non. Hãy ghé thăm chúng tôi ngay hôm nay!
              </p>
            </div>

            <div className='flex flex-col flex-1 gap-1'>
              <div className='text-2xl font-bold'>Thông tin liên hệ</div>
              <div className='flex flex-col'>
                <div className='text-xs sm:text-base'>
                  <strong>Địa chỉ:</strong> trang trại Bird 590 Trương Định (mặt bờ sông), Tân Mai, Hoàng Mai, Hà Nội.
                </div>
                <div className='text-xs sm:text-base'>
                  <strong>Hotline:</strong> 0332333005
                </div>
                <div className='text-xs sm:text-base'>
                  <strong>Email:</strong> birdfarmswp@gmail.com
                </div>
                <div className='text-xs sm:text-base'>
                  <strong>Website:</strong> <a href='https://bird-farm.vercel.app/'>https://bird-farm.vercel.app/</a>
                </div>
              </div>
            </div>

            <div className='flex flex-col flex-1 gap-1'>
              <div className='text-2xl font-bold'>Hỗ trợ khách hàng</div>
              <div className='flex mt-5 4'>
                <Button variant='ghost'>
                  <PhoneCall />
                </Button>
                <Button variant='ghost'>
                  <Mail />
                </Button>
              </div>
            </div>
          </div>
          <div className='flex justify-center pb-10 mt-10'>© Bản quyền thuộc về BIRD FARM SHOP.</div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

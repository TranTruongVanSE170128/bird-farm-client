import { PhoneCall } from 'lucide-react'
import { Mail } from 'lucide-react'

function Footer() {
  return (
    <div className='w-full h-full border-t-2 mt-20'>
      <div className='flex text-white mt-6 gap-14'>
        <div className='flex flex-col flex-1 gap-1'>
          <div className='text-2xl font-bold text-primary'>Thông tin cửa hàng</div>
          <p className='text-xs sm:text-base'>
            Cửa hàng trại chim: Điểm đến duy nhất cho tất cả mọi thứ liên quan đến các loài chim! Chúng tôi cung cấp đa
            dạng sản phẩm liên quan đến chim, tổ chim non. Hãy ghé thăm chúng tôi ngay hôm nay!
          </p>
        </div>

        <div className='flex flex-col flex-1 gap-1'>
          <div className='text-2xl font-bold text-primary'>Thông tin liên hệ</div>
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
              <strong>Website:</strong> <a href='https://bird-farm.netlify.app/'>https://bird-farm.netlify.app/</a>
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-1'>
          <div className='text-2xl font-bold text-primary'>Hỗ trợ khách hàng</div>
          <div className='flex gap-10 mt-5'>
            <a href=''>
              <PhoneCall></PhoneCall>
            </a>
            <a href=''>
              <Mail></Mail>
            </a>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-10 -mb-10'>© Bản quyền thuộc về BIRD FARM SHOP.</div>
    </div>
  )
}

export default Footer

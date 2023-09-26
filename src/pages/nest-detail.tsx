import Container from '@/components/ui/container'
import { useEffect, useRef, useState } from 'react'
import noImage from '@/assets/no-image.avif'
import { calculateAge, formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/contexts/cart-provider'
import { useToast } from '@/components/ui/use-toast'
import Ellipce from '@/assets/Ellipse2.png'


function NestDetail() {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const { addNestToCart } = useCartContext()
  const { toast } = useToast()
  const handleMouseEnter = (imageUrl: string) => {
    if (imageRef.current) {
      imageRef.current.src = imageUrl
    }
  }
  const nestList={
    id:'65100b5dd2122d65c01795fd',
    name: "Tổ Chim Bong Lau ma fcb34d",
    specie:{
      id:'65066ef9ecdd07bc4ale279c',
      name:"To chim Bong lau"
    } ,
    imageUrls:[
      "https://i.ytimg.com/vi/TvDFssOoXyk/maxresdefault.jpg",
      "https://images2.thanhnien.vn/Uploaded/2014/Picture20119/MinhNguyet/Thang9/chim.jpg",
      "https://naidecor.vn/wp-content/uploads/2019/06/img_8834-copy.jpg",
      "https://phathocdoisong.com/upload/image/201610/20161019102839_30484.jpg"
    ],
    sold: false,
    price: 1045000,
    description: "To chim dang iu xinh dep nhat the gian"
  }
  return (
    <main>
      <Container>
          <section className='grid grid-cols-12 gap-8 mt-10'>
            <div className='col-span-5'>
              <div>
                {!nestList.imageUrls?.length ? (
                  <img
                    ref={imageRef}
                    className='w-full h-full aspect-square object-cover rounded cursor-pointer'
                    src={noImage}
                    alt='nest'
                  />
                ) : (
                  <img
                    ref={imageRef}
                    className='w-full h-full aspect-square object-cover rounded cursor-pointer'
                    src={nestList.imageUrls[0]}
                    alt='nest'
                  />
                )}
              </div>
              <div className='grid grid-cols-5 mt-2 gap-2 flex-wrap w-full'>
                {nestList.imageUrls?.map((imageUrl) => {
                  return (
                    <img
                      onMouseEnter={() => {
                        handleMouseEnter(imageUrl)
                      }}
                      className='w-full h-full aspect-square object-cover rounded cursor-pointer'
                      src={imageUrl}
                      alt='nest'
                    />
                  )
                })}
              </div>
            </div>

            <div className='col-span-7 text-lg px-4'>
              <h3 className='text-5xl font-semibold mb-6'>{nestList.name}</h3>
              <div className='flex mb-6'>
                  <span className='font-medium mr-3 text-xl'>Danh mục: </span>
                  <span className=''>
                    {nestList.specie.name}
                  </span>
              </div>
              <div className='flex gap-4 items-center mb-6'>
                  <div className='font-medium text-xl mr-12 '>Giá:</div>
                  <p className='text-3xl text-red-500 font-medium'>
                    {formatPrice(nestList.price)}
                  </p>
              </div>
              <p className='my-3 mb-6'>
                  <span className='pr-1 font-medium mr-8 text-xl'>Mô tả :</span>{' '}
                  <span> {nestList.description || 'Không có thông tin'} </span>
              </p>
                
              <div className='flex gap-4 my-6 mt-10'>
                    <Button className='text-lg'
                      onClick={() => {
                        addNestToCart(nestList.id)
                        toast({
                          title: 'Đã thêm chim vào giỏ hàng',
                          variant: 'success'
                        })
                      }}
                      size='lg'
                      variant='outline'
                    >
                      Thêm vào giỏ
                    </Button>

                    <Button className='text-lg' onClick={() => {}} size='lg'>
                      Mua ngay
                    </Button>
              </div>
            </div>
          </section>
          <div className='text-center flex flex-col gap-3 mt-7 items-center'>
          <h3 className='text-3xl uppercase font-bold'>gọi ngay cho trang trại</h3>
          <p>Để được tư vấn trực tiếp</p>
          <Button
            className='bg-yellow-300 py-8 gap-2 text rounded-full text-slate-500 hover:bg-yellow-300 hover:opacity-80'
            size='lg'
          >
            <img src={Ellipce} alt='' className='w-12 h-w-12' /> Hotline: 033233005
          </Button>
        </div>
      </Container>
    </main>
  )
}

export default NestDetail

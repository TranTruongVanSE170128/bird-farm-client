import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { useCartContext } from '@/contexts/cart-provider'
import { Bird, Nest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Trash2 } from 'lucide-react'
import voucherIcon from '@/assets/voucher.png'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import noImage from '@/assets/no-image.avif'
import { formatPrice } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { useAuthContext } from '@/contexts/auth-provider'
import { useNavigate } from 'react-router-dom'

type Products = {
  birds: Bird[]
  nests: Nest[]
}

function Cart() {
  const { cart, removeBirdFromCart, removeNestFromCart } = useCartContext()
  const [products, setProducts] = useState<Products>({ birds: [], nests: [] })
  const [totalMoney, setTotalMoney] = useState(0)
  const { toast } = useToast()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      const birdsData = birdFarmApi.post('/api/birds/get-by-ids', { birds: cart.birds }).then((res) => res.data.birds)
      const nestsData = birdFarmApi.post('/api/nests/get-by-ids', { nests: cart.nests }).then((res) => res.data.nests)

      const [birds, nests] = await Promise.all([birdsData, nestsData])

      setProducts({ birds, nests })
    }

    fetchProducts()
  }, [cart])

  useEffect(() => {
    let temp = 0

    products.birds.forEach((bird) => {
      temp += bird.sellPrice
    })

    products.nests.forEach((nest) => {
      temp += nest.price
    })

    setTotalMoney(temp)
  }, [products])

  return (
    <main>
      <Container>
        <section className='my-7 px-5 container'>
          <div className='flex justify-center gap-2 '>
            <span className='uppercase text-2xl  '>Giỏ HÀNG </span>
            <span className='text-2xl '>{'>'}</span>
            <span className='uppercase text-2xl  text-gray-500'>Chi tiết thanh toán</span>
          </div>

          <div className='flex gap-10 mt-10 w-full'>
            <div className='flex justify-center gap-10 flex-1 '>
              <Table className=''>
                <TableHeader>
                  <TableRow>
                    <TableHead className='font-bold text-center'>Ảnh</TableHead>
                    <TableHead className='font-bold'>Sản phẩm </TableHead>
                    <TableHead className='font-bold text-center'>Loại sản phẩm </TableHead>
                    <TableHead className='font-bold text-center'>Giá</TableHead>
                    <TableHead className='font-bold'>Xóa</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {products?.birds.map((bird) => {
                    return (
                      <TableRow key={bird._id}>
                        <TableCell className='font-medium'>
                          {!bird.imageUrls?.length ? (
                            <img src={noImage} alt='' className='h-[70px] w-[70px] object-cover rounded-lg mx-auto' />
                          ) : (
                            <img
                              src={bird.imageUrls[0]}
                              alt=''
                              className='h-[70px] w-[70px] object-cover rounded-lg mx-auto'
                            />
                          )}
                        </TableCell>
                        <TableCell>{bird.name}</TableCell>
                        <TableCell className='text-center'>Chim kiểng</TableCell>
                        <TableCell className='text-center'>{formatPrice(bird.sellPrice)}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              removeBirdFromCart(bird._id)
                            }}
                            size='icon'
                            variant='ghost'
                          >
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {products?.nests.map((nest) => {
                    return (
                      <TableRow key={nest._id}>
                        <TableCell className='font-medium'>
                          {!nest.imageUrls?.length ? (
                            <img src={noImage} alt='' className='h-[70px] w-[70px] object-cover rounded-lg mx-auto' />
                          ) : (
                            <img
                              src={nest.imageUrls[0]}
                              alt=''
                              className='h-[70px] w-[70px] object-cover rounded-lg mx-auto'
                            />
                          )}
                        </TableCell>
                        <TableCell>{nest.name}</TableCell>
                        <TableCell className='text-center'>Tổ chim non</TableCell>
                        <TableCell className='text-center'>{formatPrice(nest.price)}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              removeNestFromCart(nest._id)
                            }}
                            size='icon'
                            variant='ghost'
                          >
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            <div className='min-w-[300px]'>
              <h1 className='text-lg font-bold uppercase text-center'>Đơn hàng</h1>
              <div className='flex m-auto mt-5'>
                <span className='w-1/2 text-start font-bold'>Tạm tính</span>
                <span className='w-1/2 text-end font-bold'>{formatPrice(totalMoney)}</span>
              </div>
              <div className='flex m-auto mt-5'>
                <span className='w-1/2 text-start font-bold'>Giảm giá</span>
                <span className='w-1/2 text-end font-bold'>0%</span>
              </div>
              <div className='border mt-4 m-auto'></div>
              <div className='flex m-auto mt-5'>
                <span className='w-1/2 text-start font-bold'>Tổng</span>
                <span className='w-1/2 text-end font-bold'>{formatPrice(totalMoney)}</span>
              </div>

              <div className='m-auto mt-5 py-3 px-5 bg-accent rounded-2xl shadow-lg'>
                <div className='inline-flex gap-3 px-5 py-4 justify-start items-center bg-yellow-300 rounded-2xl text-slate-600'>
                  <img src={voucherIcon} alt='' />
                  <span>Phiếu ưu đãi</span>
                </div>

                <div className='mt-3'>
                  <Input type='text' placeholder='nhập mã giảm giá ' className='w-full px-5 py-1 rounded-xl' />
                </div>
                <div className='mt-3'>
                  <Button className='px-7 py-2 font-bold rounded-3xl'>Áp dụng</Button>
                </div>
              </div>

              <div className='mt-4 m-auto'>
                <Button
                  className='w-full'
                  onClick={() => {
                    if (!user) {
                      toast({
                        title: 'Hãy đăng nhập để tiếp tục mua hàng',
                        variant: 'destructive'
                      })
                      return
                    }

                    navigate('/checkout')
                  }}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default Cart

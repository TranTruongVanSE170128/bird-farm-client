import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TVoucherSchema, voucherSchema } from '@/lib/validations/voucher'
import { zodResolver } from '@hookform/resolvers/zod'
import { Voucher } from '@/lib/types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CalendarIcon, Shell } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useNavigate } from 'react-router-dom'

type Props = {
  voucher?: Voucher
  btnTitle: string
  action: 'create' | 'update'
  setEdit?: (val: boolean) => void
}

function VoucherForm({ voucher, btnTitle, action, setEdit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<TVoucherSchema>({
    resolver: zodResolver(voucherSchema),
    defaultValues: { ...voucher, expiredAt: voucher?.expiredAt ? new Date(voucher.expiredAt) : undefined }
  })

  const onSubmit = async (values: TVoucherSchema) => {
    console.log(values)

    setIsSubmitting(true)
    try {
      if (action === 'create') {
        await birdFarmApi.post('/api/vouchers', values)
      } else {
        await birdFarmApi.put(`/api/vouchers/${voucher?._id}`, {
          ...values,

          expiredAt: values.expiredAt && new Date(values.expiredAt)
        })
      }

      toast({
        variant: 'success',
        title: action === 'create' ? 'Tạo voucher mới thành công' : 'Cập nhật voucher thành công'
      })

      navigate(`/staff/vouchers/`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: action === 'create' ? 'Không thể tạo voucher' : 'Không thể cập nhật voucher',
        description: messageError || 'Không rõ nguyên nhân'
      })
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form className='flex flex-col justify-start gap-10' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='discountPercent'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full gap-3'>
                <FormLabel className='font-bold text-light-2'>Phần trăm giảm(%)</FormLabel>
                <FormControl>
                  <Input type='text' className='account-form_input no-focus' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='conditionPrice'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full gap-3'>
                <FormLabel className='font-bold text-light-2'>Yêu cầu đơn tối thiểu(vnđ)</FormLabel>
                <FormControl>
                  <Input type='text' className='account-form_input no-focus' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='maxDiscountValue'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full gap-3'>
                <FormLabel className='font-bold text-light-2'>Giảm tối đa(vnđ)</FormLabel>
                <FormControl>
                  <Input type='text' className='account-form_input no-focus' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full gap-3'>
                <FormLabel className='font-bold text-light-2'>Số lượng</FormLabel>
                <FormControl>
                  <Input type='text' className='account-form_input no-focus' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='expiredAt'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-[10px]'>
                <FormLabel>Ngày hết hạn</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-[240px] text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP', { locale: vi }) : <span>Chọn ngày hết hạn</span>}
                        <CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end gap-2'>
            {setEdit && (
              <Button
                onClick={() => {
                  setEdit(false)
                }}
                disabled={isSubmitting}
                variant='outline'
                type='submit'
              >
                Hủy
              </Button>
            )}
            <Button disabled={isSubmitting} type='submit'>
              {btnTitle}
              {isSubmitting && <Shell className='w-4 h-4 ml-1 animate-spin' />}
            </Button>
          </div>
        </form>
      </Form>

      {/* <div>
        <div className='mb-4 text-lg font-bold'>Mô tả trên cửa hàng</div>
        <div dangerouslySetInnerHTML={{ __html: descriptionReview }} />
      </div> */}
    </>
  )
}

export default VoucherForm

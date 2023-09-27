import { useModalStore } from '@/store/use-modal'
import { Button } from './button'
import { useState } from 'react'
import { Shell } from 'lucide-react'

function Modal() {
  const { display, resetModal, content, title, handleAction, titleAction, titleCancel } = useModalStore()
  const [acting, setActing] = useState(false)

  return (
    <>
      {display ? (
        <div className={'fixed inset-0 z-[1000] flex justify-center items-center bg-foreground/60'}>
          <div className='w-[500px] bg-background rounded-md p-6'>
            <div className='font-medium text-lg mb-2'>{title}</div>
            {content}
            <div className='flex justify-end gap-3 mt-2'>
              <Button disabled={acting} onClick={resetModal} variant='outline'>
                {titleCancel || 'Hủy'}
              </Button>
              <Button
                disabled={acting}
                onClick={async () => {
                  setActing(true)
                  if (handleAction) {
                    await handleAction()
                  }
                  setActing(false)
                  resetModal()
                }}
              >
                {titleAction || 'Tiếp tục'} {acting && <Shell className='ml-1 animate-spin w-4 h-4' />}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Modal

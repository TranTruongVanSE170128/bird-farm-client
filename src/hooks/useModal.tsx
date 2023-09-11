import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

type Props = {
  title: string
  description: string
  action: string
  onAction: () => void
}

function useModal({ title, description, onAction, action }: Props) {
  const button = useRef<HTMLButtonElement | null>(null)

  const showModal = () => {
    button.current?.click()
  }

  const Modal = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='hidden' ref={button}></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>{action}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { Modal, showModal }
}

export default useModal

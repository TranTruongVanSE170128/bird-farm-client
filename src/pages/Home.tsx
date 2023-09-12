import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import useModal from '@/hooks/useModal'

function Home() {
  const { Modal, showModal } = useModal({
    action: 'Vẫn xóa',
    description: 'Xóa cái là không có lấy lại được đâu nha, có không giữ mất đừng tìm.',
    title: 'Có chắc là xóa không?',
    onAction: () => {
      console.log('Đã xóa')
    }
  })
  return (
    <main>
      <ModeToggle />
      <Modal />
      <Button onClick={showModal}>Click me</Button>
      <Button variant='secondary' onClick={showModal}>
        Click me
      </Button>
    </main>
  )
}

export default Home

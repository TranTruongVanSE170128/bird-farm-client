import { Button } from '@/components/ui/button'
import { ModeToggle } from './components/mode-toggle'

function App() {
  return (
    <main>
      <ModeToggle />
      <Button>Click Me</Button>
      <Button variant='secondary'>Click Me</Button>
    </main>
  )
}

export default App

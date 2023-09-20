import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import Container from '@/components/ui/container'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Specie } from '@/lib/types'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { BirdIcon, Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

type Props = {}

function pairing({}: Props) {
  const [open, setOpen] = useState(false)
  const [specieId, setSpecieId] = useState('')
  const [species, setSpecies] = useState<Specie[]>([])

  useEffect(() => {
    const fetchBirds = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/species`)

      setSpecies(data?.species || [])
    }

    fetchBirds()
  }, [])

  

  return (
    <Container>
      <div className='flex flex-col justify-center items-center gap-4 mb-5'>
        <div className='uppercase text-3xl mt-10'>Đặt tổ chim non theo yêu cầu</div>
        <div className='flex gap-4'>
          <div className='border-t-2 border-white w-52 my-2'></div>
          <BirdIcon></BirdIcon>
          <div className='border-t-2 border-white w-52 my-2'></div>
        </div>
      </div>

      <div className='flex justify-center my-10'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
            {specieId ? species.find((specie) => specie._id === specieId)?.name : 'Chọn loài...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Tìm kiếm loài chim...'/>
            <CommandEmpty>Không tìm thấy</CommandEmpty>
            <CommandGroup>
              {species.map((specie) => (
                <CommandItem
                  key={specie._id}
                  onSelect={(currentValue: String) => {
                    setSpecieId(currentValue === specieId ? '' : specie._id as string)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', specieId === specie._id ? 'opacity-100' : 'opacity-0')}
                  />
                  {specie.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      </div>

      <div className='w-full flex justify-around gap-4'>
          <div className='w-56 h-96 border border-white'></div>
          <div className='flex items-center'><Heart></Heart></div>
          <div className='w-56 h-96 border border-white'></div>
      </div>

    </Container>
  )
}

export default pairing

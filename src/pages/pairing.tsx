import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import Container from '@/components/ui/container'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Specie } from '@/lib/types'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { BirdIcon, Check, ChevronsUpDown, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

function Pairing() {
  const [open, setOpen] = useState(false)
  const [specieId, setSpecieId] = useState('')
  const [species, setSpecies] = useState<Specie[]>([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/species?pagination=false`)

      setSpecies(data?.species || [])
    }
    fetchSpecies()
  }, [])

  useEffect(() => {
    const fetchBirds = async () => {}
    if (specieId) {
      fetchBirds()
    }
  }, [specieId])

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
              {specieId ? species.find((specie) => specie._id === specieId)?.name : 'Chọn loài chim...'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <div className='flex items-center border-b px-3' cmdk-input-wrapper=''>
                <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
                <input
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value)
                  }}
                  placeholder='Tìm loài chim...'
                  className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400'
                />
              </div>
              <CommandEmpty>Không tìm thấy.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className='h-96'>
                  {species
                    .filter((specie) => specie.name.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((specie) => (
                      <CommandItem
                        key={specie._id}
                        value={specie._id}
                        onSelect={(currentValue) => {
                          setSpecieId(currentValue === specieId ? '' : currentValue)
                          setOpen(false)
                          setSearchValue('')
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', specieId === specie._id ? 'opacity-100' : 'opacity-0')} />
                        {specie.name}
                      </CommandItem>
                    ))}
                </ScrollArea>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className='w-full flex justify-around gap-4'>
        <div className='w-56 h-96 border border-white'></div>
        <div className='flex items-center'>
          <Heart></Heart>
        </div>
        <div className='w-56 h-96 border border-white'></div>
      </div>
    </Container>
  )
}

export default Pairing

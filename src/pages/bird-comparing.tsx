
import Container from '@/components/ui/container'
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
import { Bird } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
type Props = {
    className?: string
    bird?: Bird
}
function BirdComparing({ className, bird }: Props) {
    const [isListVisible, setListVisible] = useState(false);
    const toggleList = () => {
        setListVisible(!isListVisible);
    }

    return (
        <main>
            <Container>
                <div className='flex justify-center'>
                    <p className='uppercase font-semibold text-2xl pt-3'>So sánh sản phẩm</p>
                </div>
                <div className='w-full h-[1px] bg-black mt-3'></div>
                <div className='flex justify-between'>
                    <div style={{ flexBasis: '40%' }}>
                        <Input />
                        <Link to={`/birds/${bird?._id}`} className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}>
                            <div>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI' alt="" />
                            </div>
                            <p className='underline text-cyan-400 text-center pt-3'>Xem chi tiết</p>
                        </Link>
                    </div>
                    <div style={{ flexBasis: '20%' }}>

                    </div>
                    <div style={{ flexBasis: '40%' }}>
                        <Input />
                        <Link to={`/birds/${bird?._id}`} className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}>
                            <div>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI' alt="" />
                            </div>
                            <p className='underline text-cyan-400 text-center pt-3'>Xem chi tiết</p>
                        </Link>
                    </div>
                </div>
                <div className='mt-3'>
                    <p
                        className='uppercase text-xl font-bold bg-primary py-2 mb-3  text-white cursor-pointer'
                        onClick={toggleList}
                    >
                        <div className='flex gap-4 px-3 items-center'>
                            {(isListVisible) ? <ChevronUp></ChevronUp> : <ChevronDown></ChevronDown>}
                            Thông tin so sánh
                        </div>
                    </p>
                    {!isListVisible && (
                        <div>
                            <p>
                                Chim chào mào, còn được gọi là "Pycnonotus jocosus," là một loài chim thuộc họ Chim chào mào
                                (Pycnonotidae). Chúng là những loài chim nhỏ có âm thanh đặc biệt và có ngoại hình rất đẹp và phong cách.
                                Dưới đây là mô tả tổng quan về loài chim chào mào:
                            </p>
                            <ul className='list-decimal ml-6'>
                                <li>
                                    Ngoại hình:
                                    <ul style={{ listStyle: 'disc' }} className='ml-6'>
                                        <li>Chim chào mào thường có kích thước nhỏ, dài khoảng 20-25 cm.</li>
                                        <li>
                                            Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam với
                                            các sọc đậm và họa tiết trên cánh và đuôi
                                        </li>
                                        <li>
                                            Mỏ của chim chào mào thường ngắn và hình nón, phù hợp cho việc ăn các loại trái cây và quả mọng.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Ngoại hình:
                                    <ul style={{ listStyle: 'disc' }} className='ml-6'>
                                        <li>Chim chào mào thường có kích thước nhỏ, dài khoảng 20-25 cm.</li>
                                        <li>
                                            Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam với
                                            các sọc đậm và họa tiết trên cánh và đuôi
                                        </li>
                                        <li>
                                            Mỏ của chim chào mào thường ngắn và hình nón, phù hợp cho việc ăn các loại trái cây và quả mọng.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Ngoại hình:
                                    <ul style={{ listStyle: 'disc' }} className='ml-6'>
                                        <li>Chim chào mào thường có kích thước nhỏ, dài khoảng 20-25 cm.</li>
                                        <li>
                                            Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam với
                                            các sọc đậm và họa tiết trên cánh và đuôi
                                        </li>
                                        <li>
                                            Mỏ của chim chào mào thường ngắn và hình nón, phù hợp cho việc ăn các loại trái cây và quả mọng.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Ngoại hình:
                                    <ul style={{ listStyle: 'disc' }} className='ml-6'>
                                        <li>Chim chào mào thường có kích thước nhỏ, dài khoảng 20-25 cm.</li>
                                        <li>
                                            Chúng có màu lông rất đa dạng, nhưng phần lớn chúng có lông màu xanh dương, xám, trắng hoặc cam với
                                            các sọc đậm và họa tiết trên cánh và đuôi
                                        </li>
                                        <li>
                                            Mỏ của chim chào mào thường ngắn và hình nón, phù hợp cho việc ăn các loại trái cây và quả mọng.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

            </Container>
        </main>
    )
}

export default BirdComparing
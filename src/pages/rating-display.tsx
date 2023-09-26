import React from 'react'
import Container from '@/components/ui/container'
import image from '@/assets/anhdaidien.jpg'
import star from '@/assets/star.png'
import { Star, StarOff, Stars, StarsIcon } from 'lucide-react';
import { Button } from 'react-day-picker';
function DisplayRating() {
    return (
      <main className="">
        <Container>
            <section className="shadow-lg">
                
                <div className="text-center p-6">
                    <h1 className=" text-4xl font-semibold">Đánh giá và Nhận xét</h1>
                </div>
                <div className='bg-purple-100 flex mx-20'>
                    <div className='mx-10'>
                        <span className='font-medium text-6xl mx-4'>5</span>
                        <span className='font-medium text-2xl'>/ 5</span>
                        <div className='flex my-2'>
                            <Star fill='yellow' color='yellow'></Star>
                            <Star fill='yellow' color='yellow'></Star>
                            <Star fill='yellow' color='yellow'></Star>
                            <Star fill='yellow' color='yellow'></Star>
                            <Star fill='yellow' color='yellow'></Star>
                        </div>
                    </div>

                    <div className='flex bg-purple-100'>
                        <button className='px-4 my-6 mx-6 bg-card rounded-md border border-primary hover:bg-primary hover:text-card' >
                            5 sao(1)
                        </button>
                        <button className='px-4 my-6 mx-6 bg-card rounded-md border border-primary hover:bg-primary hover:text-card'>
                            4 sao(0)
                        </button>
                        <button className='px-4 my-6 mx-6 bg-card rounded-md border border-primary hover:bg-primary hover:text-card'>
                            3 sao(0)
                        </button>
                        <button className='px-4 my-6 mx-6 bg-card rounded-md border border-primary hover:bg-primary hover:text-card'>
                            2 sao(0)
                        </button>
                        <button className='px-4 my-6 mx-6 bg-card rounded-md border border-primary hover:bg-primary hover:text-card'>
                            1 sao(0)
                        </button>
                        

                    </div>
                    
                </div>
                {/* Review 1 */}
                <div className="flex justify-center text-foreground">
                    <div className=" p-4 m-4 cursor-pointer w-10/12 ">
                        <div className="w-full overflow-hidden mr-2 flex ">
                                <img className='w-20 rounded-2xl' src={image} alt="Profile Image" />
                                <strong className= " text-xl m-5">thuongminhlsr</strong>
                        </div>
                        <div className="shadow-lg ml-14 bg-purple-200 rounded-xl">
                           <div className='flex justify-between items-center -mt-6 '>
                                <div className="flex mt-4 mx-10">
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>

                                </div>
                                <span className=" text-lg mt-4 mx-10">18 giờ trước</span>
                                
                            </div>

                            <div className="py-6 ">
                                <div className="text-xl mx-10">
                                    <p>Sản phẩm tuyệt vời, shop tận tình chu đáo 
                                        Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    </p>
                                </div>

                                <div className="flex mt-2 mx-10 ">
                                    <img src={image}alt="Comment Image" className="w-24 mr-2" />
                                    <img src={image} alt="Comment Image" className="w-24 mr-2" />
                                    <img src={image} alt="Comment Image" className="w-24" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* Review 2 */}
                <div className="flex justify-center text-foreground">
                    <div className=" p-4 m-4 cursor-pointer w-10/12 ">
                        <div className="w-full overflow-hidden mr-2 flex ">
                                <img className='w-20 rounded-2xl' src={image} alt="Profile Image" />
                                <strong className= " text-xl m-5">thuongminhlsr</strong>
                        </div>
                        <div className="shadow-lg ml-14 bg-purple-200 rounded-xl">
                           <div className='flex justify-between items-center -mt-6 '>
                                <div className="flex mt-4 mx-10">
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>

                                </div>
                                <span className=" text-lg mt-4 mx-10">18 giờ trước</span>
                                
                            </div>

                            <div className="py-6 ">
                                <div className="text-xl mx-10">
                                    <p>Sản phẩm tuyệt vời, shop tận tình chu đáo 
                                        Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    </p>
                                </div>

                                <div className="flex mt-2 mx-10 ">
                                    <img src={image}alt="Comment Image" className="w-24 mr-2" />
                                    <img src={image} alt="Comment Image" className="w-24 mr-2" />
                                    <img src={image} alt="Comment Image" className="w-24" />
                                </div>
                            </div>
                        </div>

                      

                    </div>
                   
                </div>

             {/* Review 3 */}
                <div className="flex justify-center text-foreground">
                    <div className=" p-4 m-4 cursor-pointer w-10/12 ">
                        <div className="w-full overflow-hidden mr-2 flex ">
                                <img className='w-20 rounded-2xl' src={image} alt="Profile Image" />
                                <strong className= " text-xl m-5">thuongminhlsr</strong>
                        </div>
                        <div className="shadow-lg ml-14 bg-purple-200 rounded-xl">
                           <div className='flex justify-between items-center -mt-6 '>
                                <div className="flex mt-4 mx-10">
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>

                                </div>
                                <span className=" text-lg mt-4 mx-10">18 giờ trước</span>
                                
                            </div>

                            <div className="py-6 ">
                                <div className="text-xl mx-10">
                                    <p>Sản phẩm tuyệt vời, shop tận tình chu đáo 
                                        Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    </p>
                                </div>

                                <div className="flex mt-2 mx-10 ">
                                    <img src={image}alt="Comment Image" className="w-24 mr-2" />
                                    <img src={image} alt="Comment Image" className="w-24 mr-2" />
                                    <img src={image} alt="Comment Image" className="w-24" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review 4 */}
                <div className="flex justify-center text-foreground">
                    <div className=" p-4 m-4 cursor-pointer w-10/12 ">
                        <div className="w-full overflow-hidden mr-2 flex ">
                                <img className='w-20 rounded-2xl' src={image} alt="Profile Image" />
                                <strong className= " text-xl m-5">thuongminhlsr</strong>
                        </div>
                        <div className="shadow-lg ml-14 bg-purple-200 rounded-xl">
                           <div className='flex justify-between items-center -mt-6 '>
                                <div className="flex mt-4 mx-10">
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>
                                    <Star fill='yellow' color='yellow'></Star>

                                </div>
                                <span className=" text-lg mt-4 mx-10">18 giờ trước</span>
                                
                            </div>

                            <div className="py-6 ">
                                <div className="text-xl mx-10">
                                    <p>Sản phẩm tuyệt vời, shop tận tình chu đáo 
                                        Sản phẩm tuyệt vời, shop tận tình chu đáo
                                    
                                    </p>
                                </div>

                                <div className="flex mt-2 mx-10 ">
                                    <img src={image}alt="Comment Image" className="w-24 mr-2" />
                                    <img src={image} alt="Comment Image" className="w-24 mr-2" />
                                    <img src={image} alt="Comment Image" className="w-24" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
      </main>
    );
  }
  
  export default DisplayRating;
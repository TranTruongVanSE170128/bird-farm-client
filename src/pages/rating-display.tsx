import React from 'react'
import Container from '@/components/ui/container'
import image from '@/assets/bg-auth.png'
import star from '@/assets/star.png'
function DisplayRating() {
    return (
      <main className="">
        <Container>
        <section className="bg-secondary">
          <div className="text-center p-6">
            <span className="text-gray-600 text-4xl uppercase">Đánh giá</span>
            <h1 className="text-white bg-primary text-4xl font-semibold p-2 inline-block">Nhận xét</h1>
          </div>
  
          {/* Review 1 */}
          <div className="flex justify-center ">
            <div className="bg-white shadow-lg p-4 m-4 cursor-pointer w-10/12 ">
              <div className="flex justify-between items-center mb-4 mx-10">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
                    <img src={image} alt="Profile Image" />
                  </div>
                  <div className=''>
                    <strong className="text-gray-700 text-xl">thuongminhlsr</strong>
                    <span className="text-gray-500 text-lg">18 giờ trước</span>
                  </div>
                </div>
                <div className="flex">
                <img src={star}className="w-8" />
                <img src={star}className="w-8" />
                <img src={star}className="w-8" />
                <img src={star}className="w-8" />
                <img src={star}className="w-8 " />

                </div>
              </div>
              <div className="text-gray-600 text-xl mx-10">
                <p>Sản phẩm tuyệt vời, shop tận tình chu đáo</p>
              </div>
              <div className="flex mt-2 mx-10">
                <img src={image}alt="Comment Image" className="w-24 mr-2" />
                <img src={image} alt="Comment Image" className="w-24 mr-2" />
                <img src={image} alt="Comment Image" className="w-24" />
              </div>
            </div>
          </div>
        </section>
        </Container>
      </main>
    );
  }
  
  export default DisplayRating;
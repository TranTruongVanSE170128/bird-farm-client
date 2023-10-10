import { useState, useRef, ChangeEvent } from 'react'
import Container from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import userIcon from '@/assets/user.png'
import voucherIcon from '@/assets/voucher.svg'
import { Input } from '@/components/ui/input'
import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import closeIcon from '@/assets/close.png'
function Profile() {
  const [activeTab, setActiveTab] = useState('account-general')
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const fileInputRef = useRef(null)
  const [isDefault, setIsDefault] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [newAddress, setNewAddress] = useState('')
  const [showAddressesModal, setShowAddressesModal] = useState(false)
  const [showNewAddressFields, setShowNewAddressFields] = useState(false)
  const [otherAddresses, setOtherAddresses] = useState([
    '123 Tran Hung Dao,Thành phố Phan Thiết, Bình Thuận',
    '456 Le Loi, Quận 1, TP.HCM',
    '789 Nguyen Hue, Quận 3, TP.HCM'
  ])
  const [defaultAddress, setDefaultAddress] = useState(otherAddresses[0])

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }

  const handleShowPasswordFields = () => {
    setShowPasswordFields(true)
  }

  const handleSavePassword = () => {
    // Add your code to handle saving the new password here
    if (newPassword === confirmPassword) {
      // Save the new password (replace with your logic)
      alert('Đã lưu mật khẩu thành công!')
      // You can add further logic to actually save the password to your backend.
      setShowPasswordFields(false)
    } else {
      alert('Mất khẩu không hợp lệ. Vui lòng thử lại!')
    }
  }

  const handleCancelPasswordChange = () => {
    setShowPasswordFields(false)
  }

  const handleUploadButtonClick = () => {
    // Trigger the file Input click event
    if (fileInputRef.current) {
      ;(fileInputRef.current as HTMLInputElement).click()
    }
  }
  const handleUpdateClick = (index: number) => {
    if (!isEditing) {
      setIsEditing(true)
      setNewAddress(defaultAddress)
    } else {
      setDefaultAddress(newAddress)
      setIsEditing(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value)
    if (newAddress.trim() === '') {
      return; // Don't add empty addresses
    }
    // Check for duplicates before adding
    if (newAddress !== otherAddresses[0]) {
      // Update the first address in the list with the new value
      const updatedAddresses = [...otherAddresses];
      updatedAddresses[0] = newAddress;
      setOtherAddresses(updatedAddresses);
      // Reset the input and hide the fields
    } 
    
  }
  const handleShowAddressesModal = () => {
    setShowAddressesModal(true)
  }

  const handleAddAddress = () => {
    if (newAddress.trim() === '') {
      return // Don't add empty addresses
    }

    // Check for duplicates before adding
    if (!otherAddresses.includes(newAddress)) {
      setOtherAddresses([...otherAddresses, newAddress])
    }
    setNewAddress('') // Reset the input field
  }

  const handleCloseAddressesModal = () => {
    setShowAddressesModal(false)
    setShowNewAddressFields(false)
  }
  const handleDeleteAddress = (index: number) => {
    const updatedAddresses = [...otherAddresses]
    updatedAddresses.splice(index, 1)
    setOtherAddresses(updatedAddresses)
  }
  const handleSetDefaultAddress = (index: number) => {
    const updatedAddresses = [...otherAddresses]
    const addressToMove = updatedAddresses.splice(index, 1)[0]
    updatedAddresses.unshift(addressToMove) // Move to the beginning of the list
    setOtherAddresses(updatedAddresses)
    setDefaultAddress(updatedAddresses[0])
  }
  const handleShowAddressInput = () => {
    setShowNewAddressFields(true)
  }
  const handleInputNewAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value)
  }
  const handleCloseInputNewAddress = () => {
    setShowNewAddressFields(false)
  }
  return (
    <main>
      <Container className='p-10'>
        <div className='rounded-lg shadow-md '>
          <div className='flex'>
            <div className='w-1/4 p-4'>
              <div className='flex flex-col'>
                <div className='flex items-center justify-center mb-6'>
                  <img
                    className='w-16 border-2 rounded-full border-primary'
                    src='https://nhadepso.com/wp-content/uploads/2023/03/tron-bo-50-hinh-anh-avatar-hai-huoc-cute-va-dang-yeu-nhat_1.jpg'
                    alt='Profile Avatar'
                  />
                  <div className='ml-4'>
                    <p className='text-xl font-semibold'>thuongminhlsr</p>
                    <p className='text-sm'>Khách hàng</p>
                  </div>
                </div>
                <div className='flex items-center mb-6 ml-10'>
                  <img src={userIcon} className='w-10 h-10 mr-1' />
                  <a
                    className={` hover:text-primary rounded-md ${
                      activeTab === 'account-general' ? 'text-primary' : ''
                    }`}
                    href='#'
                    onClick={() => handleTabClick('account-general')}
                  >
                    Tài khoản của tôi
                  </a>
                </div>
                <div className='flex items-center mb-6 ml-10'>
                  <img src={voucherIcon} className='w-10 h-10 mr-1' />
                  <a
                    className={`hover:text-primary rounded-md ${
                      activeTab === 'account-vouchers' ? 'text-primary' : ''
                    }`}
                    href='#'
                    onClick={() => handleTabClick('account-vouchers')}
                  >
                    Kho Voucher
                  </a>
                </div>
                <div className='flex items-center mb-6 ml-10'>
                  <Bell className='w-10 h-10 mr-1' />
                  <a
                    className={` hover:text-primary rounded-md ${
                      activeTab === 'account-notifications' ? 'text-primary' : ''
                    }`}
                    href='#'
                    onClick={() => handleTabClick('account-notifications')}
                  >
                    Thông báo
                  </a>
                </div>
              </div>
            </div>

            <div className='w-3/4 p-4 bg-card'>
              <div>
                <div className={`${activeTab === 'account-general' ? 'block' : 'hidden'}`}>
                  <h1 className='mb-4 text-2xl font-semibold'>Hồ sơ của tôi</h1>

                  <div className='flex items-center mb-4'>
                    <img
                      className='w-32 h-32 mr-4'
                      src='https://nhadepso.com/wp-content/uploads/2023/03/tron-bo-50-hinh-anh-avatar-hai-huoc-cute-va-dang-yeu-nhat_1.jpg'
                    />
                    <div className='flex flex-col'>
                      <Button className='' onClick={handleUploadButtonClick}>
                        Cập nhật ảnh mới
                      </Button>
                      <Input
                        type='file'
                        className='hidden'
                        ref={fileInputRef}
                        accept='image/jpeg, image/png, image/gif'
                      />
                      <div className='mt-2 text-sm text-card-foreground'>
                        Được phép JPG, GIF hoặc PNG. Kích thước tối đa 800K
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className=''>
                    <div className=''>
                      <label>Tên người dùng</label>
                      <Input type='text' className='w-full p-2 mb-2 border rounded-md border-muted-foreground' />
                    </div>

                    <div className=''>
                      <label className=''>E-mail</label>
                      <Input type='text' className='w-full p-2 mb-2 border rounded-md border-muted-foreground' />
                      <div className='flex flex-col justify-center w-4/5 h-20 p-4 bg-yellow-300 rounded-md '>
                        Email của bạn chưa được xác nhận. Hãy kiểm tra hộp thư đến của bạn.
                        <br />
                        <a className='text-blue-500 underline hover:' href='#'>
                          Gửi lại xác nhận
                        </a>
                      </div>
                    </div>
                    <div className=''>
                      <label className=''>Điện thoại</label>
                      <Input type='text' className='w-full p-2 mb-2 border rounded-md border-muted-foreground' />
                    </div>
                    <div className='pt-2'>
                      <label className=''>Địa chỉ</label>
                      <div className='flex justify-between'>
                        <div className='w-10/12 '>
                          {!isEditing ? (
                            <>
                              <p className='pt-2 pb-4'>{defaultAddress}</p>
                              {isDefault && (
                                <span className='border-2 border-primary px-2 py-1 text-primary'>Mặc định</span>
                              )}
                            </>
                          ) : (
                            <Input
                              type='text'
                              value={newAddress}
                              onChange={handleInputChange}
                              className='w-full mb-1'
                            />
                          )}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                          <Button variant={'outline'} onClick={() => handleUpdateClick(0)} >
                            {isEditing ? 'Lưu' : 'Cập nhật'}
                          </Button>
                          {!isEditing && <Button onClick={handleShowAddressesModal}>Thay đổi</Button>}

                          {isEditing && (
                            <Button variant={'link'} onClick={() => setIsEditing(false)}>
                              Hủy
                            </Button>
                          )}
                        </div>
                      </div>
                      {showAddressesModal && (
                        <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-0 backdrop-opacity-50'>
                          <div className='bg-card px-8 pb-8 pt-2 rounded-lg shadow-lg w-2/5'>
                            <div className='flex justify-end items-center mb-4 '>
                             
                            <img className='w-6 cursor-pointer' src={closeIcon}  onClick={handleCloseAddressesModal}/>
                            <span className='cursor-pointer'  onClick={handleCloseAddressesModal}>Đóng</span>
                            </div>
                            <div className='flex justify-between items-center'>
                              <h1 className='text-2xl font-semibold mb-5'>Các Địa chỉ khác</h1>
                              <Button onClick={handleShowAddressInput}>+Thêm địa chỉ mới</Button>
                            </div>

                            <ul className='mb-4'>
                              {otherAddresses.map((address, index) => (
                                <li key={index} className='flex justify-between items-center my-5'>
                                  {index === 0 ? (
                                    <div className='font-bold flex justify-between items-center'>
                                      <span className=''>{address}</span>
                                      <span className='border-2 border-primary px-2 py-1 text-primary justify-end ml-20'>
                                        Mặc định
                                      </span>
                                    </div>
                                  ) : (
                                    address
                                  )}
                                  {index !== 0 && (
                                    <div className='flex space-x-2'>
                                      <Button
                                        variant={'link'}
                                        onClick={() => handleSetDefaultAddress(index)}
                                        className='text-primary'
                                      >
                                        Đặt làm mặc định
                                      </Button>
                                      <Button
                                        variant={'link'}
                                        onClick={() => handleDeleteAddress(index)}
                                        className='text-red-500'
                                      >
                                        Xóa
                                      </Button>
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                            {showNewAddressFields && (
                              <>
                                {' '}
                                <input
                                  type='text'
                                  placeholder='Thêm địa chỉ mới'
                                  value={newAddress}
                                  onChange={handleInputNewAddress}
                                  className='w-full p-3 border border-muted rounded-md mb-4'
                                />
                                <div className='flex justify-end'>
                                  {showNewAddressFields && (
                                    <>
                                      <Button
                                        onClick={handleAddAddress}
                                        value={newAddress}
                                        className='bg-primary text-primary-foreground hover:bg-primary-dark'
                                      >
                                        Thêm
                                      </Button>
                                      <Button
                                        variant={'link'}
                                        onClick={handleCloseInputNewAddress}
                                        className='text-foreground'
                                      >
                                        Hủy
                                      </Button>
                                      
                                    </>
                                  )}
                                </div>
                              </>
                            )}

                            
                          </div>
                        </div>
                      )}
                    </div>

                    <div className=''>
                      <label className=''>Mật khẩu</label>
                      <Input
                        type='password'
                        className='w-full p-2 mb-2 border rounded-md border-muted-foreground'
                        id='currentPassword'
                      />
                      <Button onClick={handleShowPasswordFields}>Thay đổi mật khẩu</Button>
                    </div>
                    {showPasswordFields && (
                      <div id='passwordFields'>
                        <div className=''>
                          <label className=''>Mật khẩu mới</label>
                          <Input
                            type='password'
                            className='w-full p-2 mb-2 border rounded-md border-muted-foreground'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className=''>
                          <label className=''>Xác nhận mật khẩu</label>
                          <Input
                            type='password'
                            className='w-full p-2 mb-2 border rounded-md border-muted-foreground'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <Button className='mr-5' onClick={handleSavePassword}>
                          Lưu
                        </Button>
                        <Button variant={'outline'} onClick={handleCancelPasswordChange}>
                          Hủy
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className='flex justify-end mt-10'>
                    <Button className='mr-6'>Lưu thay đổi</Button>
                    <Button variant={'outline'}>Hủy bỏ</Button>
                  </div>
                </div>

                <div className={`${activeTab === 'account-vouchers' ? 'block' : 'hidden'}`}>
                  <div className=''>
                    <h5 className='mb-3 text-2xl font-semibold'>Voucher của bạn:</h5>
                    <div className='flex items-center justify-between p-2 mb-2 border border-muted-foreground'>
                      <div className='flex--1'>
                        <h6 className='text-lg font-semibold'>Voucher 1</h6>
                        <div className='flex items-center mt-2'>
                          <img
                            className='w-24 h-24 mr-5 rounded-md'
                            src='https://c8.alamy.com/comp/EMC7YT/special-discount-10-off-stamp-EMC7YT.jpg'
                            alt='Voucher 1'
                          />
                          <div>
                            <p>Description: 10% off on all products</p>
                            <p>Code: VOUCHER10</p>
                            <p className='text-muted-foreground'>Expires: 2023-12-31</p>
                          </div>
                        </div>
                      </div>
                      <Button variant={'destructive'} className='mx-10 '>
                        Dùng Voucher
                      </Button>
                    </div>
                    <div className='flex items-center justify-between p-2 mb-2 border border-muted-foreground'>
                      <div className='flex--1'>
                        <h6 className='text-lg font-semibold'>Voucher 1</h6>
                        <div className='flex items-center mt-2'>
                          <img
                            className='w-24 h-24 mr-5 rounded-md'
                            src='https://www.pngmart.com/files/8/Voucher-Download-PNG-Image.png'
                            alt='Voucher 1'
                          />
                          <div>
                            <p>Description: 10% off on all products</p>
                            <p>Code: VOUCHER10</p>
                            <p className='text-muted-foreground'>Expires: 2023-12-31</p>
                          </div>
                        </div>
                      </div>
                      <Button variant={'destructive'} className='mx-10 '>
                        Dùng Voucher
                      </Button>
                    </div>
                  </div>
                </div>

                <div className={`${activeTab === 'account-notifications' ? 'block' : 'hidden'}`}>
                  <div>
                    <h3 className='text-lg font-semibold'>Đơn mua</h3>
                    <div className='flex items-center justify-between my-4'>
                      <img
                        className='object-cover w-20 h-20 rounded-md'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg'
                        alt='Notification 1'
                      />
                      <div className='flex-1 ml-4'>
                        <span>Đã xác nhận thanh toán. Đơn hàng vadj2341 đã được đặt vui lòng kiểm tra đơn hàng</span>
                      </div>
                      <Button>Xem chi tiết</Button>
                    </div>
                  </div>

                  <div>
                    <hr />
                    <h3 className='text-lg font-semibold'>Đơn đặt</h3>
                    <div className='flex items-center justify-between my-4'>
                      <img
                        className='object-cover w-20 h-20 rounded-md'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg'
                        alt='Notification 2'
                      />
                      <div className='flex-1 ml-4'>
                        <span>Đơn đặt của bạn đã có cập nhật mới từ shop, vui lòng kiểm tra</span>
                      </div>
                      <Button>Xem chi tiết</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Profile

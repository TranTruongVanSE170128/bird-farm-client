import NestForm from '@/components/forms/nest-form'

function AdminNestsNew() {
  return (
    <div>
      <NestForm action='create' btnTitle='Tạo' />
    </div>
  )
}

export default AdminNestsNew

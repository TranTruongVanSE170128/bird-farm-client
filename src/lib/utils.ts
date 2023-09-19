import { type ClassValue, clsx } from 'clsx'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(num: number) {
  return Number(num).toLocaleString().replaceAll(',', '.') + 'đ'
}

export function calculateAge(birthday: Date | undefined): string {
  if (!birthday) return 'Không có thông tin'
  const now = moment()
  const birthdayMoment = moment(birthday, 'YYYY-MM-DD')

  if (!birthdayMoment.isValid()) {
    throw new Error('Lỗi ngày sinh')
  }

  const ageInMonths = now.diff(birthdayMoment, 'months')
  return ageInMonths + ' tháng tuổi'
}

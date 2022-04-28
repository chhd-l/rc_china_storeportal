import { User } from '@/framework/types/common'
import { atom } from 'jotai'
export const userAtom = atom<User | null>({
  id: '12345',
  type: '12345',
  name: '12345',
  nickname: '12345',
  username: '12345',
  email: '12345',
  isEmailVerified: true,
  phone: '13080534977',
  isPhoneVerified: true,
  status: 'aa',
})
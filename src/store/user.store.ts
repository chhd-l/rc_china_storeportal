//@ts-nocheck

import { User } from '@/framework/types/common'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(JSON.parse(localStorage.getItem("rc-userInfo")) as null || {
  id: '',
  type: '',
  name: '',
  nickname: '',
  username: '',
  email: '',
  isEmailVerified: true,
  phone: '',
  isPhoneVerified: true,
  status: '',
})
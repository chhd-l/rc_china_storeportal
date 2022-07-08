//@ts-nocheck

import { User } from '@/framework/types/common'
import { atom } from 'jotai'
let data = localStorage.getItem("rc-userInfo") !== 'undefined' ? JSON.parse(localStorage.getItem("rc-userInfo")) : null

export const userAtom = atom<User | null>(data as null || {
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
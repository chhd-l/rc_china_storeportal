import { atom } from 'jotai'
import { TLangKey } from '@/locale'

const defaultLocale = localStorage.getItem("locale") as TLangKey;

export const langAtom = atom<TLangKey>(defaultLocale ?? 'en_US')

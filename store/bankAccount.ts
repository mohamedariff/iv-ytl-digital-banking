import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import createSelectors from './createSelectors'

export type Transaction = {
  status: 'success' | 'failed'
  date: string
  transactionId: string
  amount: number
  name: string
  account: string
}

interface BankAccountState {
  balance: number
  transactions: Transaction[]
  transfer: (amount: number) => void
}

const useBankAccountStore = create<BankAccountState>()(
  persist(
    (set) => ({
      balance: 0,
      transactions: [],
      transfer: (amount) => set((state) => ({ balance: state.balance - amount })),
    }),
    { name: 'BankAccountStore' },
  ),
)

export default createSelectors(useBankAccountStore)
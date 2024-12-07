import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import createSelectors from './createSelectors'

type Transaction = {
  status: 'success' | 'failed'
  date: string
  transactionId: string
  amount: number
}

interface BankAccountState {
  balance: number
  transactions: Transaction[]
  transfer: (amount: number) => void
}

const useBankAccountStore = create<BankAccountState>()(
  devtools(
    persist(
      (set) => ({
        balance: 0,
        transactions: [],
        transfer: (amount) => set((state) => ({ balance: state.balance - amount })),
      }),
      { name: 'BankAccountStore' },
    ),
  ),
)

export default createSelectors(useBankAccountStore)
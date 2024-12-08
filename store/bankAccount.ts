import type { Contact } from 'expo-contacts'

import { create } from 'zustand'
import uuid from 'react-native-uuid'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import createSelectors from '@/store/createSelectors'

export type Transaction = {
  status: 'success' | 'failed'
  date: string
  transactionId: string
  amount: number
  account: string
  contact?: Contact
}

type Card = {
  cardHolder: string
  cardNumber: string
  expiryDate: string
  balance: number
  accountNumber: number
}

export type TransferInput = {
  accountNumber: string
  amount: number
  remarks: string
  contact?: Contact
}
interface BankAccountState {
  card: Card
  transactions: Transaction[]
  transfer: (data: TransferInput) => Transaction
  reset: () => void
}

const useBankAccountStore = create<BankAccountState>()(
  persist(
    (set, get) => ({
      card: {
        cardHolder: 'Mat Arep',
        cardNumber: '1234 5678 9876',
        expiryDate: '01/12',
        balance: 4900,
        accountNumber: 158015256762,
      },
      transactions: [],
      transfer: (data) => {
        const transaction: Transaction = {
          status: data.amount <= get().card.balance ? 'success' : 'failed' as const,
          date: new Date().toISOString(),
          transactionId: uuid.v4() as string,
          amount: data.amount,
          account: data.accountNumber,
          contact: data.contact
        };

        if (transaction.status === 'success') {
          set((state) => ({
            card: {
              ...state.card,
              balance: state.card.balance - data.amount
            },
            transactions: [transaction, ...state.transactions,]
          }));
        }
        else {
          set((state) => ({
            transactions: [transaction, ...state.transactions,]
          }));
        }

        return transaction;
      },
      reset: () => {
        set((state) => ({
          card: {
            ...state.card,
            balance: 4900
          },
          transactions: []
        }))
      }
    }),
    {
      name: 'BankAccountStore',
      storage: createJSONStorage(() => AsyncStorage)
    },
  ),
)

export default createSelectors(useBankAccountStore)
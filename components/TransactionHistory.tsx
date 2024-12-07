import React from 'react'
import { FlatList, Text, View } from 'react-native'

import useBankAccountStore from '../store/bankAccount'

import type { Transaction } from '../store/bankAccount'

type RenderListProps = {
  item: Transaction
}
function TransactionHistory() {
  // const transactionHistory = useBankAccountStore.use.transactions()
  const transactionHistory = [
    {
      transactionId: '1',
      name: 'Mat Jargon',
      account: '6090358170 - BCA',
      amount: 'RM5,000.00',
      status: 'success',
      date: new Date().toISOString()
    },
    {
      transactionId: '2',
      name: 'Mat Arep',
      account: '6090358170 - BCA',
      amount: 'RM2,000.00',
      status: 'failed',
      date: new Date().toISOString()
    }
  ]

  const renderList = ({ item }: RenderListProps) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View>
          <Text style={{ color: 'red' }}>{item.name}</Text>
          <Text style={{ color: 'gray' }}>{item.account}</Text>
        </View>
        <Text style={{ color: 'green' }}>{item.amount}</Text>
      </View>
    )
  }

  return (
    <View>
      <Text style={{ marginLeft: -10, marginBottom: 10, fontWeight: '500' }}>
        Transaction History
      </Text>

      <FlatList
        data={transactionHistory}
        contentContainerStyle={{ gap: 10 }}
        renderItem={renderList}
        keyExtractor={(item) => item.transactionId}
      />
    </View>
  )
}

export default TransactionHistory

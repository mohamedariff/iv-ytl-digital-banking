import type { Transaction } from '@/store/bankAccount'

import React from 'react'
import { Link } from 'expo-router'
import { FlatList, Text, View } from 'react-native'

import useBankAccountStore from '@/store/bankAccount'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

type RenderListProps = {
  item: Transaction
}

function TransactionHistory() {
  const transactionHistory = useBankAccountStore.use.transactions()

  const renderList = ({ item }: RenderListProps) => {
    return (
      <View
        style={{
          padding: 10,
          borderRadius: 5,
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            flex: 0.7,
            marginRight: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={{ color: 'gray' }}>{item.name}</Text>
            <Text style={{ color: 'gray' }}>{item.account}</Text>
          </View>

          <View>
            <Text style={{ color: 'green', fontWeight: '500', fontSize: 15 }}>
              {new Intl.NumberFormat('ms-MY', {
                style: 'currency',
                currency: 'MYR'
              }).format(item.amount)}
            </Text>
            <Text style={{ color: 'gray', fontSize: 13 }}>{item.date}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <Link href={{ pathname: '/processing', params: { ...item } }}>
            <View style={{ alignItems: 'center', gap: 5 }}>
              <FontAwesome name="dollar" size={22} color="gray" />
              <Text
                style={{
                  width: 40,
                  fontSize: 10,
                  flexWrap: 'wrap',
                  textAlign: 'center'
                }}
              >
                Quick Transfer
              </Text>
            </View>
          </Link>

          <Link href={{ pathname: '/receipt', params: { ...item } }}>
            <View style={{ alignItems: 'center', gap: 5 }}>
              <FontAwesome6 name="receipt" size={24} color="gray" />
              <Text
                style={{
                  width: 40,
                  fontSize: 10,
                  flexWrap: 'wrap',
                  textAlign: 'center'
                }}
              >
                Receipt
              </Text>
            </View>
          </Link>
        </View>
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

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
          <View style={{ gap: 5 }}>
            <Text style={{ color: item.status === 'failed' ? 'red' : 'green' }}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
            <Text style={{ color: 'gray' }}>{item.account}</Text>
          </View>

          <View style={{ gap: 5 }}>
            <Text
              style={{
                color: item.status === 'failed' ? 'red' : 'green',
                fontWeight: '500',
                fontSize: 15,
                textAlign: 'right'
              }}
            >
              {new Intl.NumberFormat('ms-MY', {
                style: 'currency',
                currency: 'MYR'
              }).format(item.amount)}
            </Text>
            <Text style={{ color: 'gray', fontSize: 13 }}>
              {new Date(item.date)
                .toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })
                .replace(',', '')}
            </Text>
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
    <View style={{ flex: 1 }}>
      <Text style={{ marginLeft: -10, marginBottom: 10, fontWeight: '500' }}>
        Transaction History
      </Text>

      <FlatList
        renderItem={renderList}
        data={transactionHistory}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.transactionId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default TransactionHistory

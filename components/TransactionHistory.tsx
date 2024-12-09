import type { Transaction } from '@/store/bankAccount'

import React from 'react'
import { Link } from 'expo-router'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import {
  convertCurrency,
  convertDateToLocale,
  uppercaseFirstLetter
} from '@/utils'
import useBankAccountStore from '@/store/bankAccount'

type RenderListProps = {
  item: Transaction
}

function TransactionHistory() {
  const transactionHistory = useBankAccountStore.use.transactions()

  const renderList = ({ item }: RenderListProps) => {
    const textColor = item.status === 'failed' ? '#FF6B6B' : '#66BB6A'
    return (
      <LinearGradient
        colors={['#FFFFFF', '#F5F5F5', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.details}>
          <View style={{ gap: 5 }}>
            <Text style={{ color: textColor }}>
              {uppercaseFirstLetter(item.status)}
            </Text>
            <Text style={{ color: '#9E9E9E' }}>{item.account}</Text>
          </View>

          <View style={{ gap: 5 }}>
            <Text style={[{ color: textColor }, styles.currency]}>
              {convertCurrency(item.amount)}
            </Text>
            <Text style={{ color: '#9E9E9E', fontSize: 13 }}>
              {convertDateToLocale(item.date)}
            </Text>
          </View>
        </View>

        <View style={styles.quickActionContainer}>
          <Link href={{ pathname: '/processing', params: { ...item } }}>
            <View style={{ alignItems: 'center', gap: 5 }}>
              <FontAwesome name="dollar" size={22} color="#9E9E9E" />
              <Text style={styles.quickAction}>Quick Transfer</Text>
            </View>
          </Link>

          <Link href={{ pathname: '/receipt', params: { ...item } }}>
            <View style={{ alignItems: 'center', gap: 5 }}>
              <FontAwesome6 name="receipt" size={24} color="#9E9E9E" />
              <Text style={styles.quickAction}>Receipt</Text>
            </View>
          </Link>
        </View>
      </LinearGradient>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.headerText}>Transaction History</Text>

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

const styles = StyleSheet.create({
  gradient: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  details: {
    flex: 0.7,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  quickAction: {
    width: 40,
    fontSize: 10,
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  quickActionContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  headerText: {
    marginLeft: -10,
    marginBottom: 10,
    fontWeight: '500'
  },
  currency: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'right'
  }
})

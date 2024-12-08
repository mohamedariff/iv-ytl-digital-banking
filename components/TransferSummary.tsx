import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import useBankAccountStore from '@/store/bankAccount'

type TransferSummaryType = 'receipt' | 'process'

function TransferSummary({ type }: { type: TransferSummaryType }) {
  const params = useLocalSearchParams()
  const card = useBankAccountStore.use.card()

  const parseContact = params?.contact
    ? JSON.parse(params.contact as string)
    : {}

  const formattedTimestamp = new Date(params.date)
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    .replace(',', '')

  const amountLocale = new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR'
  }).format(Number(params.amount))

  const status = params.status.charAt(0).toUpperCase() + params.status.slice(1)

  const copyToClipboard = (text: string) => Clipboard.setString(text)

  const data = [
    type === 'receipt' && { label: 'Status', value: status },
    {
      label: 'Transfer to',
      value: params.account || parseContact.phoneNumbers?.[0].number
    },
    { label: 'Transfer from', value: card.accountNumber },
    { label: 'Amount', value: amountLocale },
    { label: 'Timestamp', value: formattedTimestamp },
    type === 'receipt' && {
      label: 'Transaction ID',
      value: params.transactionId
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {parseContact.imageAvailable && (
          <Image
            style={styles.profileImage}
            source={{ uri: parseContact.image.uri }}
          />
        )}
        <Text style={styles.name}>{parseContact.firstName}</Text>
        <Text style={styles.amount}>{amountLocale}</Text>

        {/* Details */}
        <View style={styles.detailsContainer}>
          {data.map((item) => {
            return (
              <View key={item.label} style={styles.row}>
                <Text style={styles.label}>{item.label}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.value,
                    { maxWidth: 150, overflow: 'hidden' },
                    item.label === 'Status' && {
                      color: params.status === 'failed' ? 'red' : 'green'
                    }
                  ]}
                >
                  {item.value}
                </Text>
                {item.label === 'Transaction ID' && (
                  <TouchableOpacity
                    onPress={() => copyToClipboard(params.transactionId)}
                  >
                    <Text style={styles.copy}>Copy</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          })}

          {type === 'receipt' && (
            <>
              <View style={styles.divider} />
              <Text style={styles.label}>
                Note: This receipt is computer generated and no signature
                required
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  )
}

export default TransferSummary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20
  },
  card: {
    padding: 20,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 16,
    color: '#1A1A1A',
    marginVertical: 4
  },
  account: {
    fontSize: 14,
    color: '#9A9A9A'
  },
  button: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 16
  },
  buttonText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500'
  },
  detailsContainer: {
    marginTop: 20,
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    color: '#9A9A9A'
  },
  value: {
    fontSize: 14,
    color: '#1A1A1A'
  },
  success: {
    fontSize: 14,
    color: '#28A745',
    fontWeight: '500'
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  copy: {
    fontSize: 14,
    color: '#6C63FF'
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginVertical: 10
  }
})

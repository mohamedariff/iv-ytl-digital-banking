import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const Receipt = () => {
  const params = useLocalSearchParams()

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Receipt</Text>

      {/* User Information */}
      <View style={styles.card}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with actual image URL
        />
        <Text style={styles.amount}>
          {new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR'
          }).format(Number(params.amount))}
        </Text>
        <Text style={styles.name}>Mat Jargon</Text>
        <Text style={styles.account}>{params.account}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Nota kaki</Text>
        </TouchableOpacity>

        {/* Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.success}>{params.status}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{params.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>09:41 AM</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <View style={[styles.transactionRow, { overflow: 'hidden' }]}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.value, { overflow: 'hidden' }]}
              >
                {params.transactionId}
              </Text>
              <TouchableOpacity>
                <Text style={styles.copy}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>
              {new Intl.NumberFormat('ms-MY', {
                style: 'currency',
                currency: 'MYR'
              }).format(Number(params.amount))}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer Buttons */}
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareText}>📄 Share Receipt</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 20,
    alignItems: 'center'
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%'
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A'
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
    color: '#6C63FF',
    marginLeft: 8
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginVertical: 10
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500'
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  shareButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  shareText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500'
  },
  closeButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  closeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500'
  }
})

export default Receipt

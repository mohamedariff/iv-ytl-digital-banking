import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const CreditCard = ({ cardHolder, cardNumber, expiryDate }) => {
  return (
    <LinearGradient
      colors={['#7F00FF', '#E100FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      <View>
        <Text style={styles.cardNumber}>
          {cardNumber.replace(/(.{4})/g, '$1 ')}
        </Text>
        <Text style={styles.label}>Available Balance</Text>
        <Text style={styles.expiryDate}>$ 5,000.00</Text>
        <View style={styles.cardDetails}>
          <View>
            <Text style={styles.label}>Cardholder</Text>
            <Text style={styles.cardHolder}>{cardHolder}</Text>
          </View>
          <View>
            <Text style={styles.label}>Expires</Text>
            <Text style={styles.expiryDate}>{expiryDate}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: 200,
    borderRadius: 16,
    padding: 20,
    alignSelf: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10 // Shadow for Android
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 20
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 12,
    color: '#ddd'
  },
  cardHolder: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  expiryDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default CreditCard

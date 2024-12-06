import { SafeAreaView, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

import CreditCard from '@/components/CreditCard'

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <CreditCard
        cardHolder={'Mat Arep'}
        cardNumber={'1234 5678 9010'}
        expiryDate={'1/12'}
      />

      <Link href="/transfer">Transfer Money</Link>
      <Link href="/receipt">Receipt</Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'silver'
  }
})

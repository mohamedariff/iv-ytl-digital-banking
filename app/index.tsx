import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import CreditCard from '@/components/CreditCard'
import TransactionHistory from '@/components/TransactionHistory'

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <CreditCard
        cardHolder={'Mat Arep'}
        cardNumber={'1234 5678 9010'}
        expiryDate={'1/12'}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 20,
          marginBottom: 20,
          paddingHorizontal: 20
        }}
      >
        <Link href="/transfer">
          <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="bank-transfer"
              size={40}
              color="white"
            />
            <Text>Transfer</Text>
          </View>
        </Link>

        <Link href="/receipt">
          <View style={{ alignItems: 'center', gap: 5 }}>
            <FontAwesome6 name="receipt" size={24} color="white" />
            <Text>Receipt</Text>
          </View>
        </Link>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <TransactionHistory />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'silver'
  }
})

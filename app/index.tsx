import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import CreditCard from '@/components/CreditCard'
import TransactionHistory from '@/components/TransactionHistory'

import useBankAccountStore from '@/store/bankAccount'

export default function Index() {
  const reset = useBankAccountStore.use.reset()

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <CreditCard />

        <View style={styles.actionButtons}>
          <Link href="/">
            <View style={styles.button}>
              <FontAwesome6 name="receipt" size={24} color="white" />
              <Text>Receipt</Text>
            </View>
          </Link>

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

          <Link href="/" onPress={reset}>
            <View style={styles.button}>
              <FontAwesome name="refresh" size={24} color="white" />
              <Text>Reset</Text>
            </View>
          </Link>
        </View>

        <View style={{ flex: 1 }}>
          <TransactionHistory />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver'
  },
  actionButtons: {
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    marginBottom: 20,
    paddingHorizontal: 20
  },
  button: {
    alignItems: 'center',
    gap: 5
  }
})

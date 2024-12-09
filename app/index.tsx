import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import CreditCard from '@/components/CreditCard'
import TransactionHistory from '@/components/TransactionHistory'

import useBankAccountStore from '@/store/bankAccount'

export default function Index() {
  const reset = useBankAccountStore.use.reset()

  return (
    <LinearGradient
      colors={['#E0E0E0', '#BDBDBD', '#E0E0E0']}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <CreditCard />

          <View style={styles.actionButtons}>
            <Link href="/">
              <View style={styles.button}>
                <FontAwesome6 name="receipt" size={24} color="#4F4F4F" />
                <Text>Receipt</Text>
              </View>
            </Link>

            <Link href="/transfer">
              <View style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons
                  name="bank-transfer"
                  size={40}
                  color="#4F4F4F"
                />
                <Text>Transfer</Text>
              </View>
            </Link>

            <Link href="/" onPress={reset}>
              <View style={styles.button}>
                <FontAwesome name="refresh" size={24} color="#4F4F4F" />
                <Text>Reset</Text>
              </View>
            </Link>
          </View>

          <View style={{ flex: 1 }}>
            <TransactionHistory />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

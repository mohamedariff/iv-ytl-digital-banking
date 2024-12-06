import { SafeAreaView, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
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

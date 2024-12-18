import React from 'react'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

import CustomButton from '@/components/CustomButton'
import TransferSummary from '@/components/TransferSummary'

const Receipt = () => {
  return (
    <LinearGradient
      colors={['#BDBDBD', '#E0E0E0', '#BDBDBD']}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
          <Text style={styles.header}>Receipt</Text>

          <TransferSummary type="receipt" />

          <View style={styles.buttonsContainer}>
            <CustomButton
              label="📄 Share Receipt"
              onPress={() => {}}
              buttonStyle={{ backgroundColor: 'gray' }}
            />
            <CustomButton label="Done" onPress={router.dismissAll} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1
  },
  buttonsContainer: {
    gap: 10,
    width: '100%',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  }
})

export default Receipt

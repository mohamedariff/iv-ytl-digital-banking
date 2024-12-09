import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'
import { View, Text, Alert, StyleSheet, SafeAreaView } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import * as Device from 'expo-device'

import useBankAccountStore from '@/store/bankAccount'

import CustomButton from '@/components/CustomButton'
import TransferSummary from '@/components/TransferSummary'

const Processing = () => {
  const params = useLocalSearchParams()
  const transfer = useBankAccountStore.use.transfer()

  const checkBiometricAvailability = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync()
    if (!hasHardware) {
      Alert.alert(
        'Error',
        'Your device does not support biometric authentication.'
      )
      return false
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync()
    if (!isEnrolled) {
      Alert.alert('Error', 'No biometric data enrolled on this device.')
      return false
    }

    return true
  }

  const handleBiometricAuthentication = async () => {
    const isAvailable = !Device.isDevice
      ? true
      : await checkBiometricAvailability()
    if (!isAvailable) return

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authorise transfer',
      fallbackLabel: 'Use Passcode',
      cancelLabel: 'Cancel'
    })

    if (result.success) {
      const result = transfer(params as any)
      if (result) {
        const serializedParams = {
          ...result,
          contact: JSON.stringify(result.contact)
        }
        router.replace({ pathname: '/receipt', params: serializedParams })
      }
    } else {
      // Alert.alert('Authentication Failed', 'Unable to verify your identity.')
    }
  }

  React.useEffect(() => {
    checkBiometricAvailability()
  }, [])

  return (
    <LinearGradient
      colors={['#BDBDBD', '#E0E0E0', '#BDBDBD']}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Processing</Text>
          <Text style={styles.description}>Authorise this transaction.</Text>

          <TransferSummary type="process" />

          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            <CustomButton
              label="Deny"
              onPress={router.back}
              buttonStyle={{ width: '50%' }}
            />
            <CustomButton
              label="Approve"
              onPress={handleBiometricAuthentication}
              buttonStyle={{ width: '50%' }}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    color: '#7a7a7a',
    textAlign: 'center',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%'
  },
  successMessage: {
    marginTop: 20,
    fontSize: 16,
    color: '#28a745'
  }
})

export default Processing

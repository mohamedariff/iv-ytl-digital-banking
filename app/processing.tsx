import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { View, Text, Alert, StyleSheet, SafeAreaView } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import * as Device from 'expo-device'

import CustomButton from '@/components/CustomButton'
import useBankAccountStore from '@/store/bankAccount'
import TransferSummary from '@/components/TransferSummary'

const Processing = () => {
  const params = useLocalSearchParams()

  const transfer = useBankAccountStore.use.transfer()

  const [isBiometricSupported, setIsBiometricSupported] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if biometrics are supported on the device
  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    if (!compatible) {
      Alert.alert(
        'Biometric Not Supported',
        'Your device does not support Face ID or fingerprint authentication.'
      )
      return
    }
    setIsBiometricSupported(compatible)
  }

  // Prompt user for Face ID or Fingerprint authentication
  const handleBiometricAuthentication = async () => {
    if (!Device.isDevice) {
      const result = transfer(params as any)
      return result && router.replace({ pathname: '/receipt', params: result })
    }

    const biometricRecords = await LocalAuthentication.isEnrolledAsync()

    if (!biometricRecords) {
      Alert.alert(
        'No Biometrics Found',
        'Please enroll your Face ID or Fingerprint in your device settings.'
      )
      return
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authorise transfer',
      fallbackLabel: 'Use Passcode',
      cancelLabel: 'Cancel'
    })

    if (result.success) {
      setIsAuthenticated(true)

      const result = transfer(params as any)

      result && router.replace({ pathname: '/receipt', params: result })
    } else {
      // Alert.alert('Authentication Failed', 'Unable to verify your identity.')
    }
  }

  // const checkAuthType = async () => {
  //   const authTypes =
  //     await LocalAuthentication.supportedAuthenticationTypesAsync()
  // }

  // Initialize biometric support check on mount
  React.useEffect(() => {
    checkBiometricSupport()
    // checkAuthType()
  }, [])

  return (
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
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

import { Alert, View } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

export default function Transfer() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'silver',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CustomInput label="Account Number" />
      <CustomInput label="Amount" />
      <CustomInput label="Remarks" />

      <CustomButton
        label="Transfer Now"
        onPress={async () => {
          try {
            const biometryType =
              await LocalAuthentication.supportedAuthenticationTypesAsync()
            const result = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Authenticate to continue',
              cancelLabel: 'Cancel',
              disableDeviceFallback: true
            })

            if (result.success) {
              // Proceed with transfer
              console.log('Authentication successful')
            } else {
              Alert.alert('Authentication failed', 'Please try again')
            }
          } catch (error) {
            console.error('Biometric auth error:', error)
            Alert.alert('Error', 'Could not authenticate')
          }
        }}
      />
    </View>
  )
}

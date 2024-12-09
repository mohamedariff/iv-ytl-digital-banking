import type { FieldError } from 'react-hook-form'
import type { TransferInput } from '@/store/bankAccount'

import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useForm, Controller } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'

import Contacts from '@/components/Contacts'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import CustomHeader from '@/components/CustomHeader'

function Transfer() {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<TransferInput>()

  const onSubmit = (data: TransferInput) => {
    const params = {
      ...data,
      contact: JSON.stringify(data.contact)
    }
    router.push({ pathname: '/processing', params })
  }

  return (
    <LinearGradient
      colors={['#BDBDBD', '#E0E0E0', '#BDBDBD']}
      style={styles.wrapper}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.safeareaview}>
          <View style={styles.container}>
            <CustomHeader title="Transfer To" />

            <View style={styles.formContainer}>
              <Controller
                control={control}
                name="contact"
                render={({ field: { onChange, value } }) => (
                  <Contacts
                    value={value}
                    onChange={(newValue: string) => {
                      onChange(newValue)
                      try {
                        const contactData = JSON.parse(newValue)
                        if (contactData.phoneNumbers?.[0].number) {
                          setValue(
                            'accountNumber',
                            contactData.phoneNumbers[0].number.replace(
                              /[^0-9]/g,
                              ''
                            )
                          )
                        }
                      } catch (e) {
                        console.error('Error parsing contact data:', e)
                      }
                    }}
                  />
                )}
              />

              <Controller
                control={control}
                name="accountNumber"
                rules={{
                  required: {
                    value: true,
                    message: 'Account number is required'
                  },
                  minLength: {
                    value: 9,
                    message: 'Account number must be at least 9 digits'
                  },
                  maxLength: {
                    value: 12,
                    message: 'Account number must be valid'
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Only numbers are allowed'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Account Number"
                    error={errors.accountNumber as FieldError}
                    textInputProps={{
                      placeholder: 'Enter bank account..',
                      keyboardType: 'number-pad',
                      onChangeText: onChange,
                      value,
                      onBlur
                    }}
                  />
                )}
              />

              <Controller
                control={control}
                name="amount"
                rules={{
                  required: {
                    value: true,
                    message: 'Amount is required'
                  },
                  pattern: {
                    value: /^[0-9]+(\.[0-9]*)?$/,
                    message: 'Only numbers and decimal point are allowed'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Amount"
                    error={errors.amount as FieldError}
                    textInputProps={{
                      placeholder: '$0.00',
                      keyboardType: 'decimal-pad',
                      onChangeText: onChange,
                      value: value?.toString(),
                      onBlur
                    }}
                  />
                )}
              />

              <Controller
                control={control}
                name="remarks"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Remarks"
                    textInputProps={{
                      placeholder: 'Enter remarks..',
                      keyboardType: 'default',
                      multiline: true,
                      autoCapitalize: 'none',
                      onChangeText: onChange,
                      value,
                      onBlur
                    }}
                  />
                )}
              />
            </View>

            <CustomButton
              label="Continue"
              onPress={handleSubmit(onSubmit)}
              buttonStyle={{ alignSelf: 'center' }}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

export default Transfer

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  safeareaview: { flex: 1 },
  container: { flex: 1, padding: 20 },
  formContainer: { flex: 1, gap: 10, justifyContent: 'center' }
})

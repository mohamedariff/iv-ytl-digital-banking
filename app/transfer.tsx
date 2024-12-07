import type { FieldError } from 'react-hook-form'
import type { TransferInput } from '@/store/bankAccount'

import { router } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, View } from 'react-native'

import Contacts from '@/components/Contacts'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

function Transfer() {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<TransferInput>()

  const onSubmit = (data: TransferInput) => {
    router.push({ pathname: '/processing', params: data })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={{
          flex: 1,
          gap: 10,
          paddingHorizontal: 20,
          backgroundColor: 'silver',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Controller
          control={control}
          name="contact"
          render={({ field: { onChange, value } }) => (
            <Contacts
              onChange={(newValue: string) => {
                onChange(newValue)
                try {
                  const contactData = JSON.parse(newValue)
                  if (contactData.phoneNumbers?.[0].number) {
                    setValue(
                      'accountNumber',
                      contactData.phoneNumbers[0].number.replace(/[^0-9]/g, '')
                    )
                  }
                } catch (e) {
                  console.error('Error parsing contact data:', e)
                }
              }}
              value={value}
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
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Account Number"
              error={errors.accountNumber as FieldError}
              textInputProps={{
                placeholder: 'Enter bank account..',
                keyboardType: 'decimal-pad',
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
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Amount"
              textInputProps={{
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

        <CustomButton
          label="Continue"
          buttonStyle={{ marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default Transfer

import type { FieldError } from 'react-hook-form'
import type { TransferInput } from '../store/bankAccount'

import { View } from 'react-native'
import { router } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'

import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

import useBankAccountStore from '@/store/bankAccount'

export default function Transfer() {
  const transfer = useBankAccountStore.use.transfer()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TransferInput>()

  const onSubmit = (data: TransferInput) => {
    const result = transfer(data)
    result && router.push({ pathname: '/receipt', params: result })
  }

  return (
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
        name="accountNumber"
        rules={{
          required: {
            value: true,
            message: 'Account number is required'
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
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Amount"
            textInputProps={{
              keyboardType: 'number-pad',
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
        label="Transfer Now"
        buttonStyle={{ marginTop: 20 }}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

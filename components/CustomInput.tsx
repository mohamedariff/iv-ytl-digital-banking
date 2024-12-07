import type { FieldError } from 'react-hook-form'
import type { TextInputProps } from 'react-native'

import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

type CustomInputProps = {
  label: string
  textInputProps?: TextInputProps
  error?: FieldError
}

function CustomInput({ label, textInputProps, error }: CustomInputProps) {
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error?.message && { borderColor: 'red', borderWidth: 0.5 }
        ]}
        autoCorrect={false}
        placeholder="$0.00"
        value={textInputProps?.value}
        onChangeText={textInputProps?.onChangeText}
        {...textInputProps}
      />
      <Text style={styles.error}>{error?.message}</Text>
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  container: {
    margin: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000' // Black text
  },
  error: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '400',
    color: 'red'
  },
  input: {
    backgroundColor: '#F5F5F5', // Light gray background
    padding: 16,
    borderRadius: 8, // Rounded corners
    color: '#000', // Black text for input
    fontWeight: '500'
  }
})

import type { FieldError } from 'react-hook-form'
import type { TextInputProps } from 'react-native'

import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

type CustomInputProps = {
  label: string
  error?: FieldError
  textInputProps?: TextInputProps
}

function CustomInput({ label, textInputProps, error }: CustomInputProps) {
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error?.message && styles.errorMessage]}
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
    marginBottom: 8,
    fontWeight: '500'
  },
  error: {
    fontSize: 13,
    color: 'red',
    marginTop: 4,
    fontWeight: '400'
  },
  input: {
    height: 50,
    padding: 12,
    elevation: 2,
    borderRadius: 8,
    shadowRadius: 1.41,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    backgroundColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 1 }
  },
  errorMessage: {
    borderWidth: 0.5,
    borderColor: 'red'
  }
})

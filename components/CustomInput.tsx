import type { TextInputProps } from 'react-native'

import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

type CustomInputProps = {
  label: string
  textInputProps?: TextInputProps
}

function CustomInput({ label, textInputProps }: CustomInputProps) {
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder="$0.00" {...textInputProps} />
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
  input: {
    backgroundColor: '#F5F5F5', // Light gray background
    padding: 16,
    borderRadius: 8, // Rounded corners
    fontSize: 18,
    color: '#000', // Black text for input
    fontWeight: '500'
  }
})

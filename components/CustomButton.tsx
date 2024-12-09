import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

type CustomButtonProps = {
  label: string
  onPress: () => void
  buttonStyle?: any
}

function CustomButton({ label, onPress, buttonStyle }: CustomButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7F00FF', // Dark banana leaf green color
    paddingVertical: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    width: '100%'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500'
  }
})

export default CustomButton

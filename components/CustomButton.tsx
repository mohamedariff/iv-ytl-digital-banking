import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2F4F2F', // Dark banana leaf green color
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

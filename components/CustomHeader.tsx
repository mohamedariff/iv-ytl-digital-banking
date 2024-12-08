import React from 'react'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type CustomHeaderProps = {
  title: string
  onPress?: () => void
}

function CustomHeader({ title, onPress }: CustomHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress || router.back}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  textContainer: { flex: 1, alignItems: 'center' },
  text: { fontSize: 18, fontWeight: 'bold' },
  container: { flexDirection: 'row', alignItems: 'center' }
})

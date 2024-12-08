import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontWeight: 'bold' } }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: '' }}
      />
      <Stack.Screen
        name="transfer"
        options={{ headerShown: false, headerTitle: 'Transfer' }}
      />
      <Stack.Screen name="receipt" options={{ headerShown: false }} />
      <Stack.Screen name="processing" options={{ headerShown: false }} />
    </Stack>
  )
}

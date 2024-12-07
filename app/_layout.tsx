import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2F4F2F'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="transfer" />
      <Stack.Screen name="receipt" />
      <Stack.Screen name="processing" />
    </Stack>
  )
}

import * as Contacts from 'expo-contacts'

export const checkContactsPermission = async () => {
  const { status } = await Contacts.requestPermissionsAsync()
  return status
}

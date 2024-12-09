import * as Contacts from 'expo-contacts'

export const checkContactsPermission = async () => {
  const { status } = await Contacts.requestPermissionsAsync()
  return status
}

export const uppercaseFirstLetter = (str: string) => str?.charAt(0).toUpperCase() + str?.slice(1)

export const convertDateToLocale = (date: string) => new Date(date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')

export const convertCurrency = (amount: number) => new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' }).format(amount)